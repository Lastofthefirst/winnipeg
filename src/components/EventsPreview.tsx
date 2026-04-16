import { type StaticImageData } from 'next/image'
import { StyledImage } from '@/components/StyleSwitcher'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'

import imageNawRuz from '@/images/naw-ruz-celebration.jpg'
import imageRidvan from '@/images/ridvan-garden.jpg'
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

// Upcoming events data — edit this array to add/remove events
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
    date: '2026-04-20',
    title: 'Festival of Ridván',
    location: 'Bahá\'í Centre, 521 McMillan Ave',
    time: '7:00 PM',
    description:
      'Commemorate the most joyous Bahá\'í festival, marking the declaration of Bahá\'u\'lláh\'s mission.',
    image: imageRidvan,
    styleName: 'ridvan-garden',
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

function FallbackCTA() {
  return (
    <Container className="mt-16">
      <FadeIn>
        <div className="border border-burgundy-200 bg-ivory p-8 text-center sm:p-12">
          <p className="font-display text-2xl font-normal text-burgundy-900">
            Stay connected
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
          Our community comes together regularly for prayer, study, celebration,
          and service. Everyone is welcome.
        </p>
      </SectionIntro>

      {upcoming.length === 0 ? (
        <FallbackCTA />
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
