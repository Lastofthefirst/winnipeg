'use client'

import { useState, useCallback, useEffect } from 'react'
import contentEnDefault from '../../../content/cms/en.json'
import contentFrDefault from '../../../content/cms/fr.json'
import writingsDefault from '../../../content/cms/writings.json'
import { WritingsSection, type WritingsEntry } from '@/admin/writings-section'
import { AdminShell, SectionCard } from '@/admin/shell'
import { DatePicker, TimePicker } from '@/admin/date-picker'
import { fetchFile, commitFiles, isGithubConfigured } from '@/admin/github'

// Import as build-time defaults
const contentEn = contentEnDefault as CMSContent
const contentFr = contentFrDefault as CMSContent

// ─── Content types ──────────────────────────────────────────────────────────

interface CMSContent {
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

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

// ─── Login screen ────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'w1nn3p3g-c0mmun1ty-2026'

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
      {events.map((event, idx) => (
        <div key={event.id} className="group relative">
          <article className="flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="space-y-2">
                <DatePicker field={`events.${idx}.date`} value={event.date} editing={editing} onEdit={onEdit} onChange={onChange} locale={locale} className="text-sm font-semibold text-burgundy-900" />
                <TimePicker field={`events.${idx}.time`} value={event.time} editing={editing} onEdit={onEdit} onChange={onChange} locale={locale} />
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

  // Writings state
  const [writings, setWritings] = useState<WritingsEntry[]>(writingsData)
  const [writingsDirty, setWritingsDirty] = useState(false)

  // File SHAs for GitHub commits
  const [fileShas, setFileShas] = useState<Record<string, string>>({})

  // On login, try to fetch latest content from GitHub
  useEffect(() => {
    if (!logged) return
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

    // Also fetch writings
    const writingsPath = 'content/cms/writings.json'
    fetchFile(writingsPath).then((file) => {
      if (file) {
        const parsed = JSON.parse(file.content) as WritingsEntry[]
        setWritings(parsed)
        setFileShas((prev) => ({ ...prev, [writingsPath]: file.sha }))
      }
    }).catch(() => {
      // Fall back to build-time defaults
    })
  }, [logged])

  // Field change handler
  function handleFieldChange(field: string, value: string) {
    const parts = field.split('.')
    if (parts[0] === 'events') {
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
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    setContent((prev) => ({
      ...prev,
      events: [...prev.events, { id: String(Date.now()), title: 'New Event', date: nextWeek.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }), time: '2:00 PM', location: 'Community Home' }],
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
    if ((!dirty && !writingsDirty) || pushing) return
    setPushing(true)
    setPushStatus('idle')

    if (!isGithubConfigured()) {
      setPushStatus('error')
      setPushMessage('GitHub is not configured. Set the NEXT_PUBLIC_GITHUB_PAT environment variable and redeploy.')
      setPushing(false)
      return
    }

    const filesToCommit: Array<{ path: string; content: string; sha: string }> = []

    // Commit content file if dirty
    if (dirty) {
      const fileKey = locale === 'en' ? 'en' : 'fr'
      const filePath = `content/cms/${fileKey}.json`
      const formatted = JSON.stringify(content, null, 2)
      const sha = fileShas[filePath]

      if (!sha) {
        setPushStatus('error')
        setPushMessage('Unable to verify content file. Please refresh and try again.')
        setPushing(false)
        return
      }
      filesToCommit.push({ path: filePath, content: formatted, sha })
    }

    // Commit writings file if dirty
    if (writingsDirty) {
      const writingsPath = 'content/cms/writings.json'
      const writingsFormatted = JSON.stringify(writings, null, 2)
      const writingsSha = fileShas[writingsPath]

      if (!writingsSha) {
        setPushStatus('error')
        setPushMessage('Unable to verify writings file. Please refresh and try again.')
        setPushing(false)
        return
      }
      filesToCommit.push({ path: writingsPath, content: writingsFormatted, sha: writingsSha })
    }

    const result = await commitFiles(filesToCommit, 'cms')

    if (result.allOk) {
      setPushStatus('success')
      setPushMessage('Changes published! Site is rebuilding now.')
      setOriginalContent(content)
      setDirty(false)
      setWritingsDirty(false)

      // Update SHAs
      if (dirty) {
        const fileKey = locale === 'en' ? 'en' : 'fr'
        const filePath = `content/cms/${fileKey}.json`
        fetchFile(filePath).then((file) => {
          if (file) setFileShas((prev) => ({ ...prev, [filePath]: file.sha }))
        }).catch(() => {})
      }
      if (writingsDirty) {
        const writingsPath = 'content/cms/writings.json'
        fetchFile(writingsPath).then((file) => {
          if (file) setFileShas((prev) => ({ ...prev, [writingsPath]: file.sha }))
        }).catch(() => {})
      }
    } else {
      setPushStatus('error')
      setPushMessage(result.errors[0] || 'Failed to publish changes.')
    }

    setPushing(false)
  }, [dirty, writingsDirty, pushing, locale, content, writings, fileShas])

  const sectionLabels = ['Events', 'Writings']

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
      {/* Events */}
      <SectionCard id="section-events" label="Events" page="Events Page" bgColor="bg-ivory">
        <EventsSection
          events={content.events}
          editing={editing}
          onEdit={setEditing}
          onChange={handleFieldChange}
          onAdd={handleAddEvent}
          onRemove={handleRemoveEvent}
          locale={locale}
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

// ─── Shared editable text component ──────────────────────────────────────────

function EditableText({
  field,
  value,
  editing,
  onEdit,
  onChange,
  as: Tag = 'p',
  className = '',
}: {
  field: string
  value: string
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  as?: 'p' | 'h1' | 'h2' | 'h3'
  className?: string
}) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  if (editing === field) {
    if (Tag === 'h1' || Tag === 'h2' || Tag === 'h3') {
      return (
        <Tag
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onChange(field, e.currentTarget.textContent || '')}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() } }}
          className={className}
        >
          {localValue}
        </Tag>
      )
    }
    return (
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange(field, e.currentTarget.textContent || '')}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() } }}
        className={className}
      >
        {localValue}
      </p>
    )
  }

  return (
    <Tag
      onClick={() => onEdit(field)}
      className={`${className} cursor-text hover:bg-gold-400/10 rounded transition`}
    >
      {value || <span className="italic text-burgundy-300">Click to edit…</span>}
    </Tag>
  )
}
