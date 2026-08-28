'use client'

import { useState, useCallback, useEffect } from 'react'
import ExportedImage from 'next-image-export-optimizer'
import contentEnDefault from '../../../content/cms/en.json'
import contentFrDefault from '../../../content/cms/fr.json'
import writingsDefault from '../../../content/cms/writings.json'
import eventsDefault from '../../../content/cms/events.json'
import { WritingsSection, type WritingsEntry } from '@/admin/writings-section'
import { EventsSection } from '@/admin/events-section'
import { AdminShell, SectionCard } from '@/admin/shell'
import { EditableText as EditableTextImport } from '@/admin/editable'
import { fetchFile, commitFiles, isGithubConfigured } from '@/admin/github'
import { dateToISO } from '@/utils/eventDate'
import type { CmsEvent } from '@/utils/events'

// Import as build-time defaults
const contentEn = contentEnDefault as CMSContent
const contentFr = contentFrDefault as CMSContent

// ─── Content types ──────────────────────────────────────────────────────────

interface CMSContent {
  community: {
    eyebrow: string
    heading: string
    body: string[]
    link: string
    image: string
  }
}

const writingsData = writingsDefault as WritingsEntry[]
const eventsData = eventsDefault as CmsEvent[]

// ─── Icons ───────────────────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// ─── Login screen ────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'nineyearplan'

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) onLogin()
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
      </div>
    </div>
  )
}

// ─── Community section ──────────────────────────────────────────────────────

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
        <EditableTextImport field="community.eyebrow" value={eyebrow} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="font-display text-sm uppercase tracking-[0.25em] text-burgundy-500" />
        <EditableTextImport field="community.heading" value={heading} editing={editing} onEdit={onEdit} onChange={onChange} as="h2" className="mt-4 block font-display text-3xl font-normal text-burgundy-900 sm:text-4xl" />
        <div className="mt-6 space-y-4 text-base leading-relaxed text-burgundy-700">
          {body.map((p, i) => (
            <EditableTextImport key={i} field={`community.body.${i}`} value={p} editing={editing} onEdit={onEdit} onChange={onChange} as="p" />
          ))}
        </div>
        <div className="mt-8">
          <EditableTextImport field="community.link" value={link} editing={editing} onEdit={onEdit} onChange={onChange} as="span" className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900" />
        </div>
      </div>
      <div className="relative mt-8 aspect-[3/4] w-full overflow-hidden rounded-lg lg:mt-0 lg:w-1/2">
        <ExportedImage
          src={image}
          alt="Community"
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="rounded-lg"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}

