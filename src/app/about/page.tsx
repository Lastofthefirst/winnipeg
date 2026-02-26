import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { RootLayout } from '@/components/RootLayout'

function CorePrinciples() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Core principles"
        title="The oneness of humanity is the central teaching of the Bahá'í Faith."
        invert
      >
        <p>
          Bahá&apos;ís believe that humanity is one family, that women and men
          are equal, and that the diversity of the human race is a source of
          strength.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Unity of humanity" invert>
            The principle that all people belong to one human family—bound
            together regardless of race, nation, or creed—is the cornerstone of
            the Bahá&apos;í Faith.
          </GridListItem>
          <GridListItem title="Equality of women and men" invert>
            Humanity is like a bird: one wing is women, the other men. Only when
            both wings are equally strong can the bird fly.
          </GridListItem>
          <GridListItem title="Elimination of prejudice" invert>
            Of all forms of prejudice, the most destructive is racial prejudice.
            Bahá&apos;ís strive actively to build bonds across every line of
            division.
          </GridListItem>
          <GridListItem title="Harmony of science and religion" invert>
            Religion without science is superstition; science without religion is
            materialism. Both are needed for human progress.
          </GridListItem>
          <GridListItem title="Independent investigation of truth" invert>
            Each person has the right and responsibility to search for truth
            independently, unfettered by superstition or tradition.
          </GridListItem>
          <GridListItem title="Universal education" invert>
            Every child deserves access to education. Knowledge is a treasure
            and the means of progress for every community.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

function LocalCommunity() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Our community"
        title="The Bahá'ís of Winnipeg"
      >
        <p>
          Like the two rivers that meet at the Forks, the Bahá&apos;í Community
          of Winnipeg draws together people from many backgrounds, united by a
          shared vision of building a more just and peaceful world.
        </p>
      </SectionIntro>
      <div className="mt-10 max-w-2xl space-y-6 text-base text-neutral-600">
        <p>
          The Bahá&apos;í community in Winnipeg has been present for over a
          century, growing from a handful of early believers into a vibrant
          community that reflects the city&apos;s rich multicultural heritage.
          Today, members from dozens of cultural backgrounds come together in a
          spirit of unity.
        </p>
        <p>
          Our community centre on McMillan Avenue serves as a gathering place
          for devotional programs, study circles, children&apos;s classes, and
          community celebrations. We are deeply engaged in the life of our
          neighbourhoods, working alongside others to foster community building
          and social action.
        </p>
        <p>
          Like the vast prairie sky that reminds us there is always room for
          growth, we believe that every person has a contribution to make.
          Whether you are exploring the Bahá&apos;í Faith for the first time or
          looking for a welcoming community, we invite you to connect with us.
        </p>
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about the Bahá\'í Faith and the Bahá\'í Community of Winnipeg, Manitoba.',
}

export default function About() {
  return (
    <RootLayout>
      <PageIntro eyebrow="About" title="The Bahá'í Faith">
        <p>
          The Bahá&apos;í Faith is a world religion whose purpose is to unite
          all peoples in one universal cause and one common faith.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Founded by Bahá&apos;u&apos;lláh in the nineteenth century, the
            Bahá&apos;í Faith has spread to virtually every country and
            territory on Earth, embracing people from more than 2,100 ethnic,
            racial, and tribal backgrounds. At the heart of the Faith is the
            conviction that humanity is one single race, and that the day has
            come for humanity&apos;s unification into one global society.
          </p>
          <p>
            Bahá&apos;ís are engaged in a global endeavour to build vibrant
            communities that reflect the principles of justice, unity, and
            service. Through grassroots activities such as devotional
            gatherings, study circles, and programs for children and youth,
            Bahá&apos;ís and their friends work together to translate spiritual
            principles into social action.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="5M+" label="Bahá'ís worldwide" />
          <StatListItem value="100,000+" label="Localities globally" />
          <StatListItem value="100+" label="Years in Winnipeg" />
        </StatList>
      </Container>

      <CorePrinciples />

      <LocalCommunity />

      <ContactSection />
    </RootLayout>
  )
}
