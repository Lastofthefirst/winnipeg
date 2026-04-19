import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { OptimizedImage } from '@/components/OptimizedImage'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { TagList, TagListItem } from '@/components/TagList'
import { RootLayout } from '@/components/RootLayout'

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

function DevotionalGatherings() {
  return (
    <Section
      title="Devotional Meetings"
      imageSrc="/flowers-clean/flower-patch-10.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          Devotional meetings bring people together in collective worship —
          reading and reflecting on sacred writings, offering prayers, and
          cultivating the spiritual sensibilities that sustain a life of
          service. They are held in homes, community spaces, and wherever
          people choose to gather.
        </p>
        <p>
          These gatherings are open to everyone, regardless of background or
          belief. There is no requirement to speak or perform — you may come
          simply to listen, to reflect, or to add your voice to those of
          others.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-burgundy-900">
        What to expect
      </h3>
      <TagList className="mt-4">
        <TagListItem>Prayers and sacred readings</TagListItem>
        <TagListItem>Music and devotional songs</TagListItem>
        <TagListItem>Quiet reflection</TagListItem>
        <TagListItem>Open to all faiths</TagListItem>
      </TagList>
    </Section>
  )
}

function StudyCircles() {
  return (
    <Section
      id="study-circles"
      title="Study Circles"
      imageSrc="/flowers-clean/flower-patch-11.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          A study circle is a small group of people who come together with a
          tutor to work through the Ruhi Institute&apos;s main sequence of
          courses. The atmosphere is one of joy, calm, and meditative serenity
          — a space to read, to reflect, to discuss, and to build the
          understanding that sustains meaningful service.
        </p>
        <p>
          The courses explore themes such as the life of the spirit, service to
          others, and the forces shaping individuals and communities. They are
          designed to enhance the capacity of youth and adults alike to
          contribute to the well-being of their communities. Friends and
          neighbours from every background are welcome to join.
        </p>
      </div>

      <Blockquote
        author={{ name: "Bahá'u'lláh", role: "Founder of the Bahá'í Faith" }}
        className="mt-12"
      >
        Regard man as a mine rich in gems of inestimable value. Education can,
        alone, cause it to reveal its treasures, and enable mankind to benefit
        therefrom.
      </Blockquote>
    </Section>
  )
}

function ChildrensClasses() {
  return (
    <Section
      id="childrens-classes"
      title="Children's Classes"
      imageSrc="/flowers-clean/flower-patch-03.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          Children&apos;s classes focus on the development of spiritual
          qualities — the beliefs, habits, and patterns of conduct that
          make for a worthy and meaningful life. Through stories, songs,
          prayers, art, and cooperative games, children are helped to
          discover and strengthen virtues such as honesty, kindness,
          generosity, and a love of learning.
        </p>
        <p>
          Classes are open to all children in the neighbourhood between
          the ages of 5 and 11. The program is carried out by trained
          teachers who are themselves walking a path of service.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-burgundy-900">
        Program highlights
      </h3>
      <TagList className="mt-4">
        <TagListItem>Stories</TagListItem>
        <TagListItem>Songs</TagListItem>
        <TagListItem>Prayers</TagListItem>
        <TagListItem>Art</TagListItem>
        <TagListItem>Cooperative games</TagListItem>
        <TagListItem>Ages 5 to 11</TagListItem>
      </TagList>
    </Section>
  )
}

function JuniorYouth() {
  return (
    <Section
      title="Junior Youth Spiritual Empowerment"
      imageSrc="/flowers-clean/flower-patch-29.png"
      imageAlt="Prairie wildflower garden"
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          The years between 12 and 15 are a crucial period of development —
          a time when young people are forming their identity and deciding what
          kind of person they want to be. The junior youth spiritual
          empowerment program accompanies them through this stage, helping
          them direct their energies and talents toward the advancement of
          their communities.
        </p>
        <p>
          Small groups of junior youth meet regularly with an older youth
          animator to work through texts that develop their powers of
          expression, their moral reasoning, and their capacity for service.
          The program is open to all young people in the neighbourhood,
          regardless of background.
        </p>
      </div>
    </Section>
  )
}

function ServiceAsUndercurrent() {
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
              The animating spirit
            </p>
            <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-burgundy-900 sm:text-4xl">
              Service
            </h2>
            <div className="mt-6 space-y-6 text-base leading-relaxed text-burgundy-700">
              <p>
                Bahá&apos;ís understand service as an expression of love for
                humanity and as the means by which spiritual qualities are
                developed. Such qualities are not acquired through focusing on
                the self — they grow in the act of giving. Devotion sustains
                this impulse; service gives it form. Together, they give rise to
                a pattern of community life infused with the spirit of worship.
              </p>
              <p>
                This understanding harmonizes being and doing, and individual
                and collective transformation. To serve one&apos;s community
                is to participate in the building of a better world — and in so
                doing so, to transform one&apos;s own character.
              </p>

            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  )
}

function Values() {
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
        <SectionIntro
          eyebrow="Principles in action"
          title="Two dimensions of one unfolding process"
        >
          <p>
            The Bahá&apos;í community is engaged in a twofold endeavour:
            attending to the inner life of the individual and contributing to
            the transformation of society. These are not separate aims — they
            are inseparable.
          </p>
        </SectionIntro>
      </Container>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Oneness of humanity">
            The principle that all people belong to one human family is the
            pivot round which the teachings of the Bahá&apos;í Faith revolve —
            not merely an ideal, but the foundation of all community action.
          </GridListItem>
          <GridListItem title="Individual and collective transformation">
            Spiritual qualities are not acquired through focusing on the self;
            they develop in service to others. Personal and communal growth are
            inseparable and mutually reinforcing.
          </GridListItem>
          <GridListItem title="Devotion and service in concert">
            Worship awakens spiritual susceptibilities; service gives them
            expression. Together, they give rise to a pattern of community life
            infused with the spirit of devotion.
          </GridListItem>
          <GridListItem title="Learning through action">
            Community building is approached as a process of learning — not
            theoretical study alone, but reflection on lived experience,
            adjusting course, and growing through the work itself.
          </GridListItem>
          <GridListItem title="Universal participation">
            Every person has a contribution to make. Our activities are open to
            all, and every voice is valued in the conversation about building a
            better world.
          </GridListItem>
          <GridListItem title="Material and spiritual civilization">
            The Bahá&apos;í community rejects any false separation between
            inner life and practical action. Building a just world is itself a
            spiritual undertaking.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Community Life',
  description:
    "Explore the activities of the Bahá'í Community of Winnipeg — devotional meetings, study circles, children's classes, junior youth groups, and more.",
}

export default function CommunityLife() {
  return (
    <RootLayout>
      <PageIntro
        eyebrow="Community life"
        title="Growing together in spirit and service"
      >
        <p>
          The Bahá&apos;í community in Winnipeg offers a range of activities
          that bring people together for prayer, study, and service to the
          wider community. All are welcome.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <DevotionalGatherings />
        <StudyCircles />
        <ChildrensClasses />
        <JuniorYouth />
      </div>

      <ServiceAsUndercurrent />

      <Values />

      <ContactSection />
    </RootLayout>
  )
}
