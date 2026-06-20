'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ─── Date / time formatting helpers ─────────────────────────────────────────

/** Parse a date string (ISO, "Month Day, Year", etc.) and return YYYY-MM-DD. */
function parseDateToISO(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

/** Format YYYY-MM-DD into "Month Day, Year" (e.g. "June 14, 2026"). */
function formatDateFromISO(isoStr: string, locale: 'en' | 'fr' = 'en'): string {
  if (!isoStr) return ''
  const d = new Date(isoStr + 'T00:00:00')
  return d.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

// ─── Icons ──────────────────────────────────────────────────────────────────

function CalendarIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

// ─── Date Picker ────────────────────────────────────────────────────────────

interface DatePickerProps {
  field: string
  value: string      // displayed date (any parseable format)
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  locale: 'en' | 'fr'
  className?: string
}

export function DatePicker({
  field,
  value,
  editing,
  onEdit,
  onChange,
  locale,
  className = '',
}: DatePickerProps) {
  const isEditing = editing === field
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // When not editing, show the formatted value
  const [draftISO, setDraftISO] = useState(parseDateToISO(value))

  useEffect(() => {
    if (!isEditing) setDraftISO(parseDateToISO(value))
  }, [isEditing, value])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const handleCommit = useCallback((isoVal: string) => {
    const display = formatDateFromISO(isoVal, locale)
    onChange(field, display)
    onEdit('')
  }, [field, locale, onChange, onEdit])

  const handleClick = useCallback(() => {
    setDraftISO(parseDateToISO(value))
    onEdit(field)
  }, [field, value, onEdit])

  // Close on outside click
  useEffect(() => {
    if (!isEditing) return
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCommit(draftISO)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isEditing, draftISO, handleCommit])

  const displayValue = value || 'Select date'

  return (
    <div ref={containerRef} className="relative">
      {/* Display */}
      {!isEditing ? (
        <div
          className={`flex items-center gap-1.5 cursor-pointer rounded transition-colors hover:bg-amber-100/40 ${className}`}
          title="Click to edit"
          onClick={handleClick}
        >
          <CalendarIcon />
          <span>{displayValue}</span>
        </div>
      ) : (
        /* Edit overlay */
        <div className="absolute inset-0 z-10 flex items-center rounded bg-amber-50/95 px-2 backdrop-blur-[2px]">
          <input
            ref={inputRef}
            type="date"
            value={draftISO}
            onChange={(e) => setDraftISO(e.target.value)}
            onBlur={() => handleCommit(draftISO)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCommit(draftISO) }}
            className="w-full rounded border-2 border-amber-400 bg-white px-1.5 py-1 text-sm text-burgundy-900 outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        </div>
      )}
    </div>
  )
}

// ─── Time Picker ────────────────────────────────────────────────────────────

interface TimePickerProps {
  field: string
  value: string
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  locale: 'en' | 'fr'
  className?: string
}

/** Convert HH:MM (24h) to "H:MM AM/PM" (12h). */
function formatTime12h(time24: string): string {
  if (!time24) return ''
  const [hStr, mStr] = time24.split(':')
  const h = parseInt(hStr)
  const m = mStr ?? '00'
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${h12}:${m} ${ampm}`
}

/** Convert "H:MM AM/PM" to HH:MM (24h). */
function parseTimeTo24h(time12: string): string {
  if (!time12) return ''
  const match = time12.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return ''
  let h = parseInt(match[1])
  const m = match[2]
  const ampm = match[3].toUpperCase()
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${m}`
}

export function TimePicker({
  field,
  value,
  editing,
  onEdit,
  onChange,
  locale,
  className = '',
}: TimePickerProps) {
  const isEditing = editing === field
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Try to parse as 12h -> 24h for the input
  const [draftTime, setDraftTime] = useState('')

  useEffect(() => {
    if (!isEditing) {
      // If value is already 24h format, use it; otherwise try 12h
      const parts = value.split(':')
      if (parts.length === 2 && parseInt(parts[0]) <= 23) {
        setDraftTime(value.split(' ')[0]) // "14:00" from "14:00:00"
      } else {
        setDraftTime(parseTimeTo24h(value))
      }
    }
  }, [isEditing, value])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  const handleCommit = useCallback((time24: string) => {
    onChange(field, formatTime12h(time24))
    onEdit('')
  }, [field, onChange, onEdit])

  const handleClick = useCallback(() => {
    onEdit(field)
  }, [field, onEdit])

  useEffect(() => {
    if (!isEditing) return
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCommit(draftTime)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isEditing, draftTime, handleCommit])

  const displayValue = value || 'Select time'

  return (
    <div ref={containerRef} className="relative">
      {!isEditing ? (
        <div
          className={`flex items-center gap-1.5 cursor-pointer rounded transition-colors hover:bg-amber-100/40 ${className}`}
          title="Click to edit"
          onClick={handleClick}
        >
          <ClockIcon />
          <span className="text-sm text-burgundy-600">{displayValue}</span>
        </div>
      ) : (
        <div className="absolute inset-0 z-10 flex items-center rounded bg-amber-50/95 px-2 backdrop-blur-[2px]">
          <input
            ref={inputRef}
            type="time"
            value={draftTime}
            onChange={(e) => setDraftTime(e.target.value)}
            onBlur={() => handleCommit(draftTime)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCommit(draftTime) }}
            className="w-full rounded border-2 border-amber-400 bg-white px-1.5 py-1 text-sm text-burgundy-900 outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        </div>
      )}
    </div>
  )
}
