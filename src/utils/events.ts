import type { Locale } from '@/i18n/types'

import { parseEventDate, startOfDay } from '@/utils/eventDate'

export type Recurrence = 'weekly' | 'biweekly' | 'monthly'

export interface EventSlot {
  date: string // YYYY-MM-DD
  time?: string
}

export interface CmsEvent {
  id: string
  title_en: string
  title_fr?: string
  location_en?: string
  location_fr?: string
  description_en?: string
  description_fr?: string
  repeat?: Recurrence | null
  endDate?: string // YYYY-MM-DD, last day any slot may occur
  slots: EventSlot[]
}

export interface UpcomingEvent {
  id: string
  date: Date
  time?: string
  title_en: string
  title_fr?: string
  location_en?: string
  location_fr?: string
  description_en?: string
  description_fr?: string
  repeat?: Recurrence | null
  endDate?: string
}

const ONE_OFF_GRACE_DAYS = 2

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function addMonths(date: Date, months: number): Date {
  const dayOfMonth = date.getDate()
  const y = date.getFullYear() + Math.floor((date.getMonth() + months) / 12)
  const m = (date.getMonth() + months) % 12
  const lastDay = new Date(y, m + 1, 0).getDate()
  return new Date(y, m, Math.min(dayOfMonth, lastDay))
}

// Next occurrence of one slot on or after `now`, or null when that slot is over.
function nextSlotDate(slot: EventSlot, repeat: Recurrence | null, end: Date | null, now: Date): Date | null {
  const start = startOfDay(parseEventDate(slot.date))
  const today = startOfDay(now)

  if (end && end < start) return null

  if (!repeat) {
    if (start < today) {
      return addDays(start, ONE_OFF_GRACE_DAYS) > now ? start : null
    }
    return start
  }

  if (end && end < today) return null

  if (repeat === 'monthly') {
    let offset = 0
    while (true) {
      const d = addMonths(start, offset)
      if (d >= today) return end && d > end ? null : d
      offset += 1
    }
  }

  const stepDays = repeat === 'biweekly' ? 14 : 7
  let d = start
  while (d < today) d = addDays(d, stepDays)
  return end && d > end ? null : d
}

// The event's next occurrence on or after `now` — its earliest upcoming slot,
// carrying that slot's time — or null when the event is over.
export function getNextOccurrence(event: CmsEvent, now: Date): { date: Date; time?: string } | null {
  const end = event.endDate ? startOfDay(parseEventDate(event.endDate)) : null
  let next: { date: Date; time?: string } | null = null
  for (const slot of event.slots) {
    const date = nextSlotDate(slot, event.repeat ?? null, end, now)
    if (!date) continue
    if (!next || date < next.date) next = { date, time: slot.time }
  }
  return next
}

function parseEventTime(event: UpcomingEvent): Date {
  const base = new Date(event.date)
  if (event.time) {
    const m = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (m) {
      let h = parseInt(m[1]!)
      const min = parseInt(m[2]!)
      const meridiem = m[3]!.toUpperCase()
      if (meridiem === 'PM' && h !== 12) h += 12
      if (meridiem === 'AM' && h === 12) h = 0
      base.setHours(h, min, 0, 0)
    }
  }
  return base
}

export function getUpcomingEvents(events: CmsEvent[], now: Date = new Date()): UpcomingEvent[] {
  const upcoming: UpcomingEvent[] = []
  for (const event of events) {
    const occurrence = getNextOccurrence(event, now)
    if (!occurrence) continue
    upcoming.push({
      id: event.id,
      title_en: event.title_en,
      title_fr: event.title_fr,
      location_en: event.location_en,
      location_fr: event.location_fr,
      description_en: event.description_en,
      description_fr: event.description_fr,
      repeat: event.repeat ?? null,
      endDate: event.endDate,
      date: occurrence.date,
      time: occurrence.time,
    })
  }
  return upcoming.sort(
    (a, b) => parseEventTime(a).getTime() - parseEventTime(b).getTime(),
  )
}

export function localizeEvent(event: UpcomingEvent, locale: Locale) {
  const localized = locale === 'fr'
  return {
    title: (localized ? event.title_fr : undefined) || event.title_en,
    description: (localized ? event.description_fr : undefined) || event.description_en,
    location: (localized ? event.location_fr : undefined) || event.location_en,
  }
}

export function formatEventDate(
  date: string | Date,
  locale: Locale = 'en',
  options: { short?: boolean } = {},
) {
  const dateLocale = locale === 'fr' ? 'fr-CA' : 'en-US'
  const d = typeof date === 'string' ? parseEventDate(date) : date
  return d.toLocaleDateString(dateLocale, options.short
    ? { month: 'short', day: 'numeric', year: 'numeric' }
    : { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}
