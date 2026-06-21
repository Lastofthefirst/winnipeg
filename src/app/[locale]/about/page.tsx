import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { OptimizedImage } from '@/components/OptimizedImage'
import { PageIntro } from '@/components/PageIntro'
import { Quote } from '@/components/Quote'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  const base = 'https://winnipegbahais.org'
  return {
    title: t.meta.about.title,
    description: t.meta.about.description,
    alternates: {
      canonical: `${base}/${locale}/about`,
      languages: {
        en: `${base}/en/about`,
        fr: `${base}/fr/about`,
        'x-default': `${base}/en/about`,
      },
    },
  }
}

function ImageStrip() {
  return (
    <Container className="mt-16">
      <FadeIn>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <OptimizedImage
              src="/prairie-theme/wheat-01.png"
              alt="Golden wheat stalks"
              width={768}
              height={768}
              className="w-full object-contain"
            />
          </div>
          <div>
            <OptimizedImage
              src="/prairie-theme/crocus-01.png"
              alt="Prairie crocus flowers"
              width={768}
              height={768}
              className="w-full object-contain"
            />
          </div>
          <div>
            <OptimizedImage
              src="/prairie-theme/stones-01.png"
              alt="Stacked river stones"
              width={768}
              height={768}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

interface CorePrinciplesProps {
  eyebrow: string
  heading: string
  intro: string
  items: Array<{ title: string; body: string }>
}

function CorePrinciples({ eyebrow, heading, intro, items }: CorePrinciplesProps) {
  return (
    <div className="relative mt-24 bg-burgundy-900 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <Container className="relative">
        <div className="pointer-events-none absolute right-0 top-0 z-0">
          <OptimizedImage
            src="/quote/sun-principles-01.png"
            alt=""
            width={400}
            height={400}
            className="w-[150px] object-contain sm:w-[200px] lg:w-[280px]"
          />
        </div>
        <FadeIn className="relative z-10 max-w-2xl">
          <h2>
            <span className="mb-6 block font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              {eyebrow}
            </span>
            <span className="block font-display tracking-tight text-balance text-4xl font-normal sm:text-5xl text-ivory">
              {heading}
            </span>
          </h2>
          <div className="mt-6 text-xl text-burgundy-200">
            <p>{intro}</p>
          </div>
        </FadeIn>
      </Container>
      <Container className="mt-16">
        <GridList>
          {items.map((item) => (
            <GridListItem key={item.title} title={item.title} invert>
              {item.body}
            </GridListItem>
          ))}
        </GridList>
      </Container>
    </div>
  )
}

interface LocalCommunityProps {
  locale: Locale
  eyebrow: string
  heading: string
  intro: string
  body: string[]
}

function LocalCommunity({ locale, eyebrow, heading, intro, body }: LocalCommunityProps) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="lg:flex lg:items-start lg:gap-x-16">
        <div className="lg:w-1/2">
          <SectionIntro eyebrow={eyebrow} title={heading} className="!px-0">
            <p>{intro}</p>
          </SectionIntro>
          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-burgundy-700">
            {body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
        <FadeIn className="mt-12 lg:mt-0 lg:w-1/2">
          <OptimizedImage
            src="/prairie-theme/prairie-grass-01.png"
            alt="Tall prairie grass"
            width={640}
            height={896}
            className="w-full object-contain"
          />
        </FadeIn>
      </div>
    </Container>
  )
}

export default async function AboutPage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)

  return (
    <>
      <PageIntro eyebrow={t.about.eyebrow} title={t.about.heading}>
        <p>{t.about.intro}</p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          {t.about.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </PageIntro>

      <ImageStrip />

      <Quote className="mt-24 sm:mt-32 lg:mt-40" author="Bahá'u'lláh">
        {locale === 'fr'
          ? 'Ne faites pas de la religion une cause de dissensions et de luttes car son but, révélé des cieux de la sainte volonté de Dieu, est d\'établir l\'unité et la concorde parmi les peuples du monde. La religion de Dieu et sa loi divine sont les instruments les plus puissants, les moyens les plus sûrs, pour que se lève parmi les hommes la lumière de l\'unité. Le progrès du monde, le développement des nations, la tranquillité des peuples et la paix sur terre sont des principes, des ordonnances de Dieu.'
          : 'The purpose of religion as revealed from the heaven of God\'s holy Will is to establish unity and concord amongst the peoples of the world; make it not the cause of dissension and strife. The religion of God and His divine law are the most potent instruments and the surest of all means for the dawning of the light of unity amongst men. The progress of the world, the development of nations, the tranquility of peoples, and the peace of all who dwell on earth are among the principles and ordinances of God.'}
      </Quote>

      <Container className="mt-16">
        <StatList>
          <StatListItem value="5M+" label={t.about.stats.bahaisWorldwide} />
          <StatListItem value="100,000+" label={t.about.stats.localitiesGlobally} />
          <StatListItem value="100+" label={t.about.stats.yearsInWinnipeg} />
        </StatList>
      </Container>

      <CorePrinciples
        eyebrow={t.about.corePrinciples.eyebrow}
        heading={t.about.corePrinciples.heading}
        intro={t.about.corePrinciples.intro}
        items={t.about.corePrinciples.items}
      />

      <LocalCommunity
        locale={locale}
        eyebrow={t.about.localCommunity.eyebrow}
        heading={t.about.localCommunity.heading}
        intro={t.about.localCommunity.intro}
        body={t.about.localCommunity.body}
      />

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
