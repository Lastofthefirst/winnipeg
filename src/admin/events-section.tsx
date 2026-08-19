'use client'

import { Border } from '@/components/Border'
import { DatePicker, TimePicker } from '@/admin/date-picker'
import { EditableText } from '@/admin/editable'
import { getNextOccurrence } from '@/utils/events'
import type { CmsEvent, Recurrence } from '@/utils/events'

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

// ─── Schedule options ────────────────────────────────────────────────────────

const SCHEDULE_OPTIONS: Array<{ value: Recurrence | null; label: string }> = [
  { value: null, label: 'One-time' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Biweekly' },
  { value: 'monthly', label: 'Monthly' },
]

// ─── Event row (mirrors the events page) ─────────────────────────────────────

function EventRow({
  event,
  index,
  locale,
  editing,
  onEdit,
  onChange,
  onRepeatChange,
  onRemove,
}: {
  event: CmsEvent
  index: number
  locale: 'en' | 'fr'
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  onRepeatChange: (index: number, repeat: Recurrence | null) => void
  onRemove: (id: string) => void
}) {
  const ended = getNextOccurrence(event, new Date()) === null
  const title = locale === 'en' ? event.title_en : (event.title_fr ?? '')
  const location = locale === 'en' ? (event.location_en ?? '') : (event.location_fr ?? '')
  const description = locale === 'en' ? (event.description_en ?? '') : (event.description_fr ?? '')

  return (
    <div className={`group relative ${ended ? 'opacity-50' : ''}`}>
      <Border position="top" className="pt-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/3 lg:pr-8">
            <DatePicker
              field={`events.${index}.date`}
              value={event.date}
              editing={editing}
              onEdit={onEdit}
              onChange={onChange}
              locale={locale}
              className="text-sm font-semibold text-burgundy-900"
            />
            <TimePicker
              field={`events.${index}.time`}
              value={event.time ?? ''}
              editing={editing}
              onEdit={onEdit}
              onChange={onChange}
              locale={locale}
            />
            <EditableText
              field={`events.${index}.location`}
              value={location}
              editing={editing}
              onEdit={onEdit}
              onChange={onChange}
              as="p"
              className="mt-1 block text-sm text-burgundy-600"
              placeholder="Add a location"
            />

            <div className="mt-5">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-burgundy-400">
                Schedule
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SCHEDULE_OPTIONS.map((option) => {
                  const active = (event.repeat ?? null) === option.value
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => onRepeatChange(index, option.value)}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition ${
                        active
                          ? 'border-burgundy-900 bg-burgundy-900 text-ivory'
                          : 'border-burgundy-200 bg-white text-burgundy-500 hover:border-burgundy-400 hover:text-burgundy-900'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              {event.repeat && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-burgundy-400">
                    Ends on
                  </span>
                  <DatePicker
                    field={`events.${index}.endDate`}
                    value={event.endDate ?? ''}
                    editing={editing}
                    onEdit={onEdit}
                    onChange={onChange}
                    locale={locale}
                    className="text-xs text-burgundy-600"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-2/3 lg:pl-8">
            <EditableText
              field={`events.${index}.title`}
              value={title}
              editing={editing}
              onEdit={onEdit}
              onChange={onChange}
              as="h3"
              className="font-display text-2xl font-normal text-burgundy-900"
              placeholder="Add a title"
            />
            <EditableText
              field={`events.${index}.description`}
              value={description}
              editing={editing}
              onEdit={onEdit}
              onChange={onChange}
              as="p"
              className="mt-4 block text-base leading-relaxed text-burgundy-700"
              placeholder="Add a description"
              multiline
            />
          </div>
        </div>
      </Border>

      <button
        onClick={() => onRemove(event.id)}
        className="absolute right-0 top-6 flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-stone-400 opacity-0 transition backdrop-blur group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
        aria-label="Remove event"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

// ─── Main section ────────────────────────────────────────────────────────────

export function EventsSection({
  events,
  locale,
  editing,
  onEdit,
  onChange,
  onRepeatChange,
  onAdd,
  onRemove,
}: {
  events: CmsEvent[]
  locale: 'en' | 'fr'
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  onRepeatChange: (index: number, repeat: Recurrence | null) => void
  onAdd: () => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="space-y-12">
      {events.map((event, index) => (
        <EventRow
          key={event.id}
          event={event}
          index={index}
          locale={locale}
          editing={editing}
          onEdit={onEdit}
          onChange={onChange}
          onRepeatChange={onRepeatChange}
          onRemove={onRemove}
        />
      ))}

      <button
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 border-2 border-dashed border-burgundy-200 bg-stone-50 py-10 text-sm font-medium text-burgundy-400 transition hover:border-burgundy-300 hover:bg-ivory hover:text-burgundy-600"
      >
        <PlusIcon />
        Add Event
      </button>
    </div>
  )
}
