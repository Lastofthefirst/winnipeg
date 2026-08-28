'use client'

import { Border } from '@/components/Border'
import { DatePicker, TimePicker } from '@/admin/date-picker'
import { EditableText } from '@/admin/editable'
import {
  DEFAULT_SLOT_TIME,
  WEEKDAYS,
  eventStartDate,
  firstWeekdayOnOrAfter,
  slotWeekday,
  slotsByDate,
  withRepeat,
} from '@/admin/eventSlots'
import { dateToISO, parseEventDate, startOfDay } from '@/utils/eventDate'
import { formatEventDate, getNextOccurrence } from '@/utils/events'
import type { CmsEvent, EventSlot, Recurrence } from '@/utils/events'

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

const PILL_ACTIVE = 'border-burgundy-900 bg-burgundy-900 text-ivory'
const PILL_IDLE = 'border-burgundy-200 bg-white text-burgundy-500 hover:border-burgundy-400 hover:text-burgundy-900'
const PILL_BASE = 'rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition'
const FIELD_LABEL = 'block text-[10px] font-semibold uppercase tracking-[0.2em] text-burgundy-400'

// ─── Event row (mirrors the events page) ─────────────────────────────────────

interface EventRowProps {
  event: CmsEvent
  index: number
  locale: 'en' | 'fr'
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  onEventUpdate: (index: number, next: CmsEvent) => void
  onRemove: (id: string) => void
}

function EventRow({
  event,
  index,
  locale,
  editing,
  onEdit,
  onChange,
  onEventUpdate,
  onRemove,
}: EventRowProps) {
  const next = getNextOccurrence(event, new Date())
  const ended = next === null
  const repeat = event.repeat ?? null
  const isMultiDay = repeat === 'weekly' || repeat === 'biweekly'
  const singleSlot = event.slots[0]
  const startDate = isMultiDay ? eventStartDate(event) : startOfDay(parseEventDate(singleSlot.date))
  const title = locale === 'en' ? event.title_en : (event.title_fr ?? '')
  const location = locale === 'en' ? (event.location_en ?? '') : (event.location_fr ?? '')
  const description = locale === 'en' ? (event.description_en ?? '') : (event.description_fr ?? '')

  function updateSlots(slots: EventSlot[]) {
    onEventUpdate(index, { ...event, slots })
  }

  function handleStartCommit(iso: string) {
    if (!iso) return
    if (isMultiDay) {
      const start = parseEventDate(iso)
      updateSlots(slotsByDate(event.slots.map((slot) => ({
        ...slot,
        date: dateToISO(firstWeekdayOnOrAfter(start, slotWeekday(slot))),
      }))))
    } else {
      updateSlots([{ ...singleSlot, date: iso }])
    }
  }

  function handleSlotTimeCommit(slotIdx: number, time: string) {
    if (!time) return
    updateSlots(event.slots.map((slot, i) => (i === slotIdx ? { ...slot, time } : slot)))
  }

  function handleWeekdayToggle(weekday: number) {
    const existingIdx = event.slots.findIndex((slot) => slotWeekday(slot) === weekday)
    if (existingIdx >= 0) {
      if (event.slots.length === 1) return
      updateSlots(event.slots.filter((_, i) => i !== existingIdx))
    } else {
      const slot: EventSlot = {
        date: dateToISO(firstWeekdayOnOrAfter(eventStartDate(event), weekday)),
        time: DEFAULT_SLOT_TIME,
      }
      updateSlots(slotsByDate([...event.slots, slot]))
    }
  }

  function handleRepeatChange(nextRepeat: Recurrence | null) {
    onEventUpdate(index, withRepeat(event, nextRepeat))
  }

  function handleEndDateCommit(iso: string) {
    if (!iso) return
    onEventUpdate(index, { ...event, endDate: iso })
  }

  return (
    <div className={`group relative ${ended ? 'opacity-50' : ''}`}>
      <Border position="top" className="pt-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/3 lg:pr-8">
            <span className={FIELD_LABEL}>
              {repeat ? 'Starts on' : 'Date'}
            </span>
            <div className="mt-2">
              <DatePicker
                field={`events.${index}.start`}
                value={formatEventDate(startDate, locale)}
                iso={dateToISO(startDate)}
                editing={editing}
                onEdit={onEdit}
                onCommit={handleStartCommit}
                className="text-sm font-semibold text-burgundy-900"
              />
            </div>
            {!isMultiDay && (
              <div className="mt-2">
                <TimePicker
                  field={`events.${index}.slots.0.time`}
                  value={singleSlot.time ?? ''}
                  editing={editing}
                  onEdit={onEdit}
                  onCommit={(time) => handleSlotTimeCommit(0, time)}
                />
              </div>
            )}

            <div className="mt-5">
              <span className={FIELD_LABEL}>
                Schedule
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SCHEDULE_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleRepeatChange(option.value)}
                    className={`${PILL_BASE} ${repeat === option.value ? PILL_ACTIVE : PILL_IDLE}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {isMultiDay && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {WEEKDAYS.map((label, weekday) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => handleWeekdayToggle(weekday)}
                        className={`${PILL_BASE} ${event.slots.some((slot) => slotWeekday(slot) === weekday) ? PILL_ACTIVE : PILL_IDLE}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 space-y-2">
                    {event.slots.map((slot, slotIdx) => (
                      <div key={slot.date} className="flex items-center gap-2 pl-1">
                        <span className="w-10 text-[10px] font-semibold uppercase tracking-wider text-burgundy-400">
                          {WEEKDAYS[slotWeekday(slot)]}
                        </span>
                        <TimePicker
                          field={`events.${index}.slots.${slotIdx}.time`}
                          value={slot.time ?? ''}
                          editing={editing}
                          onEdit={onEdit}
                          onCommit={(time) => handleSlotTimeCommit(slotIdx, time)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {repeat && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-burgundy-400">
                    Ends on
                  </span>
                  <DatePicker
                    field={`events.${index}.endDate`}
                    value={event.endDate ? formatEventDate(event.endDate, locale, { short: true }) : ''}
                    iso={event.endDate ?? ''}
                    editing={editing}
                    onEdit={onEdit}
                    onCommit={handleEndDateCommit}
                    className="text-xs text-burgundy-600"
                  />
                </div>
              )}

              {next && (
                <p className="mt-3 text-xs text-burgundy-600">
                  Next: {formatEventDate(next.date, locale)}
                  {next.time ? ` · ${next.time}` : ''}
                </p>
              )}
            </div>

            <EditableText
              field={`events.${index}.location`}
              value={location}
              editing={editing}
              onEdit={onEdit}
              onChange={onChange}
              as="p"
              className="mt-4 block text-sm text-burgundy-500"
              placeholder="Add a location"
            />
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
  onEventUpdate,
  onAdd,
  onRemove,
}: {
  events: CmsEvent[]
  locale: 'en' | 'fr'
  editing: string | null
  onEdit: (field: string) => void
  onChange: (field: string, value: string) => void
  onEventUpdate: (index: number, next: CmsEvent) => void
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
          onEventUpdate={onEventUpdate}
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
