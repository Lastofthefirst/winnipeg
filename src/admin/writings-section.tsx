'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

import { WRITING_IMAGES } from '@/admin/writings-images'



// ─── Types ───────────────────────────────────────────────────────────────────

export interface WritingsEntry {
  slug: string
  passage: string
  source: string
  language: string
  image: string
}

// ─── Icons ───────────────────────────────────────────────────────────────────

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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─── Language autocomplete input ─────────────────────────────────────────────

// ─── Autocomplete input ──────────────────────────────────────────────────────

function AutocompleteInput({
  value,
  onChange,
  suggestions,
  placeholder,
  autoCapitalize = false,
}: {
  value: string
  onChange: (val: string) => void
  suggestions: string[]
  placeholder?: string
  autoCapitalize?: boolean
}) {
  const [input, setInput] = useState(value)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focused, setFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  function setInputValue(val: string) {
    if (autoCapitalize && val.length > 0) {
      setInput(val[0].toUpperCase() + val.slice(1))
    } else {
      setInput(val)
    }
  }

  const filtered =
    input.trim() === ''
      ? suggestions
      : suggestions.filter((s) =>
          s.toLowerCase().includes(input.trim().toLowerCase()),
        )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(s: string) {
    setInput(s)
    onChange(s)
    setShowSuggestions(false)
  }

  function handleBlur() {
    if (input.trim()) onChange(input.trim())
    setShowSuggestions(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => { setInputValue(e.target.value); setShowSuggestions(true) }}
        onFocus={() => { setShowSuggestions(true); setFocused(true) }}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && filtered.length > 0) {
            e.preventDefault()
            handleSelect(filtered[0]!)
          }
        }}
        placeholder={placeholder}
        className="w-full bg-transparent px-0 text-sm text-burgundy-900 placeholder-burgundy-300 transition focus:outline-none"
      />
      {showSuggestions && focused && filtered.length > 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-burgundy-200 bg-white py-1 shadow-lg">
          {filtered.slice(0, 8).map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={() => handleSelect(s)}
              className={`block w-full px-3 py-1.5 text-left text-sm transition ${
                s.toLowerCase() === input.trim().toLowerCase()
                  ? 'bg-burgundy-50 font-semibold text-burgundy-900'
                  : 'text-burgundy-700 hover:bg-burgundy-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function LanguageInput({
  value,
  onChange,
  existingLanguages,
}: {
  value: string
  onChange: (val: string) => void
  existingLanguages: string[]
}) {
  return (
    <AutocompleteInput
      value={value}
      onChange={onChange}
      suggestions={existingLanguages}
      placeholder="Language (e.g. English, Cree...)"
      autoCapitalize
    />
  )
}

// ─── Writing form (add/edit) ─────────────────────────────────────────────────

function WritingForm({
  initial,
  onSave,
  onCancel,
  existingLanguages,
  existingSources,
}: {
  initial?: WritingsEntry
  onSave: (entry: WritingsEntry) => void
  onCancel: () => void
  existingLanguages: string[]
  existingSources: string[]
}) {
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [passage, setPassage] = useState(initial?.passage ?? '')
  const [source, setSource] = useState(initial?.source ?? '')
  const [language, setLanguage] = useState(initial?.language ?? '')
  const [image, setImage] = useState(initial?.image ?? '')
  const [pickingImage, setPickingImage] = useState(!initial) // default to picker when adding new

  const slugRef = useRef<HTMLInputElement>(null)
  useEffect(() => { slugRef.current?.focus() }, [])

  function handleSubmit() {
    if (!slug.trim() || !passage.trim() || !source.trim() || !language.trim() || !image) return
    onSave({
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      passage: passage.trim(),
      source: source.trim(),
      language: language.trim(),
      image,
    })
  }

  const canSave = slug.trim() && passage.trim() && source.trim() && language.trim() && image

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-burgundy-200 bg-parchment p-6">
      {/* Gold divider */}
      <div className="mx-auto mb-8 h-px w-20 bg-gold-500" />
      {/* Image preview / picker — fixed height, no layout shift */}
      <div className="relative overflow-hidden">
        {pickingImage ? (
          /* Thumbnail grid picker — scrollable */
          <div className="grid grid-cols-4 gap-2 p-3 sm:grid-cols-6 lg:grid-cols-8 overflow-y-auto" style={{ height: 360 }}>
            {WRITING_IMAGES.map((img) => (
              <button
                key={img}
                type="button"
                onClick={() => { setImage(img); setPickingImage(false) }}
                className={`relative overflow-hidden rounded-lg border-2 bg-parchment transition aspect-square flex items-center justify-center p-1 ${
                  image === img
                    ? 'border-burgundy-900 ring-1 ring-burgundy-900'
                    : 'border-transparent hover:border-burgundy-300'
                }`}
              >
                <img
                  src={`/writings-nature/${img}`}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            ))}
          </div>
        ) : (
          /* Preview */
          <div className="flex justify-center p-4 items-center" style={{ height: 360 }}>
            {image ? (
              <img
                src={`/writings-nature/${image}`}
                alt="Selected preview"
                className="h-full w-auto max-w-full object-contain"
              />
            ) : (
              <span className="text-xs text-burgundy-300 italic">No image selected</span>
            )}
          </div>
        )}
        {/* Change Image button */}
        <button
          type="button"
          onClick={() => setPickingImage(!pickingImage)}
          className="absolute right-3 top-3 rounded-lg border border-burgundy-200 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-burgundy-500 backdrop-blur transition hover:border-burgundy-400 hover:text-burgundy-900"
        >
          {pickingImage ? 'Cancel' : 'Change Image'}
        </button>
      </div>

      {/* Passage — styled like the live page */}
      <div className="mt-8">
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          rows={5}
          placeholder="Passage or prayer..."
          className="w-full resize-none bg-transparent px-4 font-display text-lg font-normal leading-relaxed text-burgundy-900 placeholder-burgundy-300 focus:outline-none sm:text-xl lg:text-2xl"
          style={{ minHeight: 120 }}
        />
      </div>

      {/* Gold divider */}
      <div className="mx-auto my-6 h-px w-16 bg-gold-400" />

      {/* Source — styled like figcaption */}
      <div className="text-center">
        <AutocompleteInput
          value={source}
          onChange={setSource}
          suggestions={existingSources}
          placeholder="Source"
        />
      </div>

      {/* Gold divider */}
      <div className="mx-auto mt-8 h-px w-20 bg-gold-500" />

      {/* Meta fields */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-burgundy-400">
            Slug
          </label>
          <input
            ref={slugRef}
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. unity"
            className="w-full bg-transparent px-0 text-sm text-burgundy-900 placeholder-burgundy-300 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-burgundy-400">
            Language
          </label>
          <LanguageInput value={language} onChange={setLanguage} existingLanguages={existingLanguages} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between border-t border-burgundy-100 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-burgundy-400 transition hover:text-burgundy-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSave}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium uppercase tracking-widest transition ${
            canSave
              ? 'border border-burgundy-900 bg-burgundy-900 text-ivory hover:bg-burgundy-800'
              : 'border border-stone-200 bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
        >
          {initial ? 'Save Changes' : 'Add Writing'}
        </button>
      </div>
    </div>
  )
}

// ─── Writing card ────────────────────────────────────────────────────────────

function WritingCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: WritingsEntry
  onEdit: (entry: WritingsEntry) => void
  onDelete: (slug: string) => void
}) {
  const preview = entry.passage.length > 120 ? entry.passage.slice(0, 120) + '…' : entry.passage

  return (
    <div className="group relative">
      <article
        className="flex w-full flex-col overflow-hidden rounded-xl border border-burgundy-200 bg-parchment pt-3 transition hover:border-burgundy-400"
        onClick={() => onEdit(entry)}
      >
        {/* Image thumbnail */}
        <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-t-lg bg-parchment">
          <img
            src={`/writings-nature/${entry.image}`}
            alt=""
            className="h-full w-auto object-contain"
          />
        </div>

        <div className="flex flex-1 flex-col border-t border-burgundy-100 p-4">
          {/* Language badge */}
          <span className="inline-block w-fit rounded-full border border-gold-300 bg-gold-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-700">
            {entry.language}
          </span>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-burgundy-700">
            {preview}
          </p>
          <p className="mt-2 text-xs text-burgundy-400">— {entry.source}</p>
          <a
            href={`/writings/${entry.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-1 inline-block text-[10px] font-mono text-burgundy-300 underline underline-offset-2 decoration-burgundy-200 hover:text-burgundy-600 hover:decoration-burgundy-400"
          >
            /{entry.slug} ↗
          </a>
        </div>
      </article>

      {/* Actions */}
      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(entry) }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-burgundy-500 backdrop-blur transition hover:bg-burgundy-50 hover:text-burgundy-900"
          aria-label="Edit writing"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(entry.slug) }}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-stone-400 backdrop-blur transition hover:bg-red-50 hover:text-red-500"
          aria-label="Delete writing"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}

