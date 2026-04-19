import { type StaticImageData } from 'next/image'
import { StyledImage } from '@/components/StyleSwitcher'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'

import imageNawRuz from '@/images/naw-ruz-celebration.jpg'
import imageDevotionalCandles from '@/images/devotional-candles.jpg'

export interface UpcomingEvent {
  date: string
  title: string
  location?: string
  time?: string
  description: string
  image?: StaticImageData
  styleName?: string
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    date: '2026-03-20',
    title: 'Naw-Rúz Celebration',
    location: 'Bahá\'í Centre, 521 McMillan Ave',
    time: '6:00 PM',
    description:
      'Join us to celebrate the Bahá\'í New Year with prayers, music, and a shared meal. All are welcome.',
    image: imageNawRuz,
    styleName: 'naw-ruz-celebration',
  },
  {
    date: '2026-03-07',
    title: 'Devotional Gathering',
    location: 'Bahá\'í Centre, 521 McMillan Ave',
    time: '10:30 AM',
    description:
      'A quiet morning of prayers and readings from the sacred writings. Open to people of all backgrounds.',
    image: imageDevotionalCandles,
    styleName: 'devotional-candles',
  },
]

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

export function formatEventDate(dateString: string) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function AlwaysGathering() {
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
              A path of service
            </p>
            <h3 className="mt-5 font-display text-3xl font-normal leading-snug text-burgundy-900 sm:text-4xl">
              A path of service, open to all
            </h3>
            <div className="mx-auto mt-6 h-px w-12 bg-gold-400" />
            <p className="mt-6 text-base leading-relaxed text-burgundy-600">
              Do you hope to walk alongside young people as they discover their
              power to serve, to contribute to the moral and spiritual education
              of children, to explore the ideas that can transform both the
              individual and society, or to draw closer to God through collective
              worship? Come join a path of service being walked by growing
              numbers from all backgrounds.
            </p>
            <div className="mt-10">
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
    </Container>
  )
}

export function EventsPreview() {
  const upcoming = getUpcomingEvents(upcomingEvents)

  return (
    <>
      <SectionIntro
        eyebrow="Events"
        title="Upcoming gatherings"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Bahá&apos;ís and their friends gather for prayer, study, celebration,
          and service. Everyone is welcome.
        </p>
      </SectionIntro>

      {upcoming.length === 0 ? (
        <AlwaysGathering />
      ) : (
        <Container className="mt-16">
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {upcoming.slice(0, 3).map((event) => (
              <FadeIn key={event.date + event.title} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
                  {event.image && (
                    <div className="relative h-40 overflow-hidden">
                      <StyledImage
                        src={event.image}
                        styleName={event.styleName ?? ''}
                        alt=""
                        className="h-full w-full object-cover transition duration-700"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <Border position="left" className="pl-4">
                      <p className="text-sm font-semibold text-burgundy-900">
                        {formatEventDate(event.date)}
                      </p>
                      {event.time && (
                        <p className="mt-1 text-sm text-burgundy-600">
                          {event.time}
                        </p>
                      )}
                    </Border>
                    <h3 className="mt-6 font-display text-2xl font-normal text-burgundy-900">
                      {event.title}
                    </h3>
                    {event.location && (
                      <p className="mt-2 text-sm text-burgundy-500">
                        {event.location}
                      </p>
                    )}
                    <p className="mt-4 text-base text-burgundy-700">
                      {event.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
          {upcoming.length > 3 && (
            <FadeIn className="mt-10 flex justify-center">
              <Button href="/events">See all events</Button>
            </FadeIn>
          )}
        </Container>
      )}
    </>
  )
}
