# CMS Setup Guide

The admin panel at `/admin` lets non-technical users edit site content. Changes are pushed directly to GitHub, which triggers an automatic Cloudflare Pages rebuild.

## How it works

1. Editor visits `/admin`, enters the shared password
2. Clicks text on the page to edit it
3. Clicks **Push to Live** — changes commit to the `content/cms/` JSON files on GitHub
4. Cloudflare Pages detects the push and rebuilds the site automatically

## Setup (one-time)

### 1. Create a GitHub Fine-Grained Personal Access Token

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. Click **Generate new token**
3. Set the following:
   - **Token name:** `winnipeg-site-cms`
   - **Repository access:** Only select repositories → `Lastofthefirst/winnipeg`
   - **Permissions:**
     - **Contents:** Read and write
     - Everything else: No access
4. Click **Generate token**
5. Copy the token — you won't see it again

### 2. Add one env var to Cloudflare Pages

In the Cloudflare Pages dashboard for this project:

1. Go to **Settings → Environment variables → Edit variables**
2. Add one variable (production):
   - `NEXT_PUBLIC_GITHUB_PAT` — the token from step 1
3. Save

Cloudflare injects this at build time so the admin page has the token embedded.

### 3. Local development

Set the same variables in `.env.local` (this file is gitignored):

```
NEXT_PUBLIC_GITHUB_PAT=ghp_your_token_here
NEXT_PUBLIC_GITHUB_BRANCH=main
```

Then `npm run dev` to test locally.

### 4. Set the admin password

The password is currently a simple client-side check. To change it, edit `src/app/admin/page.tsx` in the `LoginScreen` component. Default is `winnipeg`.

## Content files

Editable content lives in JSON files:

- `content/cms/en.json` — English content
- `content/cms/fr.json` — French content

These are the source of truth for the admin editor.

## Architecture

- **`src/app/admin/page.tsx`** — Admin page with login, edit UI, and push-to-live
- **`src/admin/shell.tsx`** — Reusable admin shell (header, save button, section cards)
- **`src/admin/editable.tsx`** — Editable text and image wrappers
- **`src/admin/github.ts`** — GitHub Contents API client
- **`src/admin/config.ts`** — Per-site section and field configuration
