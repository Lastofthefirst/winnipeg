'use client'

import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import type { Locale, Dictionary } from '@/i18n/types'

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

export function localizeEvent(event: UpcomingEvent, locale: Locale) {
  return {
    title: (locale === 'fr' ? event.title_fr : undefined) ?? event.title_en,
    description: (locale === 'fr' ? event.description_fr : undefined) ?? event.description_en,
    location: (locale === 'fr' ? event.location_fr : undefined) ?? event.location_en,
  }
}

function parseEventCutoff(event: UpcomingEvent): Date {
  const base = new Date(`${event.date}T00:00:00`)
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
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function formatEventDate(dateString: string, locale: Locale = 'en') {
  const dateLocale = locale === 'fr' ? 'fr-CA' : 'en-US'
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(dateLocale, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

function AlwaysGathering({
  strings,
  locale,
}: {
  strings: Dictionary['eventsPreview']['invitation']
  locale: Locale
}) {
  return (
    <Container className="mt-16">
      <FadeIn>
        <div className="relative border border-burgundy-200 bg-ivory px-8 py-14 sm:px-14 sm:py-16">
          <span className="absolute left-4 top-4 h-4 w-4 border-l border-t border-gold-400" />
          <span className="absolute right-4 top-4 h-4 w-4 border-r border-t border-gold-400" />
          <span className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-gold-400" />
          <span className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-gold-400" />

          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-600">
              {strings.eyebrow}
            </p>
            <h3 className="mt-5 font-display text-3xl font-normal leading-snug text-burgundy-900 sm:text-4xl">
              {strings.heading}
            </h3>
            <div className="mx-auto mt-6 h-px w-12 bg-gold-400" />
            <p className="mt-6 text-base leading-relaxed text-burgundy-600">
              {strings.body}
            </p>
            <div className="mt-10">
              <Link
                href={`/${locale}/contact`}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
              >
                {strings.link} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

export function EventsPreview({
  locale = 'en',
  strings,
  events,
}: {
  locale?: Locale
  strings: Dictionary['eventsPreview']
  events?: UpcomingEvent[]
}) {
  const upcoming = events ?? []

  return (
    <>
      <SectionIntro
        eyebrow={strings.eyebrow}
        title={strings.heading}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{strings.intro}</p>
      </SectionIntro>

      {upcoming.length === 0 ? (
        <AlwaysGathering strings={strings.invitation} locale={locale} />
      ) : (
        <Container className="mt-16">
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {upcoming.slice(0, 3).map((event) => {
              const { title, description, location } = localizeEvent(event, locale)
              return (
                <FadeIn key={event.id ?? event.date + event.title_en} className="flex">
                  <article className="group relative flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <Border position="left" className="pl-4">
                        <p className="text-sm font-semibold text-burgundy-900">
                          {formatEventDate(event.date, locale)}
                        </p>
                        {event.time && (
                          <p className="mt-1 text-sm text-burgundy-600">
                            {event.time}
                          </p>
                        )}
                      </Border>
                      <h3 className="mt-6 font-display text-2xl font-normal text-burgundy-900">
                        {title}
                      </h3>
                      {location && (
                        <p className="mt-2 text-sm text-burgundy-500">
                          {location}
                        </p>
                      )}
                      <p className="mt-4 text-base text-burgundy-700">
                        {description}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              )
            })}
          </FadeInStagger>
          {upcoming.length > 3 && (
            <FadeIn className="mt-10 flex justify-center">
              <Button href={`/${locale}/events`}>{strings.seeAllEvents}</Button>
            </FadeIn>
          )}
        </Container>
      )}
    </>
  )
}
