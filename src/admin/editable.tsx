'use client'

import { useState, useRef, useCallback, type ReactNode, type ComponentType } from 'react'

// ─── Editable text ───────────────────────────────────────────────────────────

/**
 * Wraps any text node with edit-in-place behaviour.
 * Hover shows subtle highlight; click replaces with input/textarea.
 * Blur or Enter exits edit mode and stages the change.
 */
interface EditableTextProps {
  field: string
  value: string
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  as?: ComponentType<any>
  className?: string
  children: ReactNode
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
  const useTextarea = value.length > 100

  const handleToggle = useCallback(() => {
    if (isEditing) {
      onEdit('')
    } else {
      onEdit(field)
    }
  }, [field, isEditing, onEdit])

  if (isEditing) {
    return (
      <div className="w-full">
        {useTextarea ? (
          <textarea
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            onBlur={() => onEdit('')}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onEdit('') }}}
            autoFocus
            rows={4}
            className="w-full rounded-lg border-2 border-amber-400 bg-amber-50 px-3 py-2 text-sm text-inherit leading-relaxed outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            onBlur={() => onEdit('')}
            onKeyDown={(e) => { if (e.key === 'Enter') onEdit('') }}
            autoFocus
            className="w-full rounded-lg border-2 border-amber-400 bg-amber-50 px-3 py-1.5 text-sm text-inherit outline-none focus:ring-2 focus:ring-amber-400/20"
          />
        )}
      </div>
    )
  }

  return (
    <Component
      onClick={handleToggle}
      className={`${className} cursor-pointer rounded transition-colors hover:bg-amber-100/40`}
      title="Click to edit"
    >
      {value}
    </Component>
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
