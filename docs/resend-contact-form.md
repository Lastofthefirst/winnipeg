# Contact Form — Resend Setup

Converts the contact form from the dustCMS form endpoint to **Resend** email delivery via a
self-contained Cloudflare Pages Function. No new runtime dependencies — the function calls the
Resend REST API with plain `fetch`. Only one dashboard variable is required: `RESEND_API_KEY`.

## Current state

- `src/components/ContactForm.tsx` POSTs JSON (`name`, `email`, `phone`, `subject`, `message`,
  `website`) to the dust tenant endpoint
  `https://winnipeg-bahais.dust.ridvan.org/api/forms/contact/submit`.
- The dust backend stores the submission and optionally sends an SMTP notification. Its
  honeypot only triggers if the form's `honeypot_field` is configured in the **production dust
  admin** (Forms → contact → honeypot field must be `website`). That setting lives on the dust
  server, not in this repo, so it is not verifiable from here — check it once in the dust admin
  before and after the cutover.
- The form markup already includes a proper honeypot: an off-screen `website` input
  (`aria-hidden`, `tabIndex={-1}`) that is sent with every submission. Bots fill it; humans can't
  see or tab to it. The new function enforces it in code, unconditionally.

## Architecture

- `functions/api/contact.ts` — Cloudflare Pages Function exposing `POST /api/contact`. Validates
  the payload, enforces the honeypot, calls `https://api.resend.com/emails`. **Self-contained:
  zero imports.** The previous `functions/api/cms/[[path]].ts` shim was removed from production
  (commit `235c013`) because it imported a local-only package (`dustcms/edge` symlink) that broke
  the bundle. Do not import anything from `src/` or `node_modules` here.
- `functions/_routes.json` — routes only `/api/contact` to the function; everything else stays
  static.
- `src/components/ContactForm.tsx` — fetch URL changes from the absolute dust URL to the
  same-origin relative path `/api/contact`. Same-origin means no CORS config in dev or prod.
  The response shape stays `{ "success": true|false }`, so the component logic is untouched.

Flow: form → `POST /api/contact` → validate (400 on bad input) → honeypot filled: return
`{"success":true}` and send **nothing** (bot never knows it was caught) → Resend `POST /emails`
→ 200: `{"success":true}`, otherwise 502 and the error goes to the Workers log.

**Recipient and sender live in code, not env vars** (same pattern as the brent/remake site).
They are not secret — the contact email is already public on the site — and a code change is a
one-line edit + push rather than a dashboard detour. The only dashboard requirement is
`RESEND_API_KEY`, which is why the function 500s on nothing but a missing key.

- `RECIPIENT` — currently `quddus19@gmail.com` for testing; switch the constant to
  `LSA@winnipegbahais.org` once delivery is confirmed.
- `SENDER` — currently `onboarding@resend.dev`, Resend's free **unverified** sender, so no
  domain verification is needed to start. After `winnipegbahais.org` is verified in Resend
  (see below), switch the constant to `Winnipeg Bahá'í <LSA@winnipegbahais.org>`.

Dashboard env vars `CONTACT_FORM_TO` / `CONTACT_FORM_FROM` override the constants for emergency
changes without a deploy; they are normally unset.

## Environment variables

| Variable | Example | Purpose |
|---|---|---|
| `RESEND_API_KEY` | `re_1a2b3c…` | Resend API key (Dashboard → API Keys). **Required.** |
| `CONTACT_FORM_TO` | `LSA@winnipegbahais.org` | Optional override of the in-code recipient |
| `CONTACT_FORM_FROM` | `Winnipeg Bahá'í <LSA@winnipegbahais.org>` | Optional override of the in-code sender |

- Production: Cloudflare Pages dashboard → project → Settings → Environment variables. Add
  `RESEND_API_KEY` as a **secret**. The key is server-side only — it must never be
  `NEXT_PUBLIC_`, and there is no `wrangler.toml` binding for Pages, the dashboard is the source.
- Local dev: `.dev.vars` at the repo root (already gitignored), same key. Used by
  `npm run preview`.

## Resend account setup

