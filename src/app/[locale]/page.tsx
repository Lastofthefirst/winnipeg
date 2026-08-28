import { type Metadata } from 'next'
import Link from 'next/link'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { EventsPreview } from '@/components/EventsPreview'
import { getUpcomingEvents } from '@/utils/events'
import { NewsFeed } from '@/components/NewsFeed'
import { OptimizedImage } from '@/components/OptimizedImage'
import { Blockquote } from '@/components/Blockquote'
import { Quote } from '@/components/Quote'
import { SectionIntro } from '@/components/SectionIntro'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'
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
    title: t.meta.home.title,
    description: t.meta.home.description,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: { en: `${base}/en`, fr: `${base}/fr`, 'x-default': `${base}/en` },
    },
  }
}

export default async function HomePage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)

  const activities = [
    { ...t.home.activities.items[0], href: `/${locale}/community-life#childrens-classes`, image: '/activity-cards/childrens-classes-01.png' },
    { ...t.home.activities.items[1], href: `/${locale}/community-life#junior-youth`, image: '/activity-cards/junior-youth-01.png' },
    { ...t.home.activities.items[2], href: `/${locale}/community-life`, image: '/activity-cards/devotional-gatherings-01.png' },
    { ...t.home.activities.items[3], href: `/${locale}/community-life#study-circles`, image: '/activity-cards/study-circles-01.png' },
  ]

  return (
    <>
      {/* Hero */}
      <Container className="relative py-32 sm:py-40 lg:py-56">
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-8 lg:-bottom-32 -z-10 flex justify-center"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,1))',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,1))',
          }}
        >
          <OptimizedImage
            src="/river-confluence/confluence-01.png"
            alt=""
            width={1536}
            height={640}
            className="w-full object-contain object-top"
          />
        </div>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 h-px w-24 bg-gold-500" />
            <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-600">
              {t.home.hero.eyebrow}
            </p>
            <h1 className="mt-8 font-display text-4xl font-normal leading-tight tracking-tight text-burgundy-900 sm:text-6xl lg:text-7xl">
              {t.home.hero.heading}
            </h1>
            <p className="mt-8 font-display text-xl italic text-burgundy-600 sm:text-2xl">
              {t.home.hero.subheading}
            </p>
            <div className="mt-12 flex justify-center gap-6">
              <Link
                href={`/${locale}/community-life`}
                className="inline-flex border border-burgundy-900 bg-burgundy-900 px-8 py-3 text-sm uppercase tracking-widest text-ivory transition hover:bg-burgundy-800"
              >
                {t.home.hero.ctaActivities}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex border border-burgundy-300 px-8 py-3 text-sm uppercase tracking-widest text-burgundy-700 transition hover:bg-burgundy-50"
              >
                {t.home.hero.ctaContact}
              </Link>
            </div>
            <div className="mx-auto mt-12 h-px w-24 bg-gold-500" />
          </div>
        </FadeIn>
      </Container>

      {/* Community Snapshot */}
      <div className="mt-24 sm:mt-32 lg:mt-40">
        <Container>
          <FadeIn>
            <div className="lg:flex lg:items-center lg:gap-x-16">
              <div className="lg:w-1/2">
                <p className="font-display text-xl font-semibold leading-snug text-burgundy-900 sm:text-2xl before:content-['\201C'] after:content-['\201D']">
                  {locale === 'fr'
                    ? 'La lumière de l\'unité est si puissante qu\'elle peut illuminer la terre entière.'
                    : 'So powerful is the light of unity that it can illuminate the whole earth.'}
                </p>
                <div className="mt-4 h-px w-16 bg-burgundy-300" />
                <p className="mt-4 font-display text-sm uppercase tracking-[0.25em] text-burgundy-500">
                  {t.home.community.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-3xl font-normal text-burgundy-900 sm:text-4xl">
                  {t.home.community.heading}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-burgundy-700">
                  {t.home.community.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <Blockquote
                  author={{ name: "Bahá'u'lláh", role: "Founder of the Bahá'í Faith" }}
                  className="mt-10"
                >
                  {locale === 'fr'
                    ? 'Ne faites pas de la religion une cause de dissensions et de luttes car son but, revelé des cieux de la sainte volonté de Dieu, est d\'établir l\'unité et la concorde parmi les peuples du monde.'
                    : 'The purpose of religion as revealed from the heaven of God\'s holy Will is to establish unity and concord amongst the peoples of the world; make it not the cause of dissension and strife.'}
                </Blockquote>
                <div className="mt-8">
                  <Link
                    href={`/${locale}/about`}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
                  >
                    {t.home.community.link} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="mt-12 lg:mt-0 lg:w-1/2">
                <OptimizedImage
                  src="/community/garden-bouquet-01.png"
                  alt="Prairie wildflower bouquet"
                  width={768}
                  height={1024}
                  className="w-full object-contain"
                />
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      {/* Activities */}
      <SectionIntro title={t.home.activities.heading} className="mt-24 sm:mt-32 lg:mt-40">
        <p>{t.home.activities.intro}</p>
        <div className="mt-8">
          <Link
            href={`/${locale}/community-life`}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
          >
            {t.home.activities.link} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {activities.map((activity) => (
            <FadeIn key={activity.title} className="flex">
              <article className="group relative flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
                <div className="relative flex h-56 items-center justify-center overflow-hidden">
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
                </div>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>

      <EventsPreview
        locale={locale}
        strings={t.eventsPreview}
        events={events}
        initial={getUpcomingEvents(events)}
      />

      <Quote className="mt-24 sm:mt-32 lg:mt-40" author="Bahá'u'lláh">
        {locale === 'fr'
          ? 'La terre est un seul pays et tous les hommes en sont les citoyens.'
          : 'The earth is but one country, and mankind its citizens.'}
      </Quote>

      {/* News */}
      <SectionIntro
        eyebrow={t.home.news.eyebrow}
        title={t.home.news.heading}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{t.home.news.intro}</p>
      </SectionIntro>
      <Container className="mt-16">
        <NewsFeed limit={3} />
        <FadeIn className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/news`}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
          >
            {t.home.news.link} <span aria-hidden="true">&rarr;</span>
          </Link>
        </FadeIn>
      </Container>

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
