# CMS Setup Guide

The admin panel at `/admin` lets non-technical editors change site content. Edits commit to the `content/cms/` JSON files on GitHub, which triggers a Cloudflare Pages rebuild.

## Architecture

Auth and writes happen **server-side** in a Cloudflare Pages Function — the browser never sees the password or the GitHub token.

- `functions/api/cms/[[path]].ts` — Pages Function exposing `/api/cms/*` (auth, content read, content push). Production entry point.
- `src/cms/config.ts` — single source of truth for the CMS config (locales, content files, git repo, allowed paths, rate limit). Imported by both the function and the admin page.
- `src/app/admin/page.tsx` — admin page (dustcms `LoginScreen` + `AdminShell`). Static-exported.
- `content/cms/en.json`, `content/cms/fr.json` — editable content (source of truth).

The flow: `LoginScreen` POSTs `{ password }` to `/api/cms/auth` → the function compares it against `CMS_PASSWORD` (constant-time) → on success sets an `HttpOnly` `cms-session` JWT cookie (HMAC-SHA256, 90-day expiry). Content read/push require a valid cookie and commit through `GIT_TOKEN`.

## Environment variables

| Variable | Purpose |
|---|---|
| `CMS_PASSWORD` | Shared admin password |
| `CMS_JWT_SECRET` | 32+ random bytes for signing sessions (`openssl rand -base64 32`) |
| `GIT_TOKEN` | Fine-grained GitHub PAT, Contents read+write on `Lastofthefirst/winnipeg` |

### Production (Cloudflare Pages)

Set all three as environment variables in the Cloudflare Pages dashboard (Settings → Environment variables). They are available to the Pages Function at runtime.

### Local development

The Pages Function is not served by `next dev`. To exercise the CMS locally you run the real function via Wrangler:

1. Put the secrets in `.dev.vars` (gitignored; Wrangler reads this for the function):
   ```
   CMS_PASSWORD=w1nn3p3g-c0mmun1ty-2026
   CMS_JWT_SECRET=<openssl rand -base64 32>
   GIT_TOKEN=ghp_...
   ```
2. Build the static export once, then preview it with the function:
   ```
   pnpm build
   pnpm preview     # wrangler pages dev out/  →  http://localhost:8788
   ```
   Open `http://localhost:8788/admin` and log in.

`pnpm dev` (plain `next dev`) is for UI/component work with HMR; it does **not** serve `/api/cms/*`, so the admin login will not work there. Use `pnpm preview` for anything that touches the CMS.

### Note on rate limiting

The auth endpoint rate-limits by `cf-connecting-ip` (5 attempts / 15 min). Wrangler does not always set that header locally, so all local attempts can share one bucket — if login stops returning 401 and the button spins or errors, restart `pnpm preview` to clear the in-memory limiter.

## Remaining production prerequisite

`dustcms` is the CMS library. It must be resolvable on the Cloudflare build host, where there is no local symlink. Declare it as a real dependency before the production build will succeed:

- Publish `dustcms` to npm and add `"dustcms": "^0.1.0"`, **or**
- Push the `dustCMS` repo to GitHub and add `"dustcms": "github:Lastofthefirst/dustCMS"`.

Until then `pnpm install` on Cloudflare cannot resolve `dustcms` and the build fails.
