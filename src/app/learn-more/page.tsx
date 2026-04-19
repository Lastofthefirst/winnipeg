import { type Metadata } from 'next'

import { BahaiLinks } from '@/components/BahaiLinks'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { GridList, GridListItem } from '@/components/GridList'
import { OptimizedImage } from '@/components/OptimizedImage'
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
          The Bahá&apos;í Faith centres on the lives and writings of three
          figures — the Báb, Bahá&apos;u&apos;lláh, and
          &apos;Abdu&apos;l-Bahá — whose vision of humanity&apos;s oneness
          continues to inspire millions around the world.
        </p>
      </SectionIntro>
      <div className="mt-16">
        <GridList>
          <GridListItem title="Bahá'u'lláh (1817–1892)">
            The Founder of the Bahá&apos;í Faith and its central figure.
            Born in Tehran, Bahá&apos;u&apos;lláh endured forty years of
            exile and imprisonment for proclaiming His message that humanity
            is one family and that the long-awaited moment for its
            unification has arrived. His writings encompass over 100 volumes
            and form the sacred scripture of the Faith.
          </GridListItem>
          <GridListItem title="The Báb (1819–1850)">
            The Herald of the Bahá&apos;í Faith. In 1844, the Báb declared
            His mission and called humanity to spiritual renewal, announcing
            the imminent appearance of the Promised One foretold in the
            sacred traditions of all religions. He was executed in 1850 in
            Tabriz, Persia, at the age of thirty.
          </GridListItem>
          <GridListItem title="'Abdu'l-Bahá (1844–1921)">
            The son of Bahá&apos;u&apos;lláh and the Centre of His
            Covenant — appointed by Bahá&apos;u&apos;lláh as the sole
            authoritative interpreter of His teachings.
            &apos;Abdu&apos;l-Bahá is regarded as the perfect exemplar of
            Bahá&apos;í life: one in whom all the spiritual and
            humanitarian virtues of the Faith found complete expression.
          </GridListItem>
        </GridList>
      </div>
    </Container>
  )
}

function CoreTeachings() {
  return (
    <div className="relative mt-24 bg-burgundy-900 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      {/* Cropped globe — viewport-aligned, all sizes except xl */}
      <div className="pointer-events-none absolute right-0 top-0 xl:hidden">
        <OptimizedImage
          src="/learn-more/globe-01.png"
          alt=""
          width={540}
          height={540}
          className="w-36 object-contain opacity-80 sm:w-48 lg:w-72"
        />
      </div>
      {/* Full globe — container-aligned at xl */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        <Container className="relative h-full">
          <div className="absolute right-0 top-0">
            <OptimizedImage
              src="/learn-more/globe-full-01.png"
              alt=""
              width={768}
              height={768}
              className="w-80 object-contain opacity-80"
            />
          </div>
        </Container>
      </div>
      <div className="relative z-10">
        <SectionIntro
          eyebrow="Core teachings"
          title="The oneness of God, religion, and humanity"
          invert
        >
          <p>
            At the heart of the Bahá&apos;í Faith are teachings about the
            oneness of God and religion, the oneness of humanity and freedom
            from prejudice, and the harmony of science and religion. These are
            not abstract ideals — they are principles for the ordering of
            human life and the building of civilisation.
          </p>
        </SectionIntro>
      </div>
      <Container className="mt-16 relative z-10">
        <GridList>
          <GridListItem title="Oneness of God" invert>
            There is only one God — unknowable in essence, yet made known
            to humanity through a succession of divine Messengers. All the
            great religions of the world flow from this one source.
          </GridListItem>
          <GridListItem title="Progressive revelation" invert>
            Religious truth is revealed progressively. The Manifestations
            of God — Abraham, Moses, Buddha, Christ, Muhammad,
            Bahá&apos;u&apos;lláh — each brought teachings suited to
            the needs and capacity of the age in which they appeared.
          </GridListItem>
          <GridListItem title="Oneness of humanity" invert>
            &ldquo;The earth is but one country, and mankind its
            citizens.&rdquo; The diversity of the human race is not a
            source of division but a cause of love and harmony. All
            prejudice — of race, class, nationality, or religion — must
            be overcome.
          </GridListItem>
          <GridListItem title="Inherent nobility" invert>
            Every human being is a mine rich in gems of inestimable value.
            The purpose of education, spiritual and material alike, is to
            reveal these inner capacities in service to one another and to
            civilisation.
          </GridListItem>
          <GridListItem title="Harmony of science and religion" invert>
            Science and religion are two complementary systems of knowledge.
            Religion without science leads to superstition; science without
            religion leads to materialism. Both are essential to human
            progress.
          </GridListItem>
          <GridListItem title="Justice" invert>
            Justice is the best-beloved of all things in the sight of God
            and the centrality of justice to all human endeavours is a
            cornerstone of Bahá&apos;í social teaching. A just society
            upholds the rights and dignity of every person.
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
          The Bahá&apos;í Faith addresses both the spiritual life of the
          individual and the structures of human society — offering a
          coherent vision of justice, unity, and the oneness of humankind.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Founded in the nineteenth century, the Faith has spread to
            virtually every country and territory on Earth. Its central
            conviction is that humanity is one family, that all the world&apos;s
            great religions come from the same divine source, and that the
            long-promised age of peace is now within humanity&apos;s reach.
          </p>
        </div>
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
