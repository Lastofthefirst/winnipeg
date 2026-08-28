import { dateToISO, parseEventDate, startOfDay } from '@/utils/eventDate'

import type { CmsEvent, EventSlot, Recurrence } from '@/utils/events'

// Sun–Sat, matching Date.getDay()
export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

export const DEFAULT_SLOT_TIME = '2:00 PM'

export function slotWeekday(slot: EventSlot): number {
  return parseEventDate(slot.date).getDay()
}

export function eventStartDate(event: CmsEvent): Date {
  const earliest = event.slots.reduce((min, slot) => (slot.date < min.date ? slot : min))
  return startOfDay(parseEventDate(earliest.date))
}

export function firstWeekdayOnOrAfter(start: Date, weekday: number): Date {
  const d = startOfDay(start)
  d.setDate(d.getDate() + ((weekday - d.getDay() + 7) % 7))
  return d
}

export function slotsByDate(slots: EventSlot[]): EventSlot[] {
  return [...slots].sort((a, b) => a.date.localeCompare(b.date))
}

// Reshape an event's slots when its schedule type changes: one-time and
// monthly keep a single (earliest) slot; dropping the schedule drops the
// end date.
export function withRepeat(event: CmsEvent, repeat: Recurrence | null): CmsEvent {
  const next: CmsEvent = { ...event, repeat }
  if (repeat === null) delete next.endDate
  if ((repeat === null || repeat === 'monthly') && next.slots.length > 1) {
    next.slots = [slotsByDate(next.slots)[0]]
  }
  return next
}
