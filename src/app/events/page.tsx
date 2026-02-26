import { type Metadata } from 'next'

import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import {
  upcomingEvents,
  type UpcomingEvent,
} from '@/components/EventsPreview'

function formatEventDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getUpcomingEvents(events: UpcomingEvent[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return events
    .filter((e) => new Date(`${e.date}T00:00:00`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

function FallbackMessage() {
  return (
    <FadeIn>
      <div className="border border-burgundy-200 bg-ivory p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-normal text-burgundy-900">
          No upcoming events at this time
        </p>
        <p className="mt-4 text-base text-burgundy-600">
          We regularly host devotional gatherings, study circles, and
          community celebrations. Get in touch to learn about our next
          gathering.
        </p>
        <div className="mt-6">
          <Button href="/contact">Get in Touch</Button>
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
          Join us for devotional gatherings, holy day celebrations, study
          circles, and community events. Everyone is warmly welcome.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        {upcoming.length === 0 ? (
          <FallbackMessage />
        ) : (
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
                          <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                            <dt className="sr-only">Date</dt>
                            <dd className="absolute top-0 left-0 text-sm text-burgundy-900 lg:static">
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
        )}
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
