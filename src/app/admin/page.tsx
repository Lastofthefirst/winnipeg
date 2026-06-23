'use client'

import { useState, useCallback, useEffect } from 'react'
import contentEnDefault from '../../../content/cms/en.json'
import contentFrDefault from '../../../content/cms/fr.json'
import writingsDefault from '../../../content/cms/writings.json'
import { WritingsSection, type WritingsEntry } from '@/admin/writings-section'
import { AdminShell, SectionCard } from '@/admin/shell'
import { EditableText as EditableTextImport } from '@/admin/editable'
import { DatePicker, TimePicker } from '@/admin/date-picker'
import { fetchFile, commitFiles, isGithubConfigured } from '@/admin/github'
import { parseEventDate } from '@/utils/eventDate'

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
  events: Array<{ id: string; title: string; date: string; time: string; location: string }>
}

const writingsData = writingsDefault as WritingsEntry[]

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
      <div className="mt-8 lg:mt-0 lg:w-1/2">
        <img src={image} alt="Community" className="w-full object-contain rounded-lg" />
      </div>
    </div>
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
  locale,
}: {
  events: Array<{ id: string; title: string; date: string; time: string; location: string }>
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  onAdd: () => void
  onRemove: (id: string) => void
  locale: 'en' | 'fr'
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, idx) => {
        const eventDate = parseEventDate(event.date)
        const isPast = eventDate < new Date()

        return (
        <div key={event.id} className="group relative">
          <article className={`flex w-full flex-col overflow-hidden border transition ${isPast ? 'border-burgundy-100 bg-stone-50 opacity-60' : 'border-burgundy-200 bg-ivory hover:border-burgundy-400'}`}>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="space-y-2">
                <DatePicker field={`events.${idx}.date`} value={event.date} editing={editing} onEdit={onEdit} onChange={onChange} locale={locale} className="text-sm font-semibold text-burgundy-900" />
                <TimePicker field={`events.${idx}.time`} value={event.time} editing={editing} onEdit={onEdit} onChange={onChange} locale={locale} />
              </div>
              <EditableTextImport field={`events.${idx}.title`} value={event.title} editing={editing} onEdit={onEdit} onChange={onChange} as="h3" className="mt-6 font-display text-2xl font-normal text-burgundy-900" />
              {event.location && (
                <EditableTextImport field={`events.${idx}.location`} value={event.location} editing={editing} onEdit={onEdit} onChange={onChange} as="p" className="mt-2 text-sm text-burgundy-500" />
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
        )
      })}

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
  const [originalEn, setOriginalEn] = useState<CMSContent>(contentEn)
  const [originalFr, setOriginalFr] = useState<CMSContent>(contentFr)

  const [editing, setEditing] = useState<string | null>(null)
  const [enDirty, setEnDirty] = useState(false)
  const [frDirty, setFrDirty] = useState(false)
  const [pushing, setPushing] = useState(false)
  const [pushStatus, setPushStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [pushMessage, setPushMessage] = useState('')
  const [rebuildSeconds, setRebuildSeconds] = useState(0)

  // Countdown timer for rebuild estimate
  useEffect(() => {
    if (rebuildSeconds <= 0) return
    if (rebuildSeconds === 1) {
      setPushMessage('Changes should be live shortly')
      return
    }
    const timer = setTimeout(() => setRebuildSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [rebuildSeconds])

  // Writings state
  const [writings, setWritings] = useState<WritingsEntry[]>(writingsData)
  const [writingsDirty, setWritingsDirty] = useState(false)



  const dirty = enDirty || frDirty || writingsDirty

  // On login, fetch latest content from GitHub for both locales
  useEffect(() => {
    if (!logged) return

    // Fetch EN
    fetchFile('content/cms/en.json').then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as CMSContent
        setContentEnState(parsed)
        setOriginalEn(parsed)
      }
    }).catch(() => {})

    // Fetch FR
    fetchFile('content/cms/fr.json').then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as CMSContent
        setContentFrState(parsed)
        setOriginalFr(parsed)
      }
    }).catch(() => {})

    // Fetch writings
    fetchFile('content/cms/writings.json').then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as WritingsEntry[]
        setWritings(parsed)
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

  function handleEventsChange(field: string, value: string) {
    const parts = field.split('.')
    const setter = eventsLocale === 'en' ? setContentEnState : setContentFrState
    const dirtySetter = eventsLocale === 'en' ? setEnDirty : setFrDirty

    const idx = parseInt(parts[1]!)
    const eventField = parts[2]!
    setter((prev) => {
      const events = prev.events.map((ev, i) =>
        i === idx ? { ...ev, [eventField]: value } : ev,
      )
      return { ...prev, events }
    })
    dirtySetter(true)
    setPushStatus('idle')
  }

  function handleAddEvent() {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const setter = eventsLocale === 'en' ? setContentEnState : setContentFrState
    const dirtySetter = eventsLocale === 'en' ? setEnDirty : setFrDirty
    setter((prev) => ({
      ...prev,
      events: [...prev.events, { id: String(Date.now()), title: 'New Event', date: nextWeek.toLocaleDateString(eventsLocale === 'fr' ? 'fr-CA' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }), time: '2:00 PM', location: 'Community Home' }],
    }))
    dirtySetter(true)
    setPushStatus('idle')
  }

  function handleRemoveEvent(id: string) {
    const setter = eventsLocale === 'en' ? setContentEnState : setContentFrState
    const dirtySetter = eventsLocale === 'en' ? setEnDirty : setFrDirty
    setter((prev) => ({
      ...prev,
      events: prev.events.filter((ev) => ev.id !== id),
    }))
    dirtySetter(true)
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

    const result = await commitFiles(filesToCommit, 'cms')

    if (result.ok) {
      setPushStatus('success')
      setPushMessage('Changes published! Site is rebuilding now…')
      setRebuildSeconds(120)
      setOriginalEn(contentEnState)
      setOriginalFr(contentFrState)
      setEnDirty(false)
      setFrDirty(false)
      setWritingsDirty(false)
    } else {
      setPushStatus('error')
      setPushMessage(result.error || 'Failed to publish changes.')
    }

    setPushing(false)
  }, [dirty, pushing, enDirty, frDirty, contentEnState, contentFrState, writings, writingsDirty])

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
      pushMessage={pushMessage}
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
          events={(eventsLocale === 'en' ? contentEnState : contentFrState).events}
          editing={editing}
          onEdit={setEditing}
          onChange={handleEventsChange}
          onAdd={handleAddEvent}
          onRemove={handleRemoveEvent}
          locale={eventsLocale}
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
