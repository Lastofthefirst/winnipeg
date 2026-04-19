import { type Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import {
  upcomingEvents,
  getUpcomingEvents,
  formatEventDate,
} from '@/components/EventsPreview'

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

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming events and gatherings of the Bahá\'í Community of Winnipeg.',
}

export default function Events() {
  const upcoming = getUpcomingEvents(upcomingEvents)

  return (
    <RootLayout>
      <PageIntro eyebrow="Events" title="Upcoming gatherings">
        <p>
          Devotional gatherings, holy day celebrations, study circles, and
          community events — Bahá&apos;ís and their friends, everyone is
          warmly welcome.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        {upcoming.length === 0 ? (
          <AlwaysGatheringFull />
        ) : (
          <>
            <FadeInStagger>
              <div className="space-y-16">
                {upcoming.map((event) => (
                  <FadeIn key={event.date + event.title}>
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
                                  {formatEventDate(event.date)}
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

            {/* Evergreen invitation below listed events */}
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

      <ContactSection />
    </RootLayout>
  )
}
