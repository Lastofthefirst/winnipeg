import type { Locale } from '@/i18n/types'

import { parseEventDate } from '@/utils/eventDate'

export interface UpcomingEvent {
  id?: string
  date: string
  time?: string
  title_en: string
  title_fr?: string
  location_en?: string
  location_fr?: string
  description_en: string
  description_fr?: string
}

function parseEventCutoff(event: UpcomingEvent): Date {
  const base = parseEventDate(event.date)
  if (event.time) {
    const m = event.time.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (m) {
      let h = parseInt(m[1])
      const min = parseInt(m[2])
      const meridiem = m[3].toUpperCase()
      if (meridiem === 'PM' && h !== 12) h += 12
      if (meridiem === 'AM' && h === 12) h = 0
      base.setHours(h, min, 0, 0)
    }
  }
  base.setDate(base.getDate() + 2)
  return base
}

export function getUpcomingEvents(events: UpcomingEvent[]) {
  const now = new Date()
  return events
    .filter((e) => parseEventCutoff(e) > now)
    .sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())
}

export function localizeEvent(event: UpcomingEvent, locale: Locale) {
  return {
    title: (locale === 'fr' ? event.title_fr : undefined) ?? event.title_en,
    description: (locale === 'fr' ? event.description_fr : undefined) ?? event.description_en,
    location: (locale === 'fr' ? event.location_fr : undefined) ?? event.location_en,
  }
}

export function formatEventDate(dateString: string, locale: Locale = 'en') {
  const dateLocale = locale === 'fr' ? 'fr-CA' : 'en-US'
  return parseEventDate(dateString).toLocaleDateString(dateLocale, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}
