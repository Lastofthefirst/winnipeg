'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import {
  type UpcomingEvent,
  getUpcomingEvents,
  formatEventDate,
  localizeEvent,
} from '@/components/EventsPreview'
import type { Locale } from '@/i18n/types'

function AlwaysGatheringFull() {
  return (
    <FadeIn>
      <div className="relative border-t border-burgundy-200 pt-16">
        <div className="max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-600">
            A path of service
          </p>
          <h2 className="mt-5 font-display text-3xl font-normal leading-snug text-burgundy-900 sm:text-4xl">
            A path of service, open to all
          </h2>
          <div className="mt-4 h-px w-12 bg-gold-400" />
          <p className="mt-6 text-base leading-relaxed text-burgundy-600">
            Do you hope to walk alongside young people as they discover their
            power to serve, to contribute to the moral and spiritual education
            of children, to explore the ideas that can transform both the
            individual and society, or to draw closer to God through collective
            worship? Come join a path of service being walked by growing
            numbers from all backgrounds.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
            >
              Reach out <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function SkeletonRow() {
  return (
    <div className="animate-pulse border-t border-burgundy-200 pt-16">
      <div className="h-4 w-40 bg-burgundy-100" />
      <div className="mt-10 h-7 w-72 bg-burgundy-100" />
      <div className="mt-2 h-4 w-48 bg-burgundy-100" />
      <div className="mt-6 h-4 w-full max-w-2xl bg-burgundy-100" />
      <div className="mt-2 h-4 w-3/4 max-w-xl bg-burgundy-100" />
    </div>
  )
}

export function EventsList({ locale = 'en' }: { locale?: Locale }) {
  const [events, setEvents] = useState<UpcomingEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://winnipeg-bahais.dust.ridvan.org/api/content/events?sort=date:asc&limit=20')
      .then((r) => r.json())
      .then((json) => {
        const raw: UpcomingEvent[] = Array.isArray(json) ? json : (json.data ?? [])
        setEvents(getUpcomingEvents(raw))
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger>
          <div className="space-y-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <FadeIn key={i}>
                <SkeletonRow />
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </Container>
    )
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      {events.length === 0 ? (
        <AlwaysGatheringFull />
      ) : (
        <>
          <FadeInStagger>
            <div className="space-y-16">
              {events.map((event) => {
                const { title, description, location } = localizeEvent(event, locale)
                return (
                  <FadeIn key={event.id ?? event.date + event.title_en}>
                    <article>
                      <Border className="pt-16">
                        <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                          <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                            <h2 className="font-display text-2xl font-normal text-burgundy-900">
                              {title}
                            </h2>
                            <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                              <dt className="sr-only">Date</dt>
                              <dd className="absolute left-0 top-0 text-sm text-burgundy-900 lg:static">
                                <time dateTime={event.date}>
                                  {formatEventDate(event.date, locale)}
                                </time>
                              </dd>
                              {event.time && (
                                <>
                                  <dt className="sr-only">Time</dt>
                                  <dd className="mt-1 text-sm text-burgundy-600">
                                    {event.time}
                                  </dd>
                                </>
                              )}
                              {location && (
                                <>
                                  <dt className="sr-only">Location</dt>
                                  <dd className="mt-1 text-sm text-burgundy-600">
                                    {location}
                                  </dd>
                                </>
                              )}
                            </dl>
                            <p className="mt-6 max-w-2xl text-base leading-relaxed text-burgundy-700">
                              {description}
                            </p>
                          </div>
                        </div>
                      </Border>
                    </article>
                  </FadeIn>
                )
              })}
            </div>
          </FadeInStagger>

          <FadeIn className="mt-24 sm:mt-32">
            <div className="border-t border-burgundy-100 pt-12">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-600">
                Always gathering
              </p>
              <p className="mt-4 max-w-xl font-display text-xl font-normal text-burgundy-700">
                Beyond these listed events, our community meets continuously
                for devotion, study, and service.{' '}
                <Link
                  href="/contact"
                  className="text-burgundy-900 underline underline-offset-4 decoration-gold-400 hover:decoration-burgundy-900 transition"
                >
                  Get in touch
                </Link>{' '}
                to learn what is happening near you.
              </p>
            </div>
          </FadeIn>
        </>
      )}
    </Container>
  )
}
