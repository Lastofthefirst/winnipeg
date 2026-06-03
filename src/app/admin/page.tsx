'use client'

import { useState, useCallback, useEffect } from 'react'
import contentEnDefault from '../../../content/cms/en.json'
import contentFrDefault from '../../../content/cms/fr.json'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Blockquote } from '@/components/Blockquote'
import { AdminShell, SectionCard } from '@/admin/shell'
import { EditableText, EditableImage } from '@/admin/editable'
import { fetchFile, commitFiles, isGithubConfigured, type GitHubFile } from '@/admin/github'

// Import as build-time defaults
const contentEn = contentEnDefault as CMSContent
const contentFr = contentFrDefault as CMSContent

// ─── Content types ──────────────────────────────────────────────────────────

interface CMSContent {
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    ctaActivities: string
    ctaContact: string
    background: string
  }
  community: {
    eyebrow: string
    heading: string
    body: string[]
    link: string
    image: string
  }
  activities: {
    intro: string
    items: Array<{ title: string; description: string; image: string }>
  }
  events: Array<{ id: string; title: string; date: string; time: string; location: string }>
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ─── Login screen ────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password) onLogin()
    else setError(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory">
      <div className="w-full max-w-sm">
        <div className="relative rounded-2xl border border-burgundy-100 bg-white px-10 py-12 shadow-sm">
          <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-gold-400" />
          <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-gold-400" />
          <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-gold-400" />
          <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-gold-400" />

          <div className="mx-auto mb-8 h-px w-16 bg-gold-500" />

          <h1 className="text-center font-display text-2xl font-normal text-burgundy-900">
            Site Editor
          </h1>
          <p className="mt-3 text-center text-sm italic text-burgundy-600">
            Enter the shared password to continue
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              placeholder="Password"
              autoFocus
              className="w-full rounded-lg border border-burgundy-200 bg-ivory px-4 py-3 text-sm text-burgundy-900 placeholder-burgundy-300 transition focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/20"
            />
            {error && <p className="text-center text-xs text-red-500">Please enter a password.</p>}
            <button
              type="submit"
              className="w-full rounded-lg border border-burgundy-900 bg-burgundy-900 px-4 py-3 text-sm uppercase tracking-widest text-ivory transition hover:bg-burgundy-800"
            >
              Sign in
            </button>
          </form>

          <div className="mx-auto mt-8 h-px w-16 bg-gold-500" />
        </div>

        <p className="mt-6 text-center text-xs text-burgundy-400">
          Default: <code className="rounded bg-ivory px-1.5 py-0.5 font-mono text-burgundy-500">winnipeg</code>
        </p>
      </div>
    </div>
  )
}

// ─── Hero section ────────────────────────────────────────────────────────────

function HeroSection({
  eyebrow,
  heading,
  subheading,
  ctaActivities,
  ctaContact,
  background,
  editing,
  onEdit,
  onChange,
}: {
  eyebrow: string
  heading: string
  subheading: string
  ctaActivities: string
  ctaContact: string
  background: string
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
}) {
  return (
    <Container className="relative py-12 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-8 lg:-bottom-32 -z-10 flex justify-center"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,1))',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,1))',
        }}
      >
        <img src={background} alt="" className="w-full object-contain object-top" />
      </div>
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-8 h-px w-24 bg-gold-500" />
          <EditableText field="hero.eyebrow" value={eyebrow} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="font-display text-sm uppercase tracking-[0.3em] text-gold-600" />
          <EditableText field="hero.heading" value={heading} editing={editing} onEdit={onEdit} onChange={onChange} as="h1" className="mt-8 block font-display text-4xl font-normal leading-tight tracking-tight text-burgundy-900 sm:text-5xl lg:text-6xl" />
          <EditableText field="hero.subheading" value={subheading} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-8 font-display text-lg italic text-burgundy-600 sm:text-xl" />
          <div className="mt-12 flex justify-center gap-6">
            <span className="inline-flex border border-burgundy-900 bg-burgundy-900 px-8 py-3 text-sm uppercase tracking-widest text-ivory">
              {ctaActivities}
            </span>
            <span className="inline-flex border border-burgundy-300 px-8 py-3 text-sm uppercase tracking-widest text-burgundy-700">
              {ctaContact}
            </span>
          </div>
          <div className="mx-auto mt-12 h-px w-24 bg-gold-500" />
        </div>
      </FadeIn>
    </Container>
  )
}

