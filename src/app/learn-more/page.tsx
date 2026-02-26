import { type Metadata } from 'next'

import { BahaiLinks } from '@/components/BahaiLinks'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { Quote } from '@/components/Quote'
import { SectionIntro } from '@/components/SectionIntro'
import { RootLayout } from '@/components/RootLayout'

function CentralFigures() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Central figures"
        title="The founders and exemplar of the Bahá'í Faith"
      >
        <p>
          The Bahá&apos;í Faith centres on the lives and teachings of three
          figures whose vision of humanity&apos;s oneness continues to inspire
          millions around the world.
        </p>
      </SectionIntro>
      <div className="mt-16">
        <GridList>
          <GridListItem title="Bahá'u'lláh (1817–1892)">
            The Founder of the Bahá&apos;í Faith. Born in Tehran, Persia,
            Bahá&apos;u&apos;lláh endured forty years of exile and
            imprisonment for proclaiming His message that humanity is one
            family and that the time has come for its unification. His
            writings encompass over 100 volumes.
          </GridListItem>
          <GridListItem title="The Báb (1819–1850)">
            The Herald and Forerunner of the Bahá&apos;í Faith. The Báb
            declared His mission in 1844, calling for spiritual and social
            reform and announcing the imminent appearance of a greater
            Messenger of God. He was executed in 1850 for His teachings.
          </GridListItem>
          <GridListItem title="'Abdu'l-Bahá (1844–1921)">
            The son of Bahá&apos;u&apos;lláh and the perfect exemplar of His
            teachings. &apos;Abdu&apos;l-Bahá dedicated His life to promoting
            unity, peace, and service to others. His journeys to Europe and
            North America in 1911–1913 brought the Faith to wide public
            attention.
          </GridListItem>
        </GridList>
      </div>
    </Container>
  )
}

function CoreTeachings() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Core teachings"
        title="Principles for a united world"
        invert
      >
        <p>
          The teachings of the Bahá&apos;í Faith address both the spiritual life
          of the individual and the structures of society.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Oneness of God" invert>
            There is only one God, and all the great religions of the world
            represent successive chapters in one unfolding story of divine
            guidance for humanity.
          </GridListItem>
          <GridListItem title="Oneness of religion" invert>
            The world&apos;s religions come from the same divine source and are
            successive stages in the spiritual evolution of human civilization.
          </GridListItem>
          <GridListItem title="Oneness of humanity" invert>
            The earth is one country and mankind its citizens. The diversity
            of the human race should be a cause of love and harmony.
          </GridListItem>
          <GridListItem title="Universal peace" invert>
            World peace is not only possible but inevitable. It is the next
            stage in the evolution of humanity.
          </GridListItem>
          <GridListItem title="Justice and equity" invert>
            Justice is the best beloved of all things in the sight of God.
            A just society ensures the rights and dignity of every individual.
          </GridListItem>
          <GridListItem title="Service to humanity" invert>
            Work performed in the spirit of service is elevated to the rank
            of worship. Serving others is the highest expression of a
            spiritual life.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

function OfficialResources() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Official resources"
        title="Explore further"
      >
        <p>
          These official Bahá&apos;í websites offer a wealth of information,
          sacred texts, news stories, and resources for deeper study.
        </p>
      </SectionIntro>
      <div className="mt-16 max-w-2xl">
        <BahaiLinks />
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Learn More',
  description:
    'Learn about the central figures, core teachings, and principles of the Bahá\'í Faith.',
}

export default function LearnMore() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Learn more" title="Exploring the Bahá'í Faith">
        <p>
          The Bahá&apos;í Faith offers a compelling vision of a peaceful,
          unified world. Explore the central figures, core teachings, and
          resources that illuminate this vision.
        </p>
      </PageIntro>

      <CentralFigures />

      <CoreTeachings />

      <Quote
        className="mt-24 sm:mt-32 lg:mt-40"
        author="Bahá'u'lláh"
      >
        The earth is but one country, and mankind its citizens.
      </Quote>

      <OfficialResources />

      <ContactSection />
    </RootLayout>
  )
}
