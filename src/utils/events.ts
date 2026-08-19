import type { Locale } from '@/i18n/types'

import { parseEventDate } from '@/utils/eventDate'

export type Recurrence = 'weekly' | 'biweekly' | 'monthly'

export interface CmsEvent {
  id: string
  date: string
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

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

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

/**
 * The next specific occurrence of an event on or after `now`,
 * or null when the event is over.
 */
export function getNextOccurrence(event: CmsEvent, now: Date): Date | null {
  const start = startOfDay(parseEventDate(event.date))
  const end = event.endDate ? startOfDay(parseEventDate(event.endDate)) : null
  const today = startOfDay(now)

  if (end && end < start) return null

  if (!event.repeat) {
    if (start < today) {
      return addDays(start, ONE_OFF_GRACE_DAYS) > now ? start : null
    }
    return start
  }

  if (end && end < today) return null

  if (event.repeat === 'monthly') {
    let offset = 0
    while (true) {
      const d = addMonths(start, offset)
      if (d >= today) return end && d > end ? null : d
      offset += 1
    }
  }

  const stepDays = event.repeat === 'biweekly' ? 14 : 7
  let d = start
  while (d < today) d = addDays(d, stepDays)
  return end && d > end ? null : d
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

export function getUpcomingEvents(events: CmsEvent[]): UpcomingEvent[] {
  const now = new Date()
  const upcoming: UpcomingEvent[] = []
  for (const event of events) {
    const occurrence = getNextOccurrence(event, now)
    if (!occurrence) continue
    upcoming.push({ ...event, date: occurrence })
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