1. Create a free account at [resend.com](https://resend.com). Free plan: 100 emails/day,
   3,000/month, 10 req/s — a contact form uses a handful, this is ample headroom.
2. Create the API key: Dashboard → API Keys → Create. Restrict it to sending-only if the
   permission picker offers it. Copy the `re_…` key — shown once.
3. **(Optional, later) Verify the sending domain** if the email should come from
   `@winnipegbahais.org` instead of `onboarding@resend.dev`. Dashboard → Sending Domains →
   Add Domain → `winnipegbahais.org`. Resend shows DNS records to add (SPF TXT, DKIM TXT ×2,
   plus an MX if you want inbound). The domain's DNS is managed in Cloudflare (NS
   `ignat`/`rafe.ns.cloudflare.com`), so add the records in the Cloudflare DNS zone for
   `winnipegbahais.org`, then click **Verify** in the Resend dashboard. Verification completes
   once the records propagate (usually minutes). Until then, `onboarding@resend.dev` sends
   fine.

## Implementation

### 1. `functions/_routes.json`

```json
{
  "version": 1,
  "include": ["/api/contact"],
  "exclude": []
}
```

### 2. `functions/api/contact.ts`

See the file in this repo — the constants at the top (`RECIPIENT`, `SENDER`) are the only
client-specific part.

Design notes:

- **No rate limiter inside the function.** Cloudflare Workers isolates have no shared memory,
  so an in-function counter is per-isolate and unreliable. The free-plan 100/day Resend quota
  caps blast radius anyway; if hardening is ever wanted, add a Cloudflare WAF rate-limiting rule
  on `/api/contact` (dashboard, no code).
- **Honeypot returns success.** Mirrors the dust backend's behavior — a failed response would
  teach a bot that the field matters.
- **Errors are opaque to the client.** Resend's error body (which can include API details)
  goes to the Workers log, not the browser. The component shows its generic retry message.
  Status codes: 500 = `RESEND_API_KEY` missing (misconfiguration), 502 = Resend rejected the
  send (key/domain/quota — see the log line).

### 3. `src/components/ContactForm.tsx`

Change only the endpoint:

```diff
-      const res = await fetch(
-        'https://winnipeg-bahais.dust.ridvan.org/api/forms/contact/submit',
-        {
+      const res = await fetch('/api/contact', {
```

Keep the honeypot input exactly as-is.

## Local testing

`npm run dev` (next dev) **does not serve Pages Functions** — the form will 404 there. Test the
full loop with the static export plus functions:

```bash
npm run build
npm run preview        # wrangler pages dev out/ — static site + functions on :8788, reads .dev.vars
```

With `.dev.vars` containing `RESEND_API_KEY`:

```bash
# real submission → {"success":true} + email in the recipient inbox and Resend dashboard
curl -s http://localhost:8788/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","phone":"204-555-0100","subject":"Question about visits","message":"Is the door open on Sunday?","website":""}'

# honeypot filled → {"success":true} but NO email appears in the Resend dashboard
curl -s http://localhost:8788/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Bot","email":"bot@spam.com","phone":"","subject":"","message":"buy stuff","website":"http://spam.example"}'

# missing required field → {"success":false} (HTTP 400), no email
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8788/api/contact \
  -H 'Content-Type: application/json' -d '{"name":"","email":"bad","message":"x","website":""}'
```

Then submit through the actual form UI at `http://localhost:8788/en/contact` and confirm the
success state renders and the email arrives with a working reply-to.

## Deployment

1. Add `RESEND_API_KEY` as a secret in the Cloudflare Pages dashboard (see table above).
2. Push the branch/commit to GitHub — Pages rebuilds automatically (same pipeline the CMS
   content commits use).
3. Verify in production: submit the live form, check the Resend dashboard (Emails + Logs) and
   the recipient inbox. Check the Workers logs in the dashboard for any `resend 4xx/5xx` lines.
4. Switch `RECIPIENT` in `functions/api/contact.ts` from `quddus19@gmail.com` to
   `LSA@winnipegbahais.org` and push — the form now delivers to the community inbox.
5. **Decommission the dust form** (Forms → contact → delete, or at minimum disable its
   notification) so the old endpoint stops accepting submissions. The mailto link on the
   contact page is independent and stays.

## Ongoing

- Resend dashboard → Email Logs is the troubleshooting pane: 429s (quota), 401 (key rotated),
  bounces, and deliveries all show there.
- Recipient/sender changes are one-line edits in `functions/api/contact.ts` + push (or a
  `CONTACT_FORM_TO` / `CONTACT_FORM_FROM` dashboard var for an immediate, reversible change).
- To send from `@winnipegbahais.org`, verify the domain first (Resend account setup, step 3),
  then switch the `SENDER` constant.