// ─── Community section ───────────────────────────────────────────────────────

function CommunitySection({
  eyebrow,
  heading,
  body,
  link,
  image,
  editing,
  onEdit,
  onChange,
}: {
  eyebrow: string
  heading: string
  body: string[]
  link: string
  image: string
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
}) {
  return (
    <div className="lg:flex lg:items-center lg:gap-x-12">
      <div className="lg:w-1/2">
        <div className="mb-4 h-px w-16 bg-burgundy-300" />
        <EditableText field="community.eyebrow" value={eyebrow} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="font-display text-sm uppercase tracking-[0.25em] text-burgundy-500" />
        <EditableText field="community.heading" value={heading} editing={editing} onEdit={onEdit} onChange={onChange} as="h2" className="mt-4 block font-display text-3xl font-normal text-burgundy-900 sm:text-4xl" />
        <div className="mt-6 space-y-4 text-base leading-relaxed text-burgundy-700">
          {body.map((p, i) => (
            <EditableText key={i} field={`community.body.${i}`} value={p} editing={editing} onEdit={onEdit} onChange={onChange} as="p" />
          ))}
        </div>
        <div className="mt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900">
            {link} <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/2">
        <EditableImage field="community.image" src={image} alt="Community" editing={editing} onEdit={onEdit} onChange={onChange} className="w-full object-contain rounded-lg" />
      </div>
    </div>
  )
}

// ─── Activities section ──────────────────────────────────────────────────────

