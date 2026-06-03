'use client'

import { useState, useRef, useCallback, useEffect, type ReactNode, type ComponentType } from 'react'

// ─── Editable text ───────────────────────────────────────────────────────────

/**
 * Wraps any text node with edit-in-place behaviour using an overlay input.
 * Click focuses an absolutely-positioned input that sits on top of the text.
 * No layout shift — original element stays in the DOM.
 * Blur or Enter exits edit mode and stages the change.
 */
interface EditableTextProps {
  field: string
  value: string
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  as?: React.ElementType
  className?: string
}

export function EditableText({
  field,
  value,
  editing,
  onEdit,
  onChange,
  as: Component = 'span',
  className = '',
}: EditableTextProps) {
  const isEditing = editing === field
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const useTextarea = value.includes('\n') || value.length > 120
  const [draft, setDraft] = useState(value)

  // Sync draft when exiting edit mode for this field
  useEffect(() => {
    if (!isEditing) setDraft(value)
  }, [isEditing, value])

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      const el = useTextarea ? textareaRef.current : inputRef.current
      el?.focus()
      el?.select()
    }
  }, [isEditing])

  const handleCommit = useCallback((val: string) => {
    onChange(field, val)
    onEdit('')
  }, [field, onChange, onEdit])

  const handleClick = useCallback(() => {
    setDraft(value)
    onEdit(field)
  }, [field, value, onEdit])

  const activeRef = useTextarea ? textareaRef : inputRef

  return (
    <div ref={containerRef} className="relative">
      {/* Visible text */}
      <Component
        className={`${className} cursor-pointer rounded transition-colors hover:bg-amber-100/40`}
        title="Click to edit"
        onClick={handleClick}
      >
        {value}
      </Component>

      {/* Overlay input — absolute, zero layout shift */}
      {isEditing && (
        <>
          {useTextarea ? (
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => handleCommit(draft)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCommit(draft) }
              }}
              className="absolute inset-0 z-10 resize-none rounded border-2 border-amber-400 bg-amber-50/95 p-0 text-inherit leading-inherit outline-none backdrop-blur-[2px] focus:ring-2 focus:ring-amber-400/20"
              style={{ minHeight: '2.5rem', lineHeight: 'inherit', fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', color: 'inherit' }}
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={() => handleCommit(draft)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCommit(draft) }}
              className="absolute inset-0 z-10 rounded border-2 border-amber-400 bg-amber-50/95 px-1 py-0 text-inherit outline-none backdrop-blur-[2px] focus:ring-2 focus:ring-amber-400/20"
              style={{ fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', color: 'inherit' }}
            />
          )}
        </>
      )}
    </div>
  )
}

// ─── Editable image ──────────────────────────────────────────────────────────

/**
 * Wraps any image with a replace-on-hover overlay.
 * Click opens a file picker; selected file replaces the image in local state.
 */
interface EditableImageProps {
  field: string
  src: string
  alt: string
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  className?: string
}

export function EditableImage({
  field,
  src,
  alt,
  editing: _editing,
  onChange,
  className = '',
}: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For frontend demo: create a local object URL
    const url = URL.createObjectURL(file)
    onChange(field, url)
  }, [field, onChange])

  return (
    <div className="group relative">
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity group-hover:opacity-90`}
      />
      {/* Replace overlay */}
      <div
        onClick={handleClick}
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-stone-900/0 transition-opacity group-hover:pointer-events-auto group-hover:bg-stone-900/40 group-hover:opacity-100 opacity-0"
      >
        <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-stone-700">
          Replace Image
        </span>
      </div>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}
