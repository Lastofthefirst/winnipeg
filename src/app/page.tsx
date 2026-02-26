import { type Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { EventsPreview } from '@/components/EventsPreview'
import { NewsFeed } from '@/components/NewsFeed'
import { Quote } from '@/components/Quote'
import { SectionIntro } from '@/components/SectionIntro'
import { RootLayout } from '@/components/RootLayout'

function CommunityActivities() {
  const activities = [
    {
      title: 'Devotional Gatherings',
      description:
        'Come together for prayer and reflection in a welcoming, intimate setting open to people of all backgrounds.',
      href: '/community-life',
    },
    {
      title: 'Study Circles',
      description:
        'Explore spiritual and social principles in small group settings, building capacity for service to society.',
      href: '/community-life',
    },
    {
      title: "Children's Classes",
      description:
        'Nurture the spiritual development of young hearts through stories, songs, art, and virtues-based education.',
      href: '/community-life',
    },
  ]

  return (
    <>
      <SectionIntro
        title="Building a vibrant community"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          The Bahá&apos;í community in Winnipeg offers a range of activities
          that bring people together for prayer, study, and service. Like the
          rivers that meet at the Forks, our community draws together people
          from many backgrounds, united by a shared vision.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {activities.map((activity) => (
            <FadeIn key={activity.title} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={activity.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <span className="font-display text-2xl font-semibold text-neutral-950">
                      {activity.title}
                    </span>
                  </Link>
                </h3>
                <p className="mt-4 text-base text-neutral-600">
                  {activity.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function NewsPreview() {
  return (
    <>
      <SectionIntro
        eyebrow="News"
        title="From the Bahá'í World"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Stories from the global Bahá&apos;í community, sourced from the
          Bahá&apos;í World News Service.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <NewsFeed limit={3} />
        <FadeIn className="mt-10 flex justify-center">
          <Link
            href="/news"
            className="text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
          >
            See all news <span aria-hidden="true">&rarr;</span>
          </Link>
        </FadeIn>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'The official website of the Bahá\'í Community of Winnipeg, Manitoba. Learn about the Bahá\'í Faith, community activities, and upcoming events.',
}

export default function Home() {
  return (
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            The Bahá&apos;í Community of Winnipeg
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Where the rivers meet, a community gathers — united in prayer,
            study, and service to build a more just and peaceful world. Welcome
            to the Bahá&apos;í community of Winnipeg, Manitoba.
          </p>
        </FadeIn>
      </Container>

      <CommunityActivities />

      <EventsPreview />

      <Quote
        className="mt-24 sm:mt-32 lg:mt-40"
        author="Bahá'u'lláh"
      >
        So powerful is the light of unity that it can illuminate the whole
        earth.
      </Quote>

      <NewsPreview />

      <ContactSection />
    </RootLayout>
  )
}
