import { type Metadata } from 'next'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { OptimizedImage } from '@/components/OptimizedImage'
import { PageIntro } from '@/components/PageIntro'
import { Quote } from '@/components/Quote'
import { SectionIntro } from '@/components/SectionIntro'
import { TagList, TagListItem } from '@/components/TagList'
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
    title: t.meta.communityLife.title,
    description: t.meta.communityLife.description,
    alternates: {
      canonical: `${base}/${locale}/community-life`,
      languages: {
        en: `${base}/en/community-life`,
        fr: `${base}/fr/community-life`,
        'x-default': `${base}/en/community-life`,
      },
    },
  }
}

// Garden theme image component
function GardenImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={640}
        height={640}
        className="w-full object-contain"
      />
    </div>
  )
}

function Section({
  id,
  title,
  imageSrc,
  imageAlt,
  children,
}: {
  id?: string
  title: string
  imageSrc: string
  imageAlt: string
  children: React.ReactNode
}) {
  return (
    <div id={id} className="group/section relative [counter-increment:section]">
      <Container>
        <div className="relative lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
          <div className="flex justify-center">
            <FadeIn className="w-[24rem] flex-none lg:w-[34rem]">
              <GardenImage src={imageSrc} alt={imageAlt} />
            </FadeIn>
          </div>
          <div className="relative mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
            <FadeIn>
              <div
                className="font-display text-base font-semibold before:text-burgundy-200 before:content-['/_'] after:text-burgundy-900 after:content-[counter(section,decimal-leading-zero)]"
                aria-hidden="true"
              />
              <h2 className="mt-2 font-display text-3xl font-normal tracking-tight text-burgundy-900 sm:text-4xl">
                {title}
              </h2>
              <div className="mt-6">{children}</div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </div>
  )
}

interface DevotionalGatheringsProps {
  title: string
  body: string[]
  whatToExpect: string
  writings: Array<{ label: string; slug: string }>
}

function DevotionalGatherings({ title, body, whatToExpect, writings }: DevotionalGatheringsProps) {
  return (
    <Section
      title={title}
      imageSrc="/flowers-clean/flower-patch-10.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        {body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-burgundy-900">
        {whatToExpect}
      </h3>
      <TagList className="mt-4">
        {writings.map((w) => (
          <TagListItem key={w.slug}>
            <Link
              href={`/writings/${w.slug}`}
              className="hover:text-burgundy-900"
            >
              {w.label}
            </Link>
          </TagListItem>
        ))}
      </TagList>
    </Section>
  )
}

interface StudyCirclesProps {
  title: string
  body: string[]
}

function StudyCircles({ title, body }: StudyCirclesProps) {
  return (
    <Section
      id="study-circles"
      title={title}
      imageSrc="/flowers-clean/flower-patch-11.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        {body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <Blockquote
        author={{ name: 'Universal House of Justice', role: '21 April 2008' }}
        className="mt-12"
      >
        Thousands upon thousands, embracing the diversity of the entire human
        family, are engaged in systematic study of the Creative Word in an
        environment that is at once serious and uplifting.
      </Blockquote>

    </Section>
  )
}

interface ChildrensClassesProps {
  title: string
  body: string[]
  programHighlights: string
  tags: string[]
}

function ChildrensClasses({ title, body, programHighlights, tags }: ChildrensClassesProps) {
  return (
    <Section
      id="childrens-classes"
      title={title}
      imageSrc="/flowers-clean/flower-patch-03.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        {body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-burgundy-900">
        {programHighlights}
      </h3>
      <TagList className="mt-4">
        {tags.map((tag) => (
          <TagListItem key={tag}>{tag}</TagListItem>
        ))}
      </TagList>
    </Section>
  )
}

interface JuniorYouthProps {
  title: string
  body: string[]
}

function JuniorYouth({ title, body }: JuniorYouthProps) {
  return (
    <Section
      title={title}
      imageSrc="/flowers-clean/flower-patch-29.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        {body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}

interface ServiceAsUndercurrentProps {
  eyebrow: string
  heading: string
  body: string[]
}

function ServiceAsUndercurrent({ eyebrow, heading, body }: ServiceAsUndercurrentProps) {
  return (
    <div className="relative mt-24 sm:mt-32 lg:mt-40">
      <Container>
        <div className="lg:flex lg:items-center lg:gap-x-16 xl:gap-x-20">
          <div className="flex justify-center lg:flex-none">
            <FadeIn className="w-[20rem] lg:w-[28rem]">
              <GardenImage src="/stones/stone-path-01.png" alt="A winding stone path through a garden" />
            </FadeIn>
          </div>
          <FadeIn className="mt-12 lg:mt-0 lg:flex-1">
            <div className="mb-4 h-px w-12 bg-gold-400" />
            <p className="font-display text-sm uppercase tracking-[0.25em] text-burgundy-500">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-burgundy-900 sm:text-4xl">
              {heading}
            </h2>
            <div className="mt-6 space-y-6 text-base leading-relaxed text-burgundy-700">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  )
}

interface ValuesProps {
  eyebrow: string
  heading: string
  intro: string
  items: Array<{ title: string; body: string }>
}

function Values({ eyebrow, heading, intro, items }: ValuesProps) {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <Container className="relative">
        {/* Accent image - positioned relative to container right edge */}
        <div className="pointer-events-none absolute -z-10 right-4 -top-8 sm:right-8 sm:-top-12 lg:right-0 lg:-top-[193px]">
          <OptimizedImage
            src="/garden-accents/butterfly-01.png"
            alt=""
            width={540}
            height={540}
            className="w-[150px] object-contain lg:w-[450px]"
          />
        </div>
        <SectionIntro eyebrow={eyebrow} title={heading}>
          <p>{intro}</p>
        </SectionIntro>
      </Container>

      <Container className="mt-24">
        <GridList>
          {items.map((item) => (
            <GridListItem key={item.title} title={item.title}>
              {item.body}
            </GridListItem>
          ))}
        </GridList>
      </Container>
    </div>
  )
}

export default async function CommunityLifePage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)

  return (
    <>
      <PageIntro eyebrow={t.communityLife.eyebrow} title={t.communityLife.heading}>
        <p>{t.communityLife.intro}</p>
      </PageIntro>

      <Quote className="mt-24 sm:mt-32 lg:mt-40" author="Bahá'u'lláh">
        Regard man as a mine rich in gems of inestimable value. Education can,
        alone, cause it to reveal its treasures, and enable mankind to benefit
        therefrom.
      </Quote>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <DevotionalGatherings
          title={t.communityLife.devotional.title}
          body={t.communityLife.devotional.body}
          whatToExpect="Bahá'í Writings"
          writings={t.communityLife.devotional.writings}
        />
        <StudyCircles
          title={t.communityLife.studyCircles.title}
          body={t.communityLife.studyCircles.body}
        />
        <ChildrensClasses
          title={t.communityLife.childrensClasses.title}
          body={t.communityLife.childrensClasses.body}
          programHighlights={t.communityLife.childrensClasses.programHighlights}
          tags={t.communityLife.childrensClasses.tags}
        />
        <JuniorYouth
          title={t.communityLife.juniorYouth.title}
          body={t.communityLife.juniorYouth.body}
        />
      </div>

      <ServiceAsUndercurrent
        eyebrow={t.communityLife.service.eyebrow}
        heading={t.communityLife.service.heading}
        body={t.communityLife.service.body}
      />

      <Values
        eyebrow={t.communityLife.values.eyebrow}
        heading={t.communityLife.values.heading}
        intro={t.communityLife.values.intro}
        items={t.communityLife.values.items}
      />

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
