import { type Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { EventsPreview } from '@/components/EventsPreview'
import { GridPattern } from '@/components/GridPattern'
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
        title="Pathways of service"
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
        <FadeInStagger className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {activities.map((activity) => (
            <FadeIn key={activity.title} className="flex">
              <article className="relative flex w-full flex-col border border-burgundy-200 bg-ivory p-8 transition hover:border-burgundy-400">
                <div className="mb-4 h-px w-8 bg-gold-400" />
                <h3>
                  <Link href={activity.href}>
                    <span className="absolute inset-0" />
                    <span className="font-display text-xl font-normal text-burgundy-900">
                      {activity.title}
                    </span>
                  </Link>
                </h3>
                <p className="mt-4 text-base leading-relaxed text-burgundy-700">
                  {activity.description}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold-600">
                  Discover &rarr;
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
            className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
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
      {/* Hero — Lotus & Stone style: centered, dark burgundy with grid texture */}
      <div className="relative overflow-hidden bg-burgundy-900">
        <div className="absolute inset-0 opacity-10">
          <GridPattern
            className="h-full w-full fill-burgundy-600 stroke-burgundy-700"
            yOffset={-100}
          />
        </div>
        <Container className="relative py-32 sm:py-40 lg:py-56">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 h-px w-24 bg-gold-400" />
              <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-400">
                Bahá&apos;í Community of Winnipeg
              </p>
              <h1 className="mt-8 font-display text-4xl font-normal leading-tight tracking-tight text-ivory sm:text-6xl lg:text-7xl">
                Where rivers converge, hearts unite
              </h1>
              <p className="mt-8 font-display text-xl italic text-burgundy-200 sm:text-2xl">
                A welcoming community devoted to the oneness of humanity,
                gathering on Treaty 1 territory in the heart of the prairies.
              </p>
              <div className="mt-12 flex justify-center gap-6">
                <Link
                  href="/community-life"
                  className="inline-flex border border-gold-400 px-8 py-3 text-sm uppercase tracking-widest text-gold-400 transition hover:bg-gold-400/10"
                >
                  Enter
                </Link>
                <Link
                  href="/events"
                  className="inline-flex border border-burgundy-400 px-8 py-3 text-sm uppercase tracking-widest text-burgundy-300 transition hover:bg-burgundy-800"
                >
                  Events
                </Link>
              </div>
              <div className="mx-auto mt-12 h-px w-24 bg-gold-400" />
            </div>
          </FadeIn>
        </Container>
      </div>

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
