'use client'

import { useRef, useCallback, useEffect } from 'react'

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
  value: string // display text
  iso: string // current value as YYYY-MM-DD
  editing: string | null
  onEdit: (field: string) => void
  onCommit: (iso: string) => void
  className?: string
}

export function DatePicker({
  field,
  value,
  iso,
  editing,
  onEdit,
  onCommit,
  className = '',
}: DatePickerProps) {
  const isEditing = editing === field
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // The input mounts fresh each time editing starts, so it reads its initial
  // value from `iso` at mount time — no draft state to sync.
  const handleCommit = useCallback(() => {
    onCommit(inputRef.current?.value ?? iso)
    onEdit('')
  }, [iso, onCommit, onEdit])

  const handleClick = useCallback(() => onEdit(field), [field, onEdit])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  // Close on outside click
  useEffect(() => {
    if (!isEditing) return
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCommit()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isEditing, handleCommit])

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
          <span>{value || 'Select date'}</span>
        </div>
      ) : (
        /* Edit overlay */
        <div className="absolute inset-0 z-10 flex items-center rounded bg-amber-50/95 px-2 backdrop-blur-[2px]">
          <input
            ref={inputRef}
            type="date"
            defaultValue={iso}
            onBlur={handleCommit}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCommit() }}
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
  onCommit: (time: string) => void
  className?: string
}

// Convert HH:MM (24h) to "H:MM AM/PM" (12h).
function formatTime12h(time24: string): string {
  if (!time24) return ''
  const [hStr, mStr] = time24.split(':')
  const h = parseInt(hStr)
  const m = mStr ?? '00'
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${h12}:${m} ${ampm}`
}

// Convert "H:MM AM/PM" to HH:MM (24h).
function parseTimeTo24h(time12: string): string {
  if (!time12) return ''
  const match = time12.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
  if (!match) return ''
  let h = Number.parseInt(match[1])
  const m = match[2]
  const ampm = match[3].toUpperCase()
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${m}`
}

// Coerce a stored time ("10:00 AM", "14:00") to the <input type=time> format
function toTimeInputValue(value: string): string {
  const parts = value.split(':')
  if (parts.length === 2 && Number.parseInt(parts[0]) <= 23) {
    return value.split(' ')[0]
  }
  return parseTimeTo24h(value)
}

export function TimePicker({
  field,
  value,
  editing,
  onEdit,
  onCommit,
  className = '',
}: TimePickerProps) {
  const isEditing = editing === field
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // The input mounts fresh each time editing starts, so it reads its initial
  // value from `value` at mount time — no draft state to sync.
  const handleCommit = useCallback(() => {
    onCommit(formatTime12h(inputRef.current?.value ?? toTimeInputValue(value)))
    onEdit('')
  }, [value, onCommit, onEdit])

  const handleClick = useCallback(() => onEdit(field), [field, onEdit])

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  useEffect(() => {
    if (!isEditing) return
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleCommit()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isEditing, handleCommit])

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
            defaultValue={toTimeInputValue(value)}
            onBlur={handleCommit}
            onKeyDown={(e) => { if (e.key === 'Enter') handleCommit() }}
            className="w-full rounded border-2 border-amber-400 bg-white px-1.5 py-1 text-sm text-burgundy-900 outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        </div>
      )}
    </div>
  )
}
