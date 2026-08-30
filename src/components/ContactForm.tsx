'use client'

import { useId, useState } from 'react'

import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  const id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-burgundy-200 bg-transparent px-6 pt-12 pb-4 text-base/6 text-burgundy-900 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-burgundy-900 focus:ring-burgundy-900/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-burgundy-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-burgundy-900 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-burgundy-900"
      >
        {label}
      </label>
    </div>
  )
}

export interface ContactFormLabels {
  heading: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  button: string
}

const defaultLabels: ContactFormLabels = {
  heading: 'Get in touch',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  subject: 'Subject',
  message: 'Message',
  button: 'Send Message',
}

export function ContactForm({ labels = defaultLabels }: { labels?: ContactFormLabels }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    const data = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name') as string,
          email: data.get('email') as string,
          phone: data.get('phone') as string,
          subject: data.get('subject') as string,
          message: data.get('message') as string,
          website: data.get('website') as string,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <FadeIn className="lg:order-last">
        <div className="rounded-2xl border border-burgundy-200 bg-ivory/50 px-8 py-12 text-center">
          <p className="font-display text-base font-semibold text-burgundy-900">
            Message received
          </p>
          <p className="mt-2 text-base text-burgundy-600">
            Thank you — we&apos;ll be in touch soon.
          </p>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn className="lg:order-last">
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-burgundy-900">
          {labels.heading}
        </h2>
        <div className="relative isolate mt-6 -space-y-px rounded-2xl bg-ivory/50">
          <TextInput label={labels.name} name="name" autoComplete="name" required />
          <TextInput
            label={labels.email}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
          <TextInput label={labels.phone} type="tel" name="phone" autoComplete="tel" />
          <TextInput label={labels.subject} name="subject" />
          <TextInput label={labels.message} name="message" required />
          <div aria-hidden="true" className="absolute left-[-9999px] top-0 overflow-hidden">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>
        </div>
        {error && (
          <p className="mt-4 text-sm text-red-600">
            Something went wrong — please try again or email us directly.
          </p>
        )}
        <Button type="submit" className="mt-10" disabled={submitting}>
          {submitting ? 'Sending…' : labels.button}
        </Button>
      </form>
    </FadeIn>
  )
}
