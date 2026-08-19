import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { EventRepeat } from '@/components/EventRepeat'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'
import { getUpcomingEvents, formatEventDate, localizeEvent } from '@/utils/events'
import eventsData from '@/../content/cms/events.json'
import type { CmsEvent } from '@/utils/events'

const events = eventsData as CmsEvent[]

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  const base = 'https://winnipegbahais.org'
  return {
    title: t.meta.events.title,
    description: t.meta.events.description,
    alternates: {
      canonical: `${base}/${locale}/events`,
      languages: {
        en: `${base}/en/events`,
        fr: `${base}/fr/events`,
        'x-default': `${base}/en/events`,
      },
    },
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function EventsPage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  const upcoming = getUpcomingEvents(events)

  return (
    <>
      <PageIntro eyebrow={t.events.eyebrow} title={t.events.heading}>
        <p>{t.events.intro}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        {upcoming.length === 0 ? (
          <Invitation
            eyebrow={t.events.invitation.eyebrow}
            heading={t.events.invitation.heading}
            body={t.events.invitation.body}
            link={t.events.invitation.link}
            locale={locale}
          />
        ) : (
          <>
            <FadeInStagger>
              <div className="space-y-16">
                {upcoming.map((event) => {
                  const { title, description, location } = localizeEvent(event, locale)
                  return (
                    <FadeIn key={event.id}>
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
                                  <time dateTime={event.date.toISOString()}>
                                    {formatEventDate(event.date, locale)}
                                  </time>
                                </dd>
                                {event.repeat && (
                                  <>
                                    <dt className="sr-only">Repeat</dt>
                                    <dd className="mt-2 lg:mt-3">
                                      <EventRepeat
                                        repeat={event.repeat}
                                        endDate={event.endDate}
                                        locale={locale}
                                        labels={t.events.repeat}
                                      />
                                    </dd>
                                  </>
                                )}
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
                              {description && (
                                <p className="mt-6 max-w-2xl text-base leading-relaxed text-burgundy-700">
                                  {description}
                                </p>
                              )}
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
                  {t.events.alwaysGathering}
                </p>
                <p className="mt-4 max-w-xl font-display text-xl font-normal text-burgundy-700">
                  {t.events.evergreenBody}{' '}
                  <Link
                    href={`/${locale}/contact`}
                    className="text-burgundy-900 underline underline-offset-4 decoration-gold-400 hover:decoration-burgundy-900 transition"
                  >
                    {t.events.evergreenLink}
                  </Link>{' '}
                </p>
              </div>
            </FadeIn>
          </>
        )}
      </Container>

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