function ActivitiesSection({
  intro,
  items,
  editing,
  onEdit,
  onChange,
}: {
  intro: string
  items: Array<{ title: string; description: string; image: string }>
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
}) {
  return (
    <>
      <div className="mb-8">
        <EditableText field="activities.intro" value={intro} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="text-xl text-burgundy-700" />
        <Blockquote
          author={{ name: "Bahá'u'lláh", role: "Founder of the Bahá'í Faith" }}
          className="mt-6"
        >
          Let your vision be world-embracing, rather than confined to your own self.
        </Blockquote>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {items.map((activity, idx) => (
          <article key={idx} className="group relative flex flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
            <div className="relative flex h-48 items-center justify-center overflow-hidden">
              <EditableImage field={`activities.items.${idx}.image`} src={activity.image} alt="" editing={editing} onEdit={onEdit} onChange={onChange} className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 h-px w-8 bg-gold-400" />
              <EditableText field={`activities.items.${idx}.title`} value={activity.title} editing={editing} onEdit={onEdit} onChange={onChange} as="h3" className="font-display text-xl font-normal text-burgundy-900" />
              <EditableText field={`activities.items.${idx}.description`} value={activity.description} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-3 flex-1 text-sm leading-relaxed text-burgundy-700" />
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

// ─── Events section ──────────────────────────────────────────────────────────

function EventsSection({
  events,
  editing,
  onEdit,
  onChange,
  onAdd,
  onRemove,
}: {
  events: Array<{ id: string; title: string; date: string; time: string; location: string }>
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, idx) => (
        <div key={event.id} className="group relative">
          <article className="flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="relative pl-4 before:absolute before:top-0 before:left-0 before:h-6 before:w-px before:bg-burgundy-900 after:absolute after:top-8 after:left-0 after:h-px after:w-[2px] after:bg-burgundy-200">
                <EditableText field={`events.${idx}.date`} value={event.date} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="text-sm font-semibold text-burgundy-900" />
                {event.time && (
                  <EditableText field={`events.${idx}.time`} value={event.time} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-1 text-sm text-burgundy-600" />
                )}
              </div>
              <EditableText field={`events.${idx}.title`} value={event.title} editing={editing} onEdit={onEdit} onChange={onChange} as="h3" className="mt-6 font-display text-2xl font-normal text-burgundy-900" />
              {event.location && (
                <EditableText field={`events.${idx}.location`} value={event.location} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-2 text-sm text-burgundy-500" />
              )}
            </div>
          </article>
          <button
            onClick={() => onRemove(event.id)}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-stone-400 opacity-0 transition backdrop-blur group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
            aria-label="Remove event"
          >
            <TrashIcon />
          </button>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="flex w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-burgundy-200 bg-stone-50 py-16 text-sm font-medium text-burgundy-400 transition hover:border-burgundy-300 hover:bg-ivory hover:text-burgundy-600"
      >
        <PlusIcon />
        Add Event
      </button>
    </div>
  )
}

// ─── Admin page ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [logged, setLogged] = useState(false)
  const [locale, setLocale] = useState<'en' | 'fr'>('en')
  const [content, setContent] = useState<CMSContent>(contentEn)
  const [originalContent, setOriginalContent] = useState<CMSContent>(contentEn)
  const [editing, setEditing] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)
  const [pushing, setPushing] = useState(false)
  const [pushStatus, setPushStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [pushMessage, setPushMessage] = useState('')

  // File SHAs for GitHub commits
  const [fileShas, setFileShas] = useState<Record<string, string>>({})

  // On login, try to fetch latest content from GitHub
  useEffect(() => {
    if (!logged) return
    const branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main'
    const fileKey = locale === 'en' ? 'en' : 'fr'
    const filePath = `content/cms/${fileKey}.json`

    fetchFile(filePath).then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as CMSContent
        setContent(parsed)
        setOriginalContent(parsed)
        setFileShas((prev) => ({ ...prev, [filePath]: file.sha }))
      }
    }).catch(() => {
      // Fall back to build-time defaults
    })
  }, [logged])

  // Field change handler
  function handleFieldChange(field: string, value: string) {
    const parts = field.split('.')
    if (parts[0] === 'hero') {
      setContent((prev) => ({ ...prev, hero: { ...prev.hero, [parts[1]!]: value } }))
    } else if (parts[0] === 'community') {
      if (parts[1] === 'body') {
        const idx = parseInt(parts[2]!)
        setContent((prev) => {
          const body = [...prev.community.body]
          body[idx] = value
          return { ...prev, community: { ...prev.community, body } }
        })
      } else {
        setContent((prev) => ({ ...prev, community: { ...prev.community, [parts[1]!]: value } }))
      }
    } else if (parts[0] === 'activities') {
      if (parts[1] === 'items') {
        const idx = parseInt(parts[2]!)
        const itemField = parts[3]!
        setContent((prev) => {
          const items = prev.activities.items.map((item, i) =>
            i === idx ? { ...item, [itemField]: value } : item,
          )
          return { ...prev, activities: { ...prev.activities, items } }
        })
      } else {
        setContent((prev) => ({ ...prev, activities: { ...prev.activities, [parts[1]!]: value } }))
      }
    } else if (parts[0] === 'events') {
      const idx = parseInt(parts[1]!)
      const eventField = parts[2]!
      setContent((prev) => {
        const events = prev.events.map((ev, i) =>
          i === idx ? { ...ev, [eventField]: value } : ev,
        )
        return { ...prev, events }
      })
    }
    setDirty(true)
    setPushStatus('idle')
  }

  function handleAddEvent() {
    setContent((prev) => ({
      ...prev,
      events: [...prev.events, { id: String(Date.now()), title: 'New Event', date: 'June 14, 2026', time: '2:00 PM', location: 'Community Home' }],
    }))
    setDirty(true)
    setPushStatus('idle')
  }

  function handleRemoveEvent(id: string) {
    setContent((prev) => ({
      ...prev,
      events: prev.events.filter((ev) => ev.id !== id),
    }))
    setDirty(true)
    setPushStatus('idle')
  }

  function handleLocaleChange(newLocale: 'en' | 'fr') {
    setLocale(newLocale)
    const defaults = newLocale === 'en' ? contentEn : contentFr
    setContent(defaults)
    setOriginalContent(defaults)
    setDirty(false)
    setPushStatus('idle')

    // Try to fetch from GitHub
    const fileKey = newLocale === 'en' ? 'en' : 'fr'
    const filePath = `content/cms/${fileKey}.json`
    fetchFile(filePath).then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as CMSContent
        setContent(parsed)
        setOriginalContent(parsed)
        setFileShas((prev) => ({ ...prev, [filePath]: file.sha }))
      }
    }).catch(() => {})
  }

  const handlePush = useCallback(async () => {
    if (!dirty || pushing) return
    setPushing(true)
    setPushStatus('idle')

    if (!isGithubConfigured()) {
      setPushStatus('error')
      setPushMessage('GitHub is not configured. Set the NEXT_PUBLIC_GITHUB_PAT environment variable and redeploy.')
      setPushing(false)
      return
    }

    const fileKey = locale === 'en' ? 'en' : 'fr'
    const filePath = `content/cms/${fileKey}.json`
    const formatted = JSON.stringify(content, null, 2)
    const sha = fileShas[filePath]

    if (!sha) {
      setPushStatus('error')
      setPushMessage('Unable to verify file. Please refresh and try again.')
      setPushing(false)
      return
    }

    const result = await commitFiles(
      [{ path: filePath, content: formatted, sha }],
      'cms',
    )

    if (result.allOk) {
      setPushStatus('success')
      setPushMessage('Changes published! Site is rebuilding now.')
      setOriginalContent(content)
      setDirty(false)

      // Update SHA to current
      fetchFile(filePath).then((file) => {
        if (file) setFileShas((prev) => ({ ...prev, [filePath]: file.sha }))
      }).catch(() => {})
    } else {
      setPushStatus('error')
      setPushMessage(result.errors[0] || 'Failed to publish changes.')
    }

    setPushing(false)
  }, [dirty, pushing, locale, content, fileShas])

  const sectionLabels = ['Hero', 'Community', 'Activities', 'Events']

  if (!logged) {
    return <LoginScreen onLogin={() => setLogged(true)} />
  }

  return (
    <AdminShell
      locale={locale}
      onLocaleChange={handleLocaleChange}
      dirty={dirty}
      onPush={handlePush}
      pushing={pushing}
      pushStatus={pushStatus}
      pushMessage={pushMessage}
      sectionLabels={sectionLabels}
    >
      {/* Hero */}
      <SectionCard id="section-hero" label="Hero" page="Homepage" bgColor="bg-ivory">
        <HeroSection
          {...content.hero}
          editing={editing}
          onEdit={setEditing}
          onChange={handleFieldChange}
        />
      </SectionCard>

      {/* Community */}
      <SectionCard id="section-community" label="Community" page="Homepage" bgColor="bg-ivory">
        <CommunitySection
          {...content.community}
          editing={editing}
          onEdit={setEditing}
          onChange={handleFieldChange}
        />
      </SectionCard>

      {/* Activities */}
      <SectionCard id="section-activities" label="Activities" page="Homepage" bgColor="bg-parchment">
        <ActivitiesSection
          intro={content.activities.intro}
          items={content.activities.items}
          editing={editing}
          onEdit={setEditing}
          onChange={handleFieldChange}
        />
      </SectionCard>

      {/* Events */}
      <SectionCard id="section-events" label="Events" page="Events Page" bgColor="bg-ivory">
        <EventsSection
          events={content.events}
          editing={editing}
          onEdit={setEditing}
          onChange={handleFieldChange}
          onAdd={handleAddEvent}
          onRemove={handleRemoveEvent}
        />
      </SectionCard>
    </AdminShell>
  )
}