// ─── Main section ────────────────────────────────────────────────────────────

export function WritingsSection({
  entries,
  onAdd,
  onEdit,
  onRemove,
}: {
  entries: WritingsEntry[]
  onAdd: (entry: WritingsEntry) => void
  onEdit: (entry: WritingsEntry) => void
  onRemove: (slug: string) => void
}) {
  const [filter, setFilter] = useState<string>('')
  const [formMode, setFormMode] = useState<'idle' | 'adding' | 'editing'>('idle')
  const [editingEntry, setEditingEntry] = useState<WritingsEntry | null>(null)

  // Collect unique languages and sources from entries
  const languages = Array.from(new Set(entries.map((e) => e.language))).sort()
  const sources = Array.from(new Set(entries.map((e) => e.source))).sort()

  const filtered = filter ? entries.filter((e) => e.language === filter) : entries

  function handleStartEdit(entry: WritingsEntry) {
    setEditingEntry(entry)
    setFormMode('editing')
  }

  function handleSave(entry: WritingsEntry) {
    if (formMode === 'editing') {
      onEdit(entry)
    } else {
      onAdd(entry)
    }
    setFormMode('idle')
    setEditingEntry(null)
  }

  function handleCancel() {
    setFormMode('idle')
    setEditingEntry(null)
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Language tags */}
        {languages.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('')}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                filter === ''
                  ? 'border-burgundy-900 bg-burgundy-900 text-ivory'
                  : 'border-burgundy-200 bg-white text-burgundy-500 hover:border-burgundy-400 hover:text-burgundy-900'
              }`}
            >
              All ({entries.length})
            </button>
            {languages.map((lang) => {
              const count = entries.filter((e) => e.language === lang).length
              const isActive = filter === lang
              return (
                <button
                  key={lang}
                  onClick={() => setFilter(isActive ? '' : lang)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    isActive
                      ? 'border-burgundy-900 bg-burgundy-900 text-ivory'
                      : 'border-burgundy-200 bg-white text-burgundy-500 hover:border-burgundy-400 hover:text-burgundy-900'
                  }`}
                >
                  {lang} ({count})
                </button>
              )
            })}
          </div>
        )}

        <div className="flex-1" />
        {filter && (
          <span className="text-xs text-burgundy-400">
            {filtered.length} writing{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Add/Edit form */}
      {formMode !== 'idle' && (
        <div className="mb-6">
          <WritingForm
            initial={formMode === 'editing' ? editingEntry! : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
            existingLanguages={languages}
            existingSources={sources}
          />
        </div>
      )}

      {/* Card grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* Add button — first in grid */}
        {formMode === 'idle' && (
          <button
            onClick={() => setFormMode('adding')}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-burgundy-200 bg-stone-50 py-16 text-sm font-medium text-burgundy-400 transition hover:border-burgundy-300 hover:bg-ivory hover:text-burgundy-600"
          >
            <PlusIcon />
            Add Writing
          </button>
        )}

        {filtered.map((entry) => (
          <WritingCard
            key={entry.slug}
            entry={entry}
            onEdit={handleStartEdit}
            onDelete={(slug) => { onRemove(slug); setEditingEntry(null); setFormMode('idle') }}
          />
        ))}
      </div>
    </div>
  )
}
