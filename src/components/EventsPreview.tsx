import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'

export interface UpcomingEvent {
  date: string
  title: string
  location?: string
  time?: string
  description: string
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
  },
  {
    date: '2026-04-20',
    title: 'Festival of Ridván',
    location: 'Bahá\'í Centre, 521 McMillan Ave',
    time: '7:00 PM',
    description:
      'Commemorate the most joyous Bahá\'í festival, marking the declaration of Bahá\'u\'lláh\'s mission.',
  },
  {
    date: '2026-03-07',
    title: 'Devotional Gathering',
    location: 'Bahá\'í Centre, 521 McMillan Ave',
    time: '10:30 AM',
    description:
      'A quiet morning of prayers and readings from the sacred writings. Open to people of all backgrounds.',
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
        <div className="rounded-3xl bg-neutral-50 p-8 text-center sm:p-12">
          <p className="font-display text-2xl font-semibold text-neutral-950">
            Stay connected
          </p>
          <p className="mt-4 text-base text-neutral-600">
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
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                  <Border position="left" className="pl-4">
                    <p className="text-sm font-semibold text-neutral-950">
                      {formatEventDate(event.date)}
                    </p>
                    {event.time && (
                      <p className="mt-1 text-sm text-neutral-600">
                        {event.time}
                      </p>
                    )}
                  </Border>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="mt-2 text-sm text-neutral-500">
                      {event.location}
                    </p>
                  )}
                  <p className="mt-4 text-base text-neutral-600">
                    {event.description}
                  </p>
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
