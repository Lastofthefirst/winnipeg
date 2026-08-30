# Contact Form — Resend Setup

Converts the contact form from the dustCMS form endpoint to **Resend** email delivery via a
self-contained Cloudflare Pages Function. No new runtime dependencies — the function calls the
Resend REST API with plain `fetch`.

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

Emails are sent **from** a verified address on `winnipegbahais.org`, **to** the community inbox,
with **reply-to** set to the sender's email so the client can reply directly from their inbox.

## Environment variables

| Variable | Example | Purpose |
|---|---|---|
| `RESEND_API_KEY` | `re_1a2b3c…` | Resend API key (Dashboard → API Keys) |
| `CONTACT_RECIPIENT` | `LSA@winnipegbahais.org` | Delivery address; comma-separate for multiple |
| `CONTACT_FROM` | `Winnipeg Bahá'í <LSA@winnipegbahais.org>` | Sender; must be on a Resend-verified domain |

- Production: Cloudflare Pages dashboard → project → Settings → Environment variables. Add all
  three; `RESEND_API_KEY` as a secret. The key is server-side only — it must never be
  `NEXT_PUBLIC_`, and there is no `wrangler.toml` binding for Pages, the dashboard is the source.
- Local dev: `.dev.vars` at the repo root (already gitignored). Used by `npm run preview`.

## Resend account setup (one-time)

1. Create a free account at [resend.com](https://resend.com). Free plan: 100 emails/day,
   3,000/month, 3 verified domains, 10 req/s — a contact form uses a handful, this is
   ample headroom.
2. **Verify the sending domain** — Resend will not send from an unverified address.
   Dashboard → Sending Domains → Add Domain → `winnipegbahais.org`. Resend shows DNS records to
   add (SPF TXT, DKIM TXT ×2, plus an MX if you want inbound). The domain's DNS is managed in
   Cloudflare (NS `ignat`/`rafe.ns.cloudflare.com`), so add the records in the Cloudflare DNS
   zone for `winnipegbahais.org`, then click **Verify** in the Resend dashboard. Verification
   completes once the records propagate (usually minutes).
3. Create the API key: Dashboard → API Keys → Create. Restrict it to sending-only if the
   permission picker offers it. Copy the `re_…` key — shown once.

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

```ts
const RESEND_API = 'https://api.resend.com/emails'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldLimits = {
  name: 200,
  email: 320,
  phone: 50,
  subject: 300,
  message: 5000,
} as const

type FieldName = keyof typeof fieldLimits

interface ContactEnv {
  RESEND_API_KEY?: string
  CONTACT_RECIPIENT?: string
  CONTACT_FROM?: string
}

interface PageContext {
  request: Request
  env: ContactEnv
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function readField(raw: unknown, max: number): string {
  return typeof raw === 'string' ? raw.trim().slice(0, max) : ''
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildBodyHtml(fields: Record<FieldName, string>): string {
  const rows = (Object.keys(fieldLimits) as FieldName[])
    .filter((key) => fields[key])
    .map((key) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1)
      const pre = key === 'message' ? 'white-space:pre-wrap;' : ''
      return `<tr>
  <td style="padding:12px 0;border-bottom:1px solid #eee;">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;margin-bottom:4px;">${label}</div>
    <div style="font-size:15px;color:#222;${pre}">${escapeHtml(fields[key])}</div>
  </td>
</tr>`
    })
    .join('')

  return `<div style="font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">${rows}</table>
  <p style="margin-top:20px;font-size:12px;color:#999;">Contact form — winnipegbahais.org</p>
</div>`
}

export async function onRequest({ request, env }: PageContext): Promise<Response> {
  if (request.method !== 'POST') {
    return jsonResponse({ success: false }, 405)
  }

  let data: Record<string, unknown>
  try {
    data = (await request.json()) as Record<string, unknown>
  } catch {
    return jsonResponse({ success: false }, 400)
  }

  const fields = {
    name: readField(data.name, fieldLimits.name),
    email: readField(data.email, fieldLimits.email),
    phone: readField(data.phone, fieldLimits.phone),
    subject: readField(data.subject, fieldLimits.subject),
    message: readField(data.message, fieldLimits.message),
  }

  // Honeypot: bots fill the hidden website field — fake success, nothing sent, nothing logged
  if (readField(data.website, fieldLimits.name)) {
    return jsonResponse({ success: true })
  }

  if (!fields.name || !fields.message || !EMAIL_RE.test(fields.email)) {
    return jsonResponse({ success: false }, 400)
  }

  if (
    !env.RESEND_API_KEY ||
    !env.CONTACT_RECIPIENT ||
    !env.CONTACT_FROM
  ) {
    return jsonResponse({ success: false }, 500)
  }

  const subject = fields.subject
    ? `Contact form: ${fields.subject}`
    : 'New contact form message'

  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_RECIPIENT.split(',').map((s) => s.trim()).filter(Boolean),
      reply_to: [fields.email],
      subject,
      html: buildBodyHtml(fields),
    }),
  })

  if (!res.ok) {
    console.error(`resend ${res.status}: ${await res.text()}`)
    return jsonResponse({ success: false }, 502)
  }

  return jsonResponse({ success: true })
}
```

Design notes:

- **No rate limiter inside the function.** Cloudflare Workers isolates have no shared memory,
  so an in-function counter is per-isolate and unreliable. The free-plan 100/day Resend quota
  caps blast radius anyway; if hardening is ever wanted, add a Cloudflare WAF rate-limiting rule
  on `/api/contact` (dashboard, no code).
- **Honeypot returns success.** Mirrors the dust backend's behavior — a failed response would
  teach a bot that the field matters.
- **Errors are opaque to the client.** Resend's error body (which can include API details)
  goes to the Workers log, not the browser. The component shows its generic retry message.

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

With `.dev.vars` containing the three variables above:

```bash
# real submission → {"success":true} + email in Resend dashboard
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

1. Add the three environment variables in the Cloudflare Pages dashboard (see table above).
2. Push the branch/commit to GitHub — Pages rebuilds automatically (same pipeline the CMS
   content commits use).
3. Verify in production: submit the live form, check the Resend dashboard (Emails + Logs) and
   the recipient inbox. Check the Workers logs in the dashboard for any `resend 4xx/5xx` lines.
4. **Decommission the dust form** (Forms → contact → delete, or at minimum disable its
   notification) so the old endpoint stops accepting submissions. The mailto link on the
   contact page is independent and stays.

## Ongoing

- Resend dashboard → Email Logs is the troubleshooting pane: 429s (quota), 401 (key rotated),
  bounces, and deliveries all show there.
- If the recipient address ever changes, it is a Pages dashboard edit only — no deploy needed.
