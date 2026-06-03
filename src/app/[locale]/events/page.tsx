import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import type { UpcomingEvent } from '@/components/EventsPreview'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'
import cmsEn from '@/../content/cms/en.json'
import cmsFr from '@/../content/cms/fr.json'

const cmsEventsEn = (cmsEn as { events: Array<{ id: string; title: string; date: string; time: string; location: string }> }).events
const cmsEventsFr = (cmsFr as { events: Array<{ id: string; title: string; date: string; time: string; location: string }> }).events

function mapCmsEvents(locale: Locale): UpcomingEvent[] {
  const primary = locale === 'en' ? cmsEventsEn : cmsEventsFr
  const fallback = locale === 'en' ? cmsEventsFr : cmsEventsEn
  const fallbackByTitle = new Map(fallback.map((e) => [e.id, e]))
  return primary.map((e) => {
    const fb = fallbackByTitle.get(e.id)
    return {
      id: e.id,
      date: e.date,
      time: e.time,
      title_en: locale === 'en' ? e.title : (fb?.title ?? e.title),
      title_fr: locale === 'fr' ? e.title : (fb?.title ?? e.title),
      location_en: locale === 'en' ? e.location : (fb?.location ?? e.location),
      location_fr: locale === 'fr' ? e.location : (fb?.location ?? e.location),
      description_en: '',
      description_fr: '',
    }
  })
}

function localizeEvent(event: UpcomingEvent, locale: Locale) {
  return {
    title: (locale === 'fr' ? event.title_fr : undefined) ?? event.title_en,
    description: (locale === 'fr' ? event.description_fr : undefined) ?? event.description_en,
    location: (locale === 'fr' ? event.location_fr : undefined) ?? event.location_en,
  }
}

function formatEventDate(dateString: string, locale: Locale = 'en') {
  const dateLocale = locale === 'fr' ? 'fr-CA' : 'en-US'
  return new Date(`${dateString}T00:00:00`).toLocaleDateString(dateLocale, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })
}

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
  const events = mapCmsEvents(locale)

  return (
    <>
      <PageIntro eyebrow={t.events.eyebrow} title={t.events.heading}>
        <p>{t.events.intro}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        {events.length === 0 ? (
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
