'use client'

import { useRef, useCallback, useEffect } from 'react'

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
  placeholder?: string
  multiline?: boolean
}

export function EditableText({
  field,
  value,
  editing,
  onEdit,
  onChange,
  as: Component = 'span',
  className = '',
  placeholder,
  multiline = false,
}: EditableTextProps) {
  const isEditing = editing === field
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const useTextarea = multiline || value.includes('\n') || value.length > 120

  // The input mounts fresh each time editing starts, so it reads its initial
  // value from `value` at mount time — no draft state to sync.
  const handleCommit = useCallback(() => {
    const el = useTextarea ? textareaRef.current : inputRef.current
    onChange(field, el?.value ?? value)
    onEdit('')
  }, [field, value, useTextarea, onChange, onEdit])

  const handleClick = useCallback(() => onEdit(field), [field, onEdit])

  useEffect(() => {
    if (isEditing) {
      const el = useTextarea ? textareaRef.current : inputRef.current
      el?.focus()
      el?.select()
    }
  }, [isEditing, useTextarea])

  return (
    <div className="relative">
      {/* Visible text */}
      <Component
        className={`${className} cursor-pointer rounded transition-colors hover:bg-amber-100/40`}
        title="Click to edit"
        onClick={handleClick}
      >
        {value || (placeholder ? <span className="italic text-burgundy-300">{placeholder}</span> : null)}
      </Component>

      {/* Overlay input — absolute, zero layout shift */}
      {isEditing && (
        <>
          {useTextarea ? (
            <textarea
              ref={textareaRef}
              defaultValue={value}
              onBlur={handleCommit}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCommit() }
              }}
              className="absolute inset-0 z-10 resize-none rounded border-2 border-amber-400 bg-amber-50/95 p-0 text-inherit leading-inherit outline-none backdrop-blur-[2px] focus:ring-2 focus:ring-amber-400/20"
              style={{ minHeight: '2.5rem', lineHeight: 'inherit', fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', color: 'inherit' }}
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              defaultValue={value}
              onBlur={handleCommit}
              onKeyDown={(e) => { if (e.key === 'Enter') handleCommit() }}
              className="absolute inset-0 z-10 rounded border-2 border-amber-400 bg-amber-50/95 px-1 py-0 text-inherit outline-none backdrop-blur-[2px] focus:ring-2 focus:ring-amber-400/20"
              style={{ fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit', color: 'inherit' }}
            />
          )}
        </>
      )}
    </div>
  )
}

