import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageDevotional from '@/images/devotional-gathering.jpg'
import imageStudyCircle from '@/images/study-circle.jpg'
import imageChildrens from '@/images/childrens-class.jpg'
import imageJuniorYouth from '@/images/junior-youth.jpg'
import imageCommunityService from '@/images/community-service.jpg'
import { RootLayout } from '@/components/RootLayout'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
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
  )
}

function DevotionalGatherings() {
  return (
    <Section title="Devotional Gatherings" image={{ src: imageDevotional }}>
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          Devotional gatherings bring people together to pray and reflect on
          the sacred writings of the world&apos;s religions. These intimate
          settings provide a space for quiet contemplation and uplifting
          conversation.
        </p>
        <p>
          Open to people of all backgrounds and beliefs, our devotional
          gatherings are held regularly in homes and at the Bahá&apos;í Centre.
          Whether you wish to share a prayer, listen in stillness, or simply
          experience the warmth of community, you are welcome.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-burgundy-900">
        What to expect
      </h3>
      <TagList className="mt-4">
        <TagListItem>Prayers and readings</TagListItem>
        <TagListItem>Music and devotions</TagListItem>
        <TagListItem>Quiet reflection</TagListItem>
        <TagListItem>All faiths welcome</TagListItem>
      </TagList>
    </Section>
  )
}

function StudyCircles() {
  return (
    <Section title="Study Circles" image={{ src: imageStudyCircle, shape: 1 }}>
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          Study circles are small groups of people who come together to deepen
          their understanding of spiritual and social principles. Using the
          Ruhi Institute curriculum, participants explore themes like prayer,
          the life of the spirit, and service to others.
        </p>
        <p>
          These intimate study groups foster meaningful conversation and help
          participants develop the capacity to contribute to the betterment of
          their communities. No prior knowledge of the Bahá&apos;í Faith is
          required.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Bahá\'u\'lláh', role: 'Founder of the Bahá\'í Faith' }}
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
      title="Children's Classes"
      image={{ src: imageChildrens, shape: 2 }}
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          Bahá&apos;í children&apos;s classes nurture the spiritual development
          of young hearts through stories, songs, prayers, art, and cooperative
          games. Children learn about virtues like truthfulness, kindness, and
          justice in a joyful, creative environment.
        </p>
        <p>
          Classes are open to all children in the neighbourhood. The program
          helps children develop a strong moral foundation while building
          friendships across diverse backgrounds.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-burgundy-900">
        Program highlights
      </h3>
      <TagList className="mt-4">
        <TagListItem>Virtues-based lessons</TagListItem>
        <TagListItem>Songs and prayers</TagListItem>
        <TagListItem>Creative arts</TagListItem>
        <TagListItem>Cooperative games</TagListItem>
        <TagListItem>Service projects</TagListItem>
      </TagList>
    </Section>
  )
}

function JuniorYouth() {
  return (
    <Section
      title="Junior Youth Spiritual Empowerment"
      image={{ src: imageJuniorYouth }}
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          The junior youth spiritual empowerment program helps young people
          between 12 and 15 develop the intellectual and spiritual capacities
          they need to navigate a critical stage of their lives and contribute
          meaningfully to society.
        </p>
        <p>
          Through study, artistic expression, and service projects, junior
          youth explore themes of identity, social responsibility, and the
          power of language. The program harnesses their natural idealism and
          desire to improve the world.
        </p>
      </div>
    </Section>
  )
}

function CommunityService() {
  return (
    <Section
      title="Community Service"
      image={{ src: imageCommunityService, shape: 1 }}
    >
      <div className="space-y-6 text-base leading-relaxed text-burgundy-700">
        <p>
          Service to others is a core element of Bahá&apos;í community life.
          From neighbourhood beautification projects to outreach programs,
          Bahá&apos;ís and their friends work together to address the needs of
          the wider community.
        </p>
        <p>
          In Winnipeg, our community participates in interfaith dialogue,
          social gatherings that foster understanding, and collaborative
          initiatives with neighbourhood groups. Just as the prairies sustain
          life through cooperation and resilience, we believe that communities
          grow stronger when people serve one another.
        </p>
      </div>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden bg-linear-to-b from-parchment">
        <GridPattern
          className="absolute inset-0 h-full w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-burgundy-50 stroke-burgundy-200/30"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Principles in action"
        title="Building a better world, one neighbourhood at a time"
      >
        <p>
          Every activity of the Bahá&apos;í community is motivated by the
          desire to translate spiritual principles into practical action for the
          betterment of society.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="Unity in diversity">
            Winnipeg&apos;s multicultural mosaic is a source of strength.
            Bahá&apos;í community life celebrates the richness that diversity
            brings.
          </GridListItem>
          <GridListItem title="Universal participation">
            Everyone has a role to play. Our activities are open to all, and
            every voice is valued in the conversation about community building.
          </GridListItem>
          <GridListItem title="Spiritual foundations">
            Prayer, reflection, and study of the sacred writings provide the
            spiritual nourishment that sustains all our efforts.
          </GridListItem>
          <GridListItem title="Learning in action">
            We approach community building as a learning process, constantly
            reflecting on experience and adjusting our efforts.
          </GridListItem>
          <GridListItem title="Service to society">
            True happiness comes from service to others. Our community is
            committed to contributing to the well-being of Winnipeg.
          </GridListItem>
          <GridListItem title="Resilience">
            Like the prairie spirit that endures through the long winters, our
            community draws strength from patience, perseverance, and hope.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Community Life',
  description:
    'Explore the activities of the Bahá\'í Community of Winnipeg — devotional gatherings, study circles, children\'s classes, and more.',
}

export default function CommunityLife() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Community life" title="Growing together in spirit and service">
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
        <CommunityService />
      </div>

      <Values />

      <ContactSection />
    </RootLayout>
  )
}
