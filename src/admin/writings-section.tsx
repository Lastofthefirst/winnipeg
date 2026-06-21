'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

import { WRITING_IMAGES } from '@/admin/writings-images'

// ─── Known languages for autocomplete ────────────────────────────────────────

const KNOWN_LANGUAGES = [
  'English',
  'French',
  'Cree',
  'Ojibway',
  'Dakota',
  'Navajo',
  'Spanish',
  'Arabic',
  'Persian',
  'Russian',
  'Portuguese',
  'German',
  'Italian',
  'Chinese',
  'Japanese',
  'Korean',
  'Hindi',
  'Urdu',
  'Swahili',
  'Turkish',
] as const

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

function LanguageInput({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [input, setInput] = useState(value)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focused, setFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions =
    input.trim() === ''
      ? KNOWN_LANGUAGES
      : KNOWN_LANGUAGES.filter((l) =>
          l.toLowerCase().includes(input.trim().toLowerCase()),
        )

  // Close suggestions on outside click
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

  function handleSelect(lang: string) {
    setInput(lang)
    onChange(lang)
    setShowSuggestions(false)
  }

  function handleBlur() {
    // Commit what was typed if not a known language
    if (input.trim() && !KNOWN_LANGUAGES.includes(input.trim() as typeof KNOWN_LANGUAGES[number])) {
      onChange(input.trim())
    }
    setShowSuggestions(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => { setInput(e.target.value); setShowSuggestions(true) }}
        onFocus={() => { setShowSuggestions(true); setFocused(true) }}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && suggestions.length > 0) {
            e.preventDefault()
            handleSelect(suggestions[0]!)
          }
        }}
        placeholder="Language (e.g. English, Cree...)"
        className="w-full rounded-lg border border-burgundy-200 bg-ivory px-3 py-2 text-sm text-burgundy-900 placeholder-burgundy-300 transition focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/20"
      />
      {showSuggestions && focused && suggestions.length > 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-lg border border-burgundy-200 bg-white py-1 shadow-lg">
          {suggestions.slice(0, 8).map((lang) => (
            <button
              key={lang}
              type="button"
              onMouseDown={() => handleSelect(lang)}
              className={`block w-full px-3 py-1.5 text-left text-sm transition ${
                lang === input.trim()
                  ? 'bg-burgundy-50 font-semibold text-burgundy-900'
                  : 'text-burgundy-700 hover:bg-burgundy-50'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Writing form (add/edit) ─────────────────────────────────────────────────

function WritingForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: WritingsEntry
  onSave: (entry: WritingsEntry) => void
  onCancel: () => void
}) {
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [passage, setPassage] = useState(initial?.passage ?? '')
  const [source, setSource] = useState(initial?.source ?? '')
  const [language, setLanguage] = useState(initial?.language ?? '')
  const [image, setImage] = useState(initial?.image ?? '')

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
    <div className="space-y-4 rounded-xl border border-burgundy-200 bg-ivory p-6">
      {/* Image preview */}
      {image && (
        <div className="flex justify-center bg-parchment rounded-lg p-4">
          <img
            src={`/writings-nature/${image}`}
            alt="Preview"
            className="h-auto w-full max-w-sm object-contain"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-burgundy-500">
            Slug
          </label>
          <input
            ref={slugRef}
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. unity"
            className="w-full rounded-lg border border-burgundy-200 bg-white px-3 py-2 text-sm text-burgundy-900 placeholder-burgundy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-burgundy-500">
            Language
          </label>
          <LanguageInput value={language} onChange={setLanguage} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-burgundy-500">
          Passage
        </label>
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          rows={5}
          placeholder="Full text of the passage or prayer..."
          className="w-full rounded-lg border border-burgundy-200 bg-white px-3 py-2 text-sm text-burgundy-900 placeholder-burgundy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-burgundy-500">
            Source
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. Bahá'u'lláh"
            className="w-full rounded-lg border border-burgundy-200 bg-white px-3 py-2 text-sm text-burgundy-900 placeholder-burgundy-300 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-burgundy-500">
            Image
          </label>
          <select
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-lg border border-burgundy-200 bg-white px-3 py-2 text-sm text-burgundy-900 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20"
          >
            <option value="">Select an image…</option>
            {WRITING_IMAGES.map((img) => (
              <option key={img} value={img}>
                {img.replace(/-01_00001_\.png$/i, '').replace(/-/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preview */}
      {passage && (
        <div className="rounded-lg border border-burgundy-100 bg-white/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-burgundy-400">Preview</p>
          <p className="mt-2 font-display text-sm leading-relaxed text-burgundy-700 italic">
            {passage.length > 200 ? passage.slice(0, 200) + '…' : passage}
          </p>
          <p className="mt-2 text-xs text-burgundy-400">— {source || 'Source'}</p>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-medium text-burgundy-500 transition hover:text-burgundy-900"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSave}
          className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
            canSave
              ? 'bg-burgundy-900 text-white hover:bg-burgundy-800'
              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
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

  // Collect unique languages from entries
  const languages = Array.from(new Set(entries.map((e) => e.language))).sort()

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
