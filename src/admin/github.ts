// ─── GitHub Contents API client ──────────────────────────────────────────────
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
  content: string // base64
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
 * Commit a file change to the repository branch.
 */
export async function commitFile(
  filePath: string,
  content: string,
  sha: string,
  message: string,
): Promise<GitHubCommitResult> {
  try {
    const res = await fetch(apiUrl(`contents/${filePath}`), {
      method: 'PUT',
      headers: githubHeaders(),
      body: JSON.stringify({
        message,
        content: toBase64(content),
        sha,
        branch: GITHUB_BRANCH,
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return {
        ok: false,
        error: body.message || `GitHub API returned ${res.status}`,
      }
    }

    const data = (await res.json()) as {
      commit: { html_url: string }
    }

    return {
      ok: true,
      commitUrl: data.commit?.html_url,
    }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Network error',
    }
  }
}

/**
 * Commit multiple files in a single batch.
 * Each file gets its own commit (GitHub Contents API doesn't support batching).
 */
export async function commitFiles(
  files: Array<{ path: string; content: string; sha: string }>,
  messagePrefix: string,
): Promise<{ allOk: boolean; errors: string[]; commitUrls: string[] }> {
  const errors: string[] = []
  const commitUrls: string[] = []

  for (const file of files) {
    const result = await commitFile(
      file.path,
      file.content,
      file.sha,
      `${messagePrefix}: update ${file.path}`,
    )

    if (result.ok) {
      if (result.commitUrl) commitUrls.push(result.commitUrl)
    } else {
      errors.push(`${file.path}: ${result.error}`)
    }
  }

  return {
    allOk: errors.length === 0,
    errors,
    commitUrls,
  }
}

/**
 * Check if the GitHub PAT is configured.
 */
export function isGithubConfigured(): boolean {
  return GITHUB_PAT.length > 0
}
