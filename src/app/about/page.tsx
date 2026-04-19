import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { OptimizedImage } from '@/components/OptimizedImage'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { RootLayout } from '@/components/RootLayout'

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
              src="/prairie-theme/prairie-flowers-01.png"
              alt="Prairie wildflowers"
              width={768}
              height={768}
              className="w-full object-contain"
            />
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

function CorePrinciples() {
  return (
    <div className="relative mt-24 bg-burgundy-900 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      {/* Cloud accent - top right area */}
      <div className="pointer-events-none absolute right-4 top-8 sm:right-8 lg:right-16 lg:top-12">
        <OptimizedImage
          src="/burgundy-clouds/cloud-01.png"
          alt=""
          width={400}
          height={400}
          className="w-[150px] object-contain sm:w-[200px] lg:w-[280px]"
        />
      </div>
      <SectionIntro
        eyebrow="Core principles"
        title="The oneness of humanity — the pivot round which all else revolves."
        invert
      >
        <p>
          Bahá&apos;ís believe that humanity is one family. All else flows
          from this conviction: the equality of women and men, the elimination
          of prejudice, the harmony of science and religion.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Unity of humanity" invert>
            All people belong to one human family. This is not merely an ideal
            but the foundation upon which a just and peaceful civilisation can
            be built.
          </GridListItem>
          <GridListItem title="Equality of women and men" invert>
            Humanity is like a bird: one wing is women, the other men. Only
            when both wings are equally strong can the bird fly.
          </GridListItem>
          <GridListItem title="Elimination of prejudice" invert>
            Of all forms of prejudice, racial prejudice is the most destructive.
            Bahá&apos;ís strive actively to build bonds across every line of
            division.
          </GridListItem>
          <GridListItem title="Harmony of science and religion" invert>
            Religion without science is superstition; science without religion
            is materialism. Both are needed for the progress of civilisation.
          </GridListItem>
          <GridListItem title="Independent investigation of truth" invert>
            Each person has the right and responsibility to search for truth
            independently — unfettered by tradition, superstition, or the
            imitation of others.
          </GridListItem>
          <GridListItem title="Universal education" invert>
            Regard every human being as a mine rich in gems. Education alone
            can reveal its treasures and enable all of humanity to benefit.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

function LocalCommunity() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="lg:flex lg:items-start lg:gap-x-16">
        <div className="lg:w-1/2">
          <SectionIntro
            eyebrow="Our community"
            title="The Bahá'ís of Winnipeg"
            className="!px-0"
          >
            <p>
              Like the two rivers that meet at the Forks, the Bahá&apos;í Community
              of Winnipeg draws together people from many backgrounds, united by a
              shared vision of building a more just and peaceful world.
            </p>
          </SectionIntro>
          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-burgundy-700">
            <p>
              The Bahá&apos;í community in Winnipeg has been present for over a
              century, growing from a handful of early believers into a vibrant
              community that reflects the city&apos;s rich multicultural heritage.
              Members from dozens of cultural backgrounds come together in a
              spirit of unity and shared purpose.
            </p>
            <p>
              Our community is deeply engaged in the life of our neighbourhoods —
              through devotional meetings, study circles, children&apos;s classes,
              and programs for junior youth. We work alongside our neighbours,
              friends, and all those who share the desire to cultivate hope and
              foster purposeful effort in the world.
            </p>
            <p>
              Every person has a contribution to make. Whether you are exploring
              the Bahá&apos;í Faith for the first time or simply looking to
              participate in something meaningful, we invite you to join us.
            </p>
          </div>
        </div>
        <FadeIn className="mt-12 lg:mt-0 lg:w-1/2">
          <div className="space-y-4">
            <OptimizedImage
              src="/prairie-theme/prairie-grass-01.png"
              alt="Tall prairie grass"
              width={640}
              height={896}
              className="w-full object-contain"
            />
            <OptimizedImage
              src="/prairie-theme/big-sky-01.png"
              alt="Big prairie sky"
              width={1024}
              height={640}
              className="w-full object-contain"
            />
          </div>
        </FadeIn>
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
          The fundamental purpose animating the Bahá&apos;í Faith is to
          safeguard the interests and promote the unity of the human race, and
          to foster the spirit of love and fellowship amongst all people.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Founded by Bahá&apos;u&apos;lláh in the nineteenth century, the
            Bahá&apos;í Faith has spread to virtually every country and
            territory on Earth, embracing people from more than 2,100 ethnic,
            racial, and tribal backgrounds. At the heart of the Faith is the
            conviction that humanity is one family, and that the day has come
            for humanity&apos;s unification into one global society.
          </p>
          <p>
            Bahá&apos;ís are engaged in a twofold endeavour: attending to the
            inner life of the individual and contributing to the transformation
            of society. These are not separate aims. Through devotional
            meetings, study circles, and programs for children and youth,
            Bahá&apos;ís and their friends work to build communities that
            reflect the principles of justice, unity, and the oneness of
            humankind.
          </p>
        </div>
      </PageIntro>

      <ImageStrip />

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
