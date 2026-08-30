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
