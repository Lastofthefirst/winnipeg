// ─── GitHub Contents & Git Trees API client ─────────────────────────────────
// Used by the admin to read content files and commit changes.
// PAT is embedded at build time via NEXT_PUBLIC_GITHUB_PAT env var.
// Admin is password-protected so token exposure is contained.

const GITHUB_OWNER = 'Lastofthefirst'
const GITHUB_REPO = 'winnipeg'
const GITHUB_BRANCH = 'main'
const GITHUB_PAT = process.env.NEXT_PUBLIC_GITHUB_PAT || ''

const apiUrl = (path: string) =>
  `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/${path}`

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GitHubFile {
  sha: string
  content: string // decoded UTF-8
}

export interface GitHubCommitResult {
  ok: boolean
  commitUrl?: string
  error?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function githubHeaders() {
  return {
    Authorization: `Bearer ${GITHUB_PAT}`,
    Accept: 'application/vnd.github.v3+json',
  }
}

function decodeBase64(b64: string): string {
  return Buffer.from(b64, 'base64').toString('utf-8')
}

function toBase64(str: string): string {
  return Buffer.from(str, 'utf-8').toString('base64')
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch a file from the repository branch.
 */
export async function fetchFile(filePath: string): Promise<{ content: string; sha: string } | null> {
  const res = await fetch(apiUrl(`contents/${filePath}?ref=${GITHUB_BRANCH}`), {
    headers: githubHeaders(),
  })

  if (!res.ok) {
    console.error(`Failed to fetch ${filePath}: ${res.status}`)
    return null
  }

  const data = (await res.json()) as { sha: string; content: string }
  return {
    content: decodeBase64(data.content),
    sha: data.sha,
  }
}

/**
 * Commit multiple files in a single atomic commit using the Git Trees API.
 * This triggers only one Cloudflare build regardless of file count.
 */
export async function commitFiles(
  files: Array<{ path: string; content: string }>,
  messagePrefix: string,
): Promise<GitHubCommitResult> {
  if (files.length === 0) return { ok: true }

  try {
    // 1. Get current branch ref
    const refRes = await fetch(apiUrl(`git/ref/heads/${GITHUB_BRANCH}`), {
      headers: githubHeaders(),
    })
    if (!refRes.ok) throw new Error(`Failed to fetch branch ref: ${refRes.status}`)
    const refData = (await refRes.json()) as { object: { sha: string } }
    const headCommitSha = refData.object.sha

    // 2. Get current commit to find its tree SHA
    const commitRes = await fetch(apiUrl(`git/commits/${headCommitSha}`), {
      headers: githubHeaders(),
    })
    if (!commitRes.ok) throw new Error(`Failed to fetch commit: ${commitRes.status}`)
    const commitData = (await commitRes.json()) as { tree: { sha: string } }
    const baseTreeSha = commitData.tree.sha

    // 3. Create blobs for each file
    const blobs = await Promise.all(
      files.map(async (file) => {
        const blobRes = await fetch(apiUrl('git/blobs'), {
          method: 'POST',
          headers: githubHeaders(),
          body: JSON.stringify({
            content: file.content,
            encoding: 'utf-8',
          }),
        })
        if (!blobRes.ok) throw new Error(`Failed to create blob for ${file.path}: ${blobRes.status}`)
        const blobData = (await blobRes.json()) as { sha: string }
        return { path: file.path, sha: blobData.sha }
      }),
    )

    // 4. Create tree with all file changes
    const treeRes = await fetch(apiUrl('git/trees'), {
      method: 'POST',
      headers: githubHeaders(),
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: blobs.map((b) => ({
          path: b.path,
          mode: '100644',
          type: 'blob',
          sha: b.sha,
        })),
      }),
    })
    if (!treeRes.ok) throw new Error(`Failed to create tree: ${treeRes.status}`)
    const treeData = (await treeRes.json()) as { sha: string }

    // 5. Create commit
    const newCommitRes = await fetch(apiUrl('git/commits'), {
      method: 'POST',
      headers: githubHeaders(),
      body: JSON.stringify({
        message: `${messagePrefix}: ${files.map((f) => f.path).join(', ')}`,
        tree: treeData.sha,
        parents: [headCommitSha],
      }),
    })
    if (!newCommitRes.ok) throw new Error(`Failed to create commit: ${newCommitRes.status}`)
    const newCommitData = (await newCommitRes.json()) as { sha: string }

    // 6. Update branch ref
    const updateRefRes = await fetch(apiUrl(`git/refs/heads/${GITHUB_BRANCH}`), {
      method: 'PATCH',
      headers: githubHeaders(),
      body: JSON.stringify({
        sha: newCommitData.sha,
      }),
    })
    if (!updateRefRes.ok) {
      const body = await updateRefRes.json().catch(() => ({}))
      // Check if it's a "ref doesn't match" error (concurrent edit)
      if (updateRefRes.status === 422) {
        return {
          ok: false,
          error: 'Content was changed by someone else. Please refresh and try again.',
        }
      }
      return {
        ok: false,
        error: body.message || `Failed to update branch: ${updateRefRes.status}`,
      }
    }

    return {
      ok: true,
      commitUrl: `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${newCommitData.sha}`,
    }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error',
    }
  }
}

/**
 * Check if the GitHub PAT is configured.
 */
export function isGithubConfigured(): boolean {
  return GITHUB_PAT.length > 0
}
