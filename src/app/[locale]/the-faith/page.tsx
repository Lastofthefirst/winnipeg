import { type Metadata } from 'next'

import { BahaiLinks } from '@/components/BahaiLinks'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { GridList, GridListItem } from '@/components/GridList'
import { OptimizedImage } from '@/components/OptimizedImage'
import { PageIntro } from '@/components/PageIntro'
import { Quote } from '@/components/Quote'
import { SectionIntro } from '@/components/SectionIntro'
import { WritingsAndPrayer } from '@/components/WritingsAndPrayer'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'
import writingsData from '@/../content/cms/writings.json'

type WritingsEntry = {
  slug: string
  passage: string
  source: string
  language: string
  image: string
}

const writings = writingsData as WritingsEntry[]

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  const base = 'https://winnipegbahais.org'
  return {
    title: t.meta.theFaith.title,
    description: t.meta.theFaith.description,
    alternates: {
      canonical: `${base}/${locale}/the-faith`,
      languages: {
        en: `${base}/en/the-faith`,
        fr: `${base}/fr/the-faith`,
        'x-default': `${base}/en/the-faith`,
      },
    },
  }
}

interface CentralFiguresProps {
  eyebrow: string
  heading: string
  intro: string
  items: Array<{ title: string; body: string }>
}

function CentralFigures({ eyebrow, heading, intro, items }: CentralFiguresProps) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro eyebrow={eyebrow} title={heading}>
        <p>{intro}</p>
      </SectionIntro>
      <div className="mt-16">
        <GridList>
          {items.map((item) => (
            <GridListItem key={item.title} title={item.title}>
              {item.body}
            </GridListItem>
          ))}
        </GridList>
      </div>
    </Container>
  )
}

interface CoreTeachingsProps {
  eyebrow: string
  heading: string
  intro: string
  items: Array<{ title: string; body: string }>
}

function CoreTeachings({ eyebrow, heading, intro, items }: CoreTeachingsProps) {
  return (
    <div className="relative mt-24 bg-burgundy-900 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 xl:hidden">
        <OptimizedImage
          src="/the-faith/globe-01.png"
          alt=""
          width={540}
          height={540}
          className="w-36 object-contain opacity-80 sm:w-48 lg:w-72"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <Container className="relative h-full">
          <div className="absolute right-0 top-0">
            <OptimizedImage
              src="/the-faith/globe-full-01.png"
              alt=""
              width={768}
              height={768}
              className="w-80 object-contain opacity-80"
            />
          </div>
        </Container>
      </div>
      <div className="relative z-10">
        <SectionIntro eyebrow={eyebrow} title={heading} invert>
          <p>{intro}</p>
        </SectionIntro>
      </div>
      <Container className="mt-16 relative z-10">
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

interface OfficialResourcesProps {
  eyebrow: string
  heading: string
  intro: string
}

function OfficialResources({ eyebrow, heading, intro }: OfficialResourcesProps) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro eyebrow={eyebrow} title={heading}>
        <p>{intro}</p>
      </SectionIntro>
      <div className="mt-16 max-w-2xl">
        <BahaiLinks />
      </div>
    </Container>
  )
}

export default async function TheFaithPage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)

  return (
    <>
      <PageIntro eyebrow={t.theFaith.eyebrow} title={t.theFaith.heading}>
        <p>{t.theFaith.intro}</p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>{t.theFaith.body}</p>
        </div>
      </PageIntro>

      <Quote
        className="mt-24 sm:mt-32 lg:mt-40"
        author="Bahá'u'lláh"
      >
        {locale === 'fr'
          ? 'La terre est un seul pays et tous les hommes en sont les citoyens.'
          : 'The earth is but one country, and mankind its citizens.'}
      </Quote>

      <CentralFigures
        eyebrow={t.theFaith.centralFigures.eyebrow}
        heading={t.theFaith.centralFigures.heading}
        intro={t.theFaith.centralFigures.intro}
        items={t.theFaith.centralFigures.items}
      />

      <CoreTeachings
        eyebrow={t.theFaith.coreTeachings.eyebrow}
        heading={t.theFaith.coreTeachings.heading}
        intro={t.theFaith.coreTeachings.intro}
        items={t.theFaith.coreTeachings.items}
      />

      <WritingsAndPrayer
        eyebrow={t.theFaith.writingsAndPrayer.eyebrow}
        heading={t.theFaith.writingsAndPrayer.heading}
        intro={t.theFaith.writingsAndPrayer.intro}
        read={t.theFaith.writingsAndPrayer.read}
        downloadAll={t.theFaith.writingsAndPrayer.downloadAll}
        locale={locale}
        writings={writings}
      />

      <Quote
        className="mt-24 sm:mt-32 lg:mt-40"
        author="Bahá'u'lláh"
      >
        {locale === 'fr'
          ? 'Voyez en l\'homme une mine riche en gemmes d\'une valeur inestimable. Mais, seule l\'éducation peut révéler les trésors de cette mine et permettre à l\'humanité d\'en profiter.'
          : 'Regard man as a mine rich in gems of inestimable value. Education can, alone, cause it to reveal its treasures, and enable mankind to benefit therefrom.'}
      </Quote>

      <OfficialResources
        eyebrow={t.theFaith.officialResources.eyebrow}
        heading={t.theFaith.officialResources.heading}
        intro={t.theFaith.officialResources.intro}
      />

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
