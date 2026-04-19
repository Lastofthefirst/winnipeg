import { type Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { EventsPreview } from '@/components/EventsPreview'
import { NewsFeed } from '@/components/NewsFeed'
import { OptimizedImage } from '@/components/OptimizedImage'
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
      image: '/activity-cards/devotional-gatherings-01.png',
    },
    {
      title: 'Study Circles',
      description:
        'Explore spiritual and social principles in small group settings, building capacity for service to society.',
      href: '/community-life',
      image: '/activity-cards/study-circles-01.png',
    },
    {
      title: "Children's Classes",
      description:
        'Nurture the spiritual development of young hearts through stories, songs, art, and virtues-based education.',
      href: '/community-life',
      image: '/activity-cards/childrens-classes-01.png',
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
              <article className="group relative flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
                <div className="relative flex h-72 items-center justify-center overflow-hidden">
                  <OptimizedImage
                    src={activity.image}
                    alt=""
                    width={600}
                    height={600}
                    className="h-full w-auto object-contain transition duration-700"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-4 h-px w-8 bg-gold-400" />
                  <h3>
                    <Link href={activity.href}>
                      <span className="absolute inset-0" />
                      <span className="font-display text-xl font-normal text-burgundy-900">
                        {activity.title}
                      </span>
                    </Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-burgundy-700">
                    {activity.description}
                  </p>
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold-600">
                    Discover &rarr;
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function CommunitySnapshot() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <FadeIn>
          <div className="lg:flex lg:items-center lg:gap-x-16">
            <div className="lg:w-1/2">
              <div className="mb-4 h-px w-16 bg-burgundy-300" />
              <p className="font-display text-sm uppercase tracking-[0.25em] text-burgundy-500">
                Our community
              </p>
              <h2 className="mt-4 font-display text-3xl font-normal text-burgundy-900 sm:text-4xl">
                Where the rivers meet
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-burgundy-700">
                <p>
                  Like the two rivers that converge at the Forks, our community
                  draws together people from many backgrounds — united by a
                  shared vision of building a more just and peaceful world.
                </p>
                <p>
                  The Bahá&apos;í community in Winnipeg has been present for
                  over a century, deeply engaged in the life of our
                  neighbourhoods through devotional programs, study circles, and
                  community celebrations.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
                >
                  Learn our story <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <OptimizedImage
                    src="/prairie-theme/wheat-01.png"
                    alt="Golden wheat"
                    width={768}
                    height={768}
                    className="w-full object-contain"
                  />
                  <OptimizedImage
                    src="/prairie-theme/crocus-01.png"
                    alt="Prairie crocus"
                    width={768}
                    height={768}
                    className="w-full object-contain"
                  />
                </div>
                <div className="pt-8 space-y-4">
                  <OptimizedImage
                    src="/prairie-theme/prairie-grass-01.png"
                    alt="Prairie grass"
                    width={640}
                    height={896}
                    className="w-full object-contain"
                  />
                  <OptimizedImage
                    src="/prairie-theme/meadowlark-01.png"
                    alt="Meadowlark"
                    width={512}
                    height={640}
                    className="w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
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
      {/* Hero — light parchment background with burgundy text */}
      <Container className="relative py-32 sm:py-40 lg:py-56">
        <div className="pointer-events-none absolute inset-x-0 -bottom-8 lg:-bottom-32 -z-10 flex justify-center">
          <OptimizedImage
            src="/river-confluence/confluence-01.png"
            alt=""
            width={1536}
            height={640}
            className="w-full object-contain object-top opacity-60"
          />
        </div>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 h-px w-24 bg-gold-500" />
            <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-600">
              Bahá&apos;í Community of Winnipeg
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal leading-tight tracking-tight text-burgundy-900 sm:text-6xl lg:text-7xl">
              Where rivers converge, hearts unite
            </h1>
            <p className="mt-8 font-display text-xl italic text-burgundy-600 sm:text-2xl">
              A welcoming community devoted to the oneness of humanity,
              gathering on Treaty 1 territory in the heart of the prairies.
            </p>
            <div className="mt-12 flex justify-center gap-6">
              <Link
                href="/community-life"
                className="inline-flex border border-burgundy-900 bg-burgundy-900 px-8 py-3 text-sm uppercase tracking-widest text-ivory transition hover:bg-burgundy-800"
              >
                Enter
              </Link>
              <Link
                href="/events"
                className="inline-flex border border-burgundy-300 px-8 py-3 text-sm uppercase tracking-widest text-burgundy-700 transition hover:bg-burgundy-50"
              >
                Events
              </Link>
            </div>
            <div className="mx-auto mt-12 h-px w-24 bg-gold-500" />
          </div>
        </FadeIn>
      </Container>

      <CommunityActivities />

      <CommunitySnapshot />

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
