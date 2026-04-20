'use client'

import { use } from 'react'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import {
  type UpcomingEvent,
  getUpcomingEvents,
  formatEventDate,
} from '@/components/EventsPreview'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'
import { useEffect, useState } from 'react'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

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

interface InvitationProps {
  eyebrow: string
  heading: string
  body: string
  link: string
  locale: Locale
}

function Invitation({ eyebrow, heading, body, link, locale }: InvitationProps) {
  return (
    <FadeIn>
      <div className="relative border-t border-burgundy-200 pt-16">
        <div className="max-w-2xl">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-600">
            {eyebrow}
          </p>
          <h2 className="mt-5 font-display text-3xl font-normal leading-snug text-burgundy-900 sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-4 h-px w-12 bg-gold-400" />
          <p className="mt-6 text-base leading-relaxed text-burgundy-600">
            {body}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/contact`}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
            >
              {link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

interface EventsListLocaleProps {
  locale: Locale
  invitation: { eyebrow: string; heading: string; body: string; link: string }
  alwaysGathering: string
  evergreenBody: string
  evergreenLink: string
}

function EventsListLocale({
  locale,
  invitation,
  alwaysGathering,
  evergreenBody,
  evergreenLink,
}: EventsListLocaleProps) {
  const [events, setEvents] = useState<UpcomingEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(
      'https://winnipeg-bahais.dust.ridvan.org/api/content/events?sort=date:asc&limit=20',
    )
      .then((r) => r.json())
      .then((json) => {
        const raw: UpcomingEvent[] = Array.isArray(json)
          ? json
          : (json.data ?? [])
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
        <Invitation
          eyebrow={invitation.eyebrow}
          heading={invitation.heading}
          body={invitation.body}
          link={invitation.link}
          locale={locale}
        />
      ) : (
        <>
          <FadeInStagger>
            <div className="space-y-16">
              {events.map((event) => (
                <FadeIn key={event.id ?? event.date + event.title}>
                  <article>
                    <Border className="pt-16">
                      <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                        <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                          <h2 className="font-display text-2xl font-normal text-burgundy-900">
                            {event.title}
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
                            {event.location && (
                              <>
                                <dt className="sr-only">Location</dt>
                                <dd className="mt-1 text-sm text-burgundy-600">
                                  {event.location}
                                </dd>
                              </>
                            )}
                          </dl>
                          <p className="mt-6 max-w-2xl text-base leading-relaxed text-burgundy-700">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </Border>
                  </article>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>

          <FadeIn className="mt-24 sm:mt-32">
            <div className="border-t border-burgundy-100 pt-12">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-600">
                {alwaysGathering}
              </p>
              <p className="mt-4 max-w-xl font-display text-xl font-normal text-burgundy-700">
                {evergreenBody}{' '}
                <Link
                  href={`/${locale}/contact`}
                  className="text-burgundy-900 underline underline-offset-4 decoration-gold-400 hover:decoration-burgundy-900 transition"
                >
                  {evergreenLink}
                </Link>{' '}
              </p>
            </div>
          </FadeIn>
        </>
      )}
    </Container>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EventsPage({ params }: { params: any }) {
  const { locale } = use(params) as { locale: Locale }
  const t = use(getDictionary(locale))

  return (
    <>
      <PageIntro eyebrow={t.events.eyebrow} title={t.events.heading}>
        <p>{t.events.intro}</p>
      </PageIntro>

      <EventsListLocale
        locale={locale}
        invitation={t.events.invitation}
        alwaysGathering={t.events.alwaysGathering}
        evergreenBody={t.events.evergreenBody}
        evergreenLink={t.events.evergreenLink}
      />

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