// ─── Admin page ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [logged, setLogged] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('admin-logged') === 'true'
  })

  // Per-section locale toggles
  const [communityLocale, setCommunityLocale] = useState<'en' | 'fr'>('en')
  const [eventsLocale, setEventsLocale] = useState<'en' | 'fr'>('en')

  // Both locale contents loaded simultaneously
  const [contentEnState, setContentEnState] = useState<CMSContent>(contentEn)
  const [contentFrState, setContentFrState] = useState<CMSContent>(contentFr)
  const [eventsState, setEventsState] = useState<CmsEvent[]>(eventsData)

  const [editing, setEditing] = useState<string | null>(null)
  const [enDirty, setEnDirty] = useState(false)
  const [frDirty, setFrDirty] = useState(false)
  const [eventsDirty, setEventsDirty] = useState(false)
  const [pushing, setPushing] = useState(false)
  const [pushStatus, setPushStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [pushMessage, setPushMessage] = useState('')
  const [rebuildSeconds, setRebuildSeconds] = useState(0)

  // Countdown timer for rebuild estimate
  useEffect(() => {
    if (rebuildSeconds <= 0) return
    const timer = setTimeout(() => setRebuildSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [rebuildSeconds])

  const statusMessage = pushStatus === 'success'
    ? rebuildSeconds > 0
      ? 'Changes published! Site is rebuilding now…'
      : 'Changes should be live shortly'
    : pushMessage

  // Writings state
  const [writings, setWritings] = useState<WritingsEntry[]>(writingsData)
  const [writingsDirty, setWritingsDirty] = useState(false)

  const dirty = enDirty || frDirty || writingsDirty || eventsDirty

  // On login, fetch latest content from GitHub for both locales
  useEffect(() => {
    if (!logged) return

    // Fetch EN
    fetchFile('content/cms/en.json').then((file) => {
      if (file) {
        setContentEnState(JSON.parse(file.content) as CMSContent)
      }
    }).catch(() => {})

    // Fetch FR
    fetchFile('content/cms/fr.json').then((file) => {
      if (file) {
        setContentFrState(JSON.parse(file.content) as CMSContent)
      }
    }).catch(() => {})

    // Fetch writings
    fetchFile('content/cms/writings.json').then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as WritingsEntry[]
        setWritings(parsed)
      }
    }).catch(() => {})

    // Fetch events
    fetchFile('content/cms/events.json').then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as CmsEvent[]
        setEventsState(parsed)
      }
    }).catch(() => {})
  }, [logged])

  // Field change handler — scoped by section locale
  function handleCommunityChange(field: string, value: string) {
    const parts = field.split('.')
    const setter = communityLocale === 'en' ? setContentEnState : setContentFrState
    const dirtySetter = communityLocale === 'en' ? setEnDirty : setFrDirty

    if (parts[1] === 'body') {
      const idx = parseInt(parts[2]!)
      setter((prev) => {
        const body = [...prev.community.body]
        body[idx] = value
        return { ...prev, community: { ...prev.community, body } }
      })
    } else {
      setter((prev) => ({ ...prev, community: { ...prev.community, [parts[1]!]: value } }))
    }
    dirtySetter(true)
    setPushStatus('idle')
  }

  const LOCALED_EVENT_FIELDS = ['title', 'location', 'description']

  function handleEventsChange(field: string, value: string) {
    const parts = field.split('.')
    const idx = parseInt(parts[1]!)
    let eventField = parts[2]!
    if (LOCALED_EVENT_FIELDS.includes(eventField)) {
      eventField = `${eventField}_${eventsLocale}`
    }
    setEventsState((prev) =>
      prev.map((ev, i) => (i === idx ? { ...ev, [eventField]: value } : ev)),
    )
    setEventsDirty(true)
    setPushStatus('idle')
  }

  function handleEventUpdate(index: number, next: CmsEvent) {
    setEventsState((prev) => prev.map((ev, i) => (i === index ? next : ev)))
    setEventsDirty(true)
    setPushStatus('idle')
  }

  function handleAddEvent() {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const newIdx = eventsState.length
    const title = eventsLocale === 'fr' ? 'Nouvel événement' : 'New Event'
    setEventsState((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title_en: eventsLocale === 'en' ? title : '',
        title_fr: eventsLocale === 'fr' ? title : '',
        location_en: '',
        location_fr: '',
        description_en: '',
        description_fr: '',
        repeat: null,
        slots: [{ date: dateToISO(nextWeek), time: '2:00 PM' }],
      },
    ])
    setEditing(`events.${newIdx}.title`)
    setEventsDirty(true)
    setPushStatus('idle')
  }

  function handleRemoveEvent(id: string) {
    setEventsState((prev) => prev.filter((ev) => ev.id !== id))
    setEventsDirty(true)
    setPushStatus('idle')
  }

  // ─── Writings handlers ─────────────────────────────────────────────────

  function handleAddWriting(entry: WritingsEntry) {
    setWritings((prev) => [...prev, entry])
    setWritingsDirty(true)
    setPushStatus('idle')
  }

  function handleEditWriting(updated: WritingsEntry) {
    setWritings((prev) =>
      prev.map((e) => (e.slug === updated.slug ? updated : e)),
    )
    setWritingsDirty(true)
    setPushStatus('idle')
  }

  function handleRemoveWriting(slug: string) {
    setWritings((prev) => prev.filter((e) => e.slug !== slug))
    setWritingsDirty(true)
    setPushStatus('idle')
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

    const filesToCommit: Array<{ path: string; content: string }> = []

    // Commit EN if dirty
    if (enDirty) {
      filesToCommit.push({ path: 'content/cms/en.json', content: JSON.stringify(contentEnState, null, 2) })
    }

    // Commit FR if dirty
    if (frDirty) {
      filesToCommit.push({ path: 'content/cms/fr.json', content: JSON.stringify(contentFrState, null, 2) })
    }

    // Commit writings if dirty
    if (writingsDirty) {
      filesToCommit.push({ path: 'content/cms/writings.json', content: JSON.stringify(writings, null, 2) })
    }

    // Commit events if dirty
    if (eventsDirty) {
      filesToCommit.push({ path: 'content/cms/events.json', content: JSON.stringify(eventsState, null, 2) })
    }

    const result = await commitFiles(filesToCommit, 'cms')

    if (result.ok) {
      setPushStatus('success')
      setRebuildSeconds(120)
      setEnDirty(false)
      setFrDirty(false)
      setWritingsDirty(false)
      setEventsDirty(false)
    } else {
      setPushStatus('error')
      setPushMessage(result.error || 'Failed to publish changes.')
    }

    setPushing(false)
  }, [dirty, pushing, enDirty, frDirty, eventsDirty, contentEnState, contentFrState, eventsState, writings, writingsDirty])

  const sectionLabels = ['Community', 'Events', 'Writings']

  if (!logged) {
    return <LoginScreen onLogin={() => { setLogged(true); localStorage.setItem('admin-logged', 'true') }} />
  }

  return (
    <AdminShell
      dirty={dirty}
      onPush={handlePush}
      pushing={pushing}
      pushStatus={pushStatus}
      pushMessage={statusMessage}
      rebuildSeconds={rebuildSeconds}
      sectionLabels={sectionLabels}
    >
      {/* Community */}
      <SectionCard id="section-community" label="Community" page="Homepage" bgColor="bg-parchment" locale={communityLocale} onLocaleChange={setCommunityLocale}>
        <CommunitySection
          {...(communityLocale === 'en' ? contentEnState : contentFrState).community}
          editing={editing}
          onEdit={setEditing}
          onChange={handleCommunityChange}
        />
      </SectionCard>

      {/* Events */}
      <SectionCard id="section-events" label="Events" page="Events Page" bgColor="bg-ivory" locale={eventsLocale} onLocaleChange={setEventsLocale}>
        <EventsSection
          events={eventsState}
          locale={eventsLocale}
          editing={editing}
          onEdit={setEditing}
          onChange={handleEventsChange}
          onEventUpdate={handleEventUpdate}
          onAdd={handleAddEvent}
          onRemove={handleRemoveEvent}
        />
      </SectionCard>

      {/* Writings */}
      <SectionCard id="section-writings" label="Writings" page="Writings" bgColor="bg-ivory">
        <WritingsSection
          entries={writings}
          onAdd={handleAddWriting}
          onEdit={handleEditWriting}
          onRemove={handleRemoveWriting}
        />
      </SectionCard>
    </AdminShell>
  )
}
