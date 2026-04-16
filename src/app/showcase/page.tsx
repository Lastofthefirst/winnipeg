import { type Metadata } from 'next'

import { Border } from '@/components/Border'
import { OptimizedImage } from '@/components/OptimizedImage'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { RootLayout } from '@/components/RootLayout'

import imageHero from '@/images/hero-prairie-sky.jpg'
import imageForks from '@/images/forks-winnipeg.jpg'
import imageDevotional from '@/images/devotional-gathering.jpg'
import imageStudyCircle from '@/images/study-circle.jpg'
import imageChildrens from '@/images/childrens-class.jpg'
import imageCommunityGathering from '@/images/community-gathering.jpg'
import imageWinter from '@/images/winter-prairie.jpg'

const activities = [
  { title: 'Devotional Gatherings', image: imageDevotional, desc: 'Come together for prayer and reflection in a welcoming, intimate setting.' },
  { title: 'Study Circles', image: imageStudyCircle, desc: 'Explore spiritual principles in small group settings.' },
  { title: "Children's Classes", image: imageChildrens, desc: 'Nurture young hearts through stories, songs, and virtues.' },
]

/* ════════════════════════════════════════════════════════════════
   OPTION A — "Prairie Warmth"
   Full-bleed hero image with warm gold overlay.
   Warm-white backgrounds, prominent gold accents, earthy feel.
   ════════════════════════════════════════════════════════════════ */

function OptionA() {
  return (
    <section id="option-a">
      <div className="bg-neutral-950 px-6 py-6 text-center lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-400">
          Option A
        </p>
        <h2 className="mt-2 font-display text-3xl font-medium text-white sm:text-4xl">
          &ldquo;Prairie Warmth&rdquo;
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400">
          Full-bleed hero image with warm gold overlay. Earthy tones, generous
          warmth, golden hour feeling throughout.
        </p>
      </div>

      <div className="relative isolate overflow-hidden">
        <OptimizedImage src={imageHero} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" priority />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-warm-black/70 via-warm-black/50 to-warm-black/80" />
        <Container className="relative py-32 sm:py-40 lg:py-56">
          <FadeIn>
            <h1 className="max-w-3xl font-display text-5xl font-medium tracking-tight text-white sm:text-7xl">
              The Bahá&apos;í Community of Winnipeg
            </h1>
            <p className="mt-6 max-w-xl text-lg text-gold-200">
              Where the rivers meet, a community gathers — united in prayer,
              study, and service to build a more just and peaceful world.
            </p>
            <div className="mt-10 flex gap-4">
              <span className="inline-flex rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-warm-black">Explore Our Community</span>
              <span className="inline-flex rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white">Upcoming Events</span>
            </div>
          </FadeIn>
        </Container>
      </div>

      <div className="bg-warm-white py-24 sm:py-32">
        <Container>
          <FadeIn>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-600">Community life</p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-warm-black sm:text-4xl">Growing together in spirit and service</h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {activities.map((item) => (
              <FadeIn key={item.title} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-warm-black/5">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage src={item.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-black/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-warm-black">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
                  </div>
                  <div className="border-t border-gold-100 px-6 py-3">
                    <span className="text-sm font-semibold text-gold-600">Learn more &rarr;</span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
        <div className="mt-24 bg-gold-50 py-16 sm:py-24">
          <Container>
            <FadeIn>
              <figure className="mx-auto max-w-3xl">
                <blockquote className="relative font-display text-2xl font-medium tracking-tight text-warm-black sm:text-3xl">
                  <p className="before:content-['\u201C'] after:content-['\u201D'] sm:before:absolute sm:before:right-full">So powerful is the light of unity that it can illuminate the whole earth.</p>
                </blockquote>
                <figcaption className="mt-8 text-base text-gold-700">&mdash; Bahá&apos;u&apos;lláh</figcaption>
              </figure>
            </FadeIn>
          </Container>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   OPTION B — "Contemplative"
   ════════════════════════════════════════════════════════════════ */

function OptionB() {
  return (
    <section id="option-b">
      <div className="bg-neutral-950 px-6 py-6 text-center lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-teal-400">Option B</p>
        <h2 className="mt-2 font-display text-3xl font-medium text-white sm:text-4xl">&ldquo;Contemplative&rdquo;</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400">Split hero layout. Lots of whitespace echoing prairie sky. Teal accents, quieter, more spacious, elevated tone.</p>
      </div>

      <div className="bg-white">
        <Container className="py-24 sm:py-32 lg:py-40">
          <div className="lg:flex lg:items-center lg:gap-x-16">
            <FadeIn className="lg:w-1/2">
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-teal-600">Bahá&apos;í Community of Winnipeg</p>
              <h1 className="mt-6 font-display text-4xl font-medium tracking-tight text-neutral-950 sm:text-6xl">A place of gathering, learning, and service</h1>
              <p className="mt-6 text-lg text-neutral-600">Like the two rivers that meet at the Forks, our community draws together people from many backgrounds — united by a shared vision of building a more just and peaceful world.</p>
              <div className="mt-10 flex gap-4">
                <span className="inline-flex rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white">Get to Know Us</span>
                <span className="inline-flex rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold text-neutral-950">Learn More</span>
              </div>
            </FadeIn>
            <FadeIn className="mt-16 lg:mt-0 lg:w-1/2">
              <div className="relative overflow-hidden rounded-3xl">
                <OptimizedImage src={imageForks} alt="" className="aspect-4/3 w-full object-cover" />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-neutral-950/10" />
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>

      <div className="bg-neutral-50 py-24 sm:py-32">
        <Container>
          <FadeIn>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-teal-600">Community life</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">Growing together in spirit and service</h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {activities.map((item) => (
              <FadeIn key={item.title} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-neutral-950/5 transition hover:ring-teal-600/20">
                  <div className="relative mb-6 h-40 overflow-hidden rounded-2xl">
                    <OptimizedImage src={item.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <Border position="left" className="pl-6">
                    <h3 className="font-display text-lg font-semibold text-neutral-950">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{item.desc}</p>
                  </Border>
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
        <Container className="mt-24">
          <FadeIn>
            <div className="relative rounded-3xl border border-teal-100 bg-white px-8 py-16 sm:px-16 sm:py-20">
              <div className="absolute top-6 left-8 text-6xl font-bold text-teal-100 sm:left-16">&ldquo;</div>
              <figure className="relative mx-auto max-w-3xl">
                <blockquote className="font-display text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl">
                  <p>So powerful is the light of unity that it can illuminate the whole earth.</p>
                </blockquote>
                <figcaption className="mt-8 text-base text-teal-700">&mdash; Bahá&apos;u&apos;lláh</figcaption>
              </figure>
            </div>
          </FadeIn>
        </Container>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   OPTION C — "Gathering Place"
   ════════════════════════════════════════════════════════════════ */

function OptionC() {
  return (
    <section id="option-c">
      <div className="bg-neutral-950 px-6 py-6 text-center lg:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-300">Option C</p>
        <h2 className="mt-2 font-display text-3xl font-medium text-white sm:text-4xl">&ldquo;Gathering Place&rdquo;</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400">Large hero image with floating text card. Blends gold and teal. Community-centered, inviting, modern warmth.</p>
      </div>

      <div className="relative bg-warm-white">
        <div className="relative h-[28rem] overflow-hidden sm:h-[36rem] lg:h-[44rem]">
          <OptimizedImage src={imageCommunityGathering} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-black/60 via-warm-black/30 to-transparent" />
        </div>
        <Container className="relative">
          <FadeIn>
            <div className="-mt-32 max-w-xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-neutral-950/5 sm:-mt-40 sm:p-12 lg:-mt-48">
              <p className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700 ring-1 ring-gold-200">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />Welcome
              </p>
              <h1 className="mt-6 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-5xl">The Bahá&apos;í Community of Winnipeg</h1>
              <p className="mt-4 text-base text-neutral-600">A diverse community united in the belief that humanity is one family. Join us for prayer, study, and service as we work together to build a better world — right here on the prairies.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex rounded-full bg-neutral-950 px-5 py-2 text-sm font-semibold text-white">Explore Community Life</span>
                <span className="inline-flex rounded-full bg-gold-50 px-5 py-2 text-sm font-semibold text-gold-800 ring-1 ring-gold-200">View Events</span>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      <div className="bg-warm-white py-24 sm:py-32">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4">
              <div className="h-px flex-auto bg-gold-200" />
              <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold-600">Community life</p>
              <div className="h-px flex-auto bg-gold-200" />
            </div>
            <h2 className="mt-6 text-center font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">Growing together in spirit and service</h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {activities.map((item, i) => (
              <FadeIn key={item.title} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-950/5 transition hover:shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage src={item.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className={`mb-3 h-1 w-10 rounded-full ${i % 2 === 0 ? 'bg-gold-400' : 'bg-teal-500'}`} />
                    <h3 className="font-display text-lg font-semibold text-neutral-950">{item.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-neutral-600">{item.desc}</p>
                    <p className="mt-4 text-sm font-semibold text-neutral-950">Learn more &rarr;</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
        <div className="relative mt-24 overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold-50 via-warm-white to-teal-50" />
          <Container>
            <FadeIn>
              <figure className="mx-auto max-w-3xl text-center">
                <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold-400" />
                <blockquote className="font-display text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl">
                  <p>&ldquo;So powerful is the light of unity that it can illuminate the whole earth.&rdquo;</p>
                </blockquote>
                <figcaption className="mt-8 text-base text-neutral-500">&mdash; Bahá&apos;u&apos;lláh</figcaption>
              </figure>
            </FadeIn>
          </Container>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   OPTION D — "Lotus & Stone"
   SERIF typography. Deep burgundy + ivory/parchment palette.
   Feels like illuminated manuscripts, gravitas, institutional.
   Completely different typographic rhythm.
   ════════════════════════════════════════════════════════════════ */

const serif = { fontFamily: 'Georgia, "Times New Roman", "Noto Serif", serif' }
const serifItalic = { ...serif, fontStyle: 'italic' as const }

function OptionD() {
  return (
    <section id="option-d">
      <div className="bg-burgundy-900 px-6 py-6 text-center lg:px-8">
        <p style={serif} className="text-sm font-semibold uppercase tracking-[0.25em] text-burgundy-300">
          Option D
        </p>
        <h2 style={serif} className="mt-2 text-3xl font-normal text-white sm:text-4xl">
          &ldquo;Lotus &amp; Stone&rdquo;
        </h2>
        <p style={serif} className="mx-auto mt-2 max-w-xl text-sm text-burgundy-300">
          Serif typography throughout. Deep burgundy + ivory palette.
          Gravitas of sacred texts, illuminated manuscript warmth.
          Totally different typographic feel.
        </p>
      </div>

      {/* Hero — dark burgundy with subtle texture */}
      <div className="relative overflow-hidden bg-burgundy-900">
        <div className="absolute inset-0 opacity-10">
          <GridPattern
            className="h-full w-full fill-burgundy-600 stroke-burgundy-700"
            yOffset={-100}
          />
        </div>
        <Container className="relative py-32 sm:py-40 lg:py-56">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-8 h-px w-24 bg-gold-400" />
              <p style={serif} className="text-sm uppercase tracking-[0.3em] text-gold-400">
                Bahá&apos;í Community of Winnipeg
              </p>
              <h1
                style={serif}
                className="mt-8 text-4xl leading-tight font-normal tracking-tight text-ivory sm:text-6xl lg:text-7xl"
              >
                Where rivers converge, hearts unite
              </h1>
              <p style={serifItalic} className="mt-8 text-xl text-burgundy-200 sm:text-2xl">
                A welcoming community devoted to the oneness of humanity,
                gathering on Treaty 1 territory in the heart of the prairies.
              </p>
              <div className="mt-12 flex justify-center gap-6">
                <span
                  style={serif}
                  className="inline-flex border border-gold-400 px-8 py-3 text-sm uppercase tracking-widest text-gold-400 transition hover:bg-gold-400/10"
                >
                  Enter
                </span>
                <span
                  style={serif}
                  className="inline-flex border border-burgundy-400 px-8 py-3 text-sm uppercase tracking-widest text-burgundy-300 transition hover:bg-burgundy-800"
                >
                  Events
                </span>
              </div>
              <div className="mx-auto mt-12 h-px w-24 bg-gold-400" />
            </div>
          </FadeIn>
        </Container>
      </div>

      {/* Content — parchment background */}
      <div className="bg-parchment py-24 sm:py-32">
        <Container>
          <FadeIn>
            <div className="text-center">
              <div className="mx-auto mb-4 h-px w-16 bg-burgundy-300" />
              <p style={serif} className="text-sm uppercase tracking-[0.25em] text-burgundy-500">Community life</p>
              <h2 style={serif} className="mt-4 text-3xl font-normal text-burgundy-900 sm:text-4xl">
                Pathways of service
              </h2>
              <div className="mx-auto mt-4 h-px w-16 bg-burgundy-300" />
            </div>
          </FadeIn>
          <FadeInStagger className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
            {activities.map((item) => (
              <FadeIn key={item.title} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden border border-burgundy-200 bg-ivory transition hover:border-burgundy-400">
                  <div className="relative h-52 overflow-hidden">
                    <OptimizedImage
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-700"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <div className="mb-4 h-px w-8 bg-gold-400" />
                    <h3 style={serif} className="text-xl font-normal text-burgundy-900">{item.title}</h3>
                    <p style={serif} className="mt-3 flex-1 text-sm leading-relaxed text-burgundy-700">
                      {item.desc}
                    </p>
                    <p style={serif} className="mt-6 text-xs uppercase tracking-[0.2em] text-gold-600">
                      Discover &rarr;
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>

        {/* Quote — elegant centered block */}
        <Container className="mt-24">
          <FadeIn>
            <div className="bg-burgundy-900 px-8 py-20 sm:px-16">
              <figure className="mx-auto max-w-3xl text-center">
                <div className="mx-auto mb-8 text-5xl text-gold-400">&ldquo;</div>
                <blockquote>
                  <p style={serifItalic} className="text-2xl leading-relaxed text-ivory sm:text-3xl">
                    So powerful is the light of unity that it can illuminate the
                    whole earth.
                  </p>
                </blockquote>
                <div className="mx-auto my-8 h-px w-16 bg-gold-400" />
                <figcaption style={serif} className="text-sm uppercase tracking-[0.2em] text-gold-400">
                  Bahá&apos;u&apos;lláh
                </figcaption>
              </figure>
            </div>
          </FadeIn>
        </Container>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   OPTION E — "Northern Light"
   Deep indigo + lavender + ice white. Ultra-modern.
   Thin font weights, wide spacing, glassmorphism cards.
   Cool-toned, celestial, totally different mood.
   ════════════════════════════════════════════════════════════════ */

const thin = { fontFamily: 'Mona Sans, system-ui, sans-serif', fontWeight: 200, fontVariationSettings: "'wdth' 100" }
const light = { fontFamily: 'Mona Sans, system-ui, sans-serif', fontWeight: 300, fontVariationSettings: "'wdth' 100" }

function OptionE() {
  return (
    <section id="option-e">
      <div className="bg-indigo-900 px-6 py-6 text-center lg:px-8">
        <p style={light} className="text-sm uppercase tracking-[0.3em] text-indigo-300">Option E</p>
        <h2 style={thin} className="mt-2 text-3xl text-white sm:text-4xl">&ldquo;Northern Light&rdquo;</h2>
        <p style={light} className="mx-auto mt-2 max-w-xl text-sm text-indigo-400">
          Ultra-modern. Deep indigo + lavender + ice. Thin font weights, wide letter-spacing,
          glassmorphism cards, celestial cool-tone palette.
        </p>
      </div>

      {/* Hero — deep indigo gradient */}
      <div className="relative overflow-hidden bg-indigo-900">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/30 blur-[128px]" />
          <div className="absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-400/20 blur-[128px]" />
        </div>
        <Container className="relative py-32 sm:py-40 lg:py-56">
          <FadeIn>
            <div className="mx-auto max-w-4xl">
              <p style={light} className="text-sm uppercase tracking-[0.4em] text-indigo-300">
                Bahá&apos;í &middot; Winnipeg
              </p>
              <h1 style={thin} className="mt-6 text-5xl leading-[1.1] text-white sm:text-7xl lg:text-[5.5rem]">
                One earth.<br />One people.<br />One purpose.
              </h1>
              <p style={light} className="mt-8 max-w-xl text-lg leading-relaxed text-indigo-200">
                The Bahá&apos;í Community of Winnipeg welcomes everyone seeking
                connection, meaning, and a shared path toward unity.
              </p>
              <div className="mt-12 flex gap-4">
                <span
                  style={light}
                  className="inline-flex rounded-full bg-white px-6 py-2.5 text-sm tracking-wide text-indigo-900"
                >
                  Explore
                </span>
                <span
                  style={light}
                  className="inline-flex rounded-full border border-white/20 px-6 py-2.5 text-sm tracking-wide text-white backdrop-blur"
                >
                  Events
                </span>
              </div>
            </div>
          </FadeIn>
        </Container>
        {/* Hero image strip */}
        <div className="relative h-64 overflow-hidden sm:h-80">
          <OptimizedImage src={imageWinter} alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-transparent to-ice" />
        </div>
      </div>

      {/* Content — ice background with glass cards */}
      <div className="bg-ice py-24 sm:py-32">
        <Container>
          <FadeIn>
            <p style={light} className="text-sm uppercase tracking-[0.3em] text-indigo-500">Community life</p>
            <h2 style={thin} className="mt-4 text-3xl text-indigo-900 sm:text-4xl">
              Spaces for the spirit
            </h2>
          </FadeIn>
          <FadeInStagger className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {activities.map((item) => (
              <FadeIn key={item.title} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-indigo-100 bg-white/60 p-8 backdrop-blur transition hover:border-indigo-300 hover:bg-white/80">
                  <div className="relative mb-6 h-40 overflow-hidden rounded-2xl">
                    <OptimizedImage
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-indigo-900/10" />
                  </div>
                  <h3 style={light} className="text-xl text-indigo-900">{item.title}</h3>
                  <p style={light} className="mt-2 flex-1 text-sm leading-relaxed text-indigo-700">
                    {item.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <div className="h-px flex-auto bg-indigo-100" />
                    <span style={light} className="text-xs uppercase tracking-[0.2em] text-indigo-400">
                      Learn more
                    </span>
                  </div>
                </article>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>

        {/* Quote — floating glass panel */}
        <Container className="mt-24">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-indigo-900 px-8 py-20 sm:px-16">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-indigo-600/30 blur-[100px]" />
              <figure className="relative mx-auto max-w-3xl">
                <blockquote>
                  <p style={thin} className="text-center text-3xl leading-relaxed text-white sm:text-4xl">
                    &ldquo;So powerful is the light of unity that it can
                    illuminate the whole earth.&rdquo;
                  </p>
                </blockquote>
                <figcaption style={light} className="mt-10 text-center text-sm uppercase tracking-[0.3em] text-indigo-300">
                  Bahá&apos;u&apos;lláh
                </figcaption>
              </figure>
            </div>
          </FadeIn>
        </Container>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   OPTION F — "Heartland"
   Terracotta + sage green + warm beige.
   Rounded, friendly, handcrafted feel.
   Mixed serif headings + sans body. Organic shapes.
   ════════════════════════════════════════════════════════════════ */

const heartlandHeading = { fontFamily: 'Georgia, "Noto Serif", serif', fontWeight: 400 }
const heartlandBody = { fontFamily: 'Mona Sans, system-ui, sans-serif', fontWeight: 400, fontVariationSettings: "'wdth' 90" }

function OptionF() {
  return (
    <section id="option-f">
      <div className="bg-terra-800 px-6 py-6 text-center lg:px-8">
        <p style={heartlandBody} className="text-sm uppercase tracking-[0.2em] text-terra-300">Option F</p>
        <h2 style={heartlandHeading} className="mt-2 text-3xl text-white sm:text-4xl">&ldquo;Heartland&rdquo;</h2>
        <p style={heartlandBody} className="mx-auto mt-2 max-w-xl text-sm text-terra-300">
          Terracotta + sage green. Rounded, friendly, handcrafted.
          Mixed serif headings + narrow sans body. Organic, communal warmth.
        </p>
      </div>

      {/* Hero — split with large rounded image and warm text */}
      <div className="bg-sand">
        <Container className="py-16 sm:py-24 lg:py-32">
          <div className="lg:flex lg:items-center lg:gap-x-16">
            <FadeIn className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 rounded-full bg-sage-100 px-4 py-1.5 text-sm text-sage-700 ring-1 ring-sage-200">
                <span className="h-2 w-2 rounded-full bg-sage-400" />
                <span style={heartlandBody}>Winnipeg, Manitoba</span>
              </div>
              <h1 style={heartlandHeading} className="mt-8 text-4xl leading-tight text-terra-900 sm:text-5xl lg:text-6xl">
                Welcome to the Bahá&apos;í community
              </h1>
              <p style={heartlandBody} className="mt-6 text-lg leading-relaxed text-terra-700">
                A warm, diverse community on the prairies, united in building a
                world where every person belongs. Come as you are — everyone is
                welcome at our table.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <span
                  style={heartlandBody}
                  className="inline-flex rounded-full bg-terra-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-terra-600"
                >
                  Join a Gathering
                </span>
                <span
                  style={heartlandBody}
                  className="inline-flex rounded-full bg-sage-100 px-6 py-3 text-sm font-semibold text-sage-800 ring-1 ring-sage-200 transition hover:bg-sage-200"
                >
                  Learn About Us
                </span>
              </div>
            </FadeIn>
            <FadeIn className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem]">
                  <OptimizedImage src={imageCommunityGathering} alt="" className="aspect-4/3 w-full object-cover" />
                </div>
                {/* Decorative floating badge */}
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-neutral-950/5 sm:-bottom-6 sm:-left-6 sm:p-6">
                  <p style={heartlandBody} className="text-xs uppercase tracking-widest text-terra-500">Est.</p>
                  <p style={heartlandHeading} className="text-3xl text-terra-900 sm:text-4xl">1900s</p>
                  <p style={heartlandBody} className="text-xs text-terra-600">Winnipeg</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>

      {/* Content — warm cards with rounded everything */}
      <div className="bg-white py-24 sm:py-32">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4">
              <span className="h-3 w-3 rounded-full bg-terra-400" />
              <span className="h-3 w-3 rounded-full bg-sage-400" />
              <span className="h-3 w-3 rounded-full bg-gold-400" />
            </div>
            <h2 style={heartlandHeading} className="mt-6 text-3xl text-terra-900 sm:text-4xl">
              Ways to connect
            </h2>
            <p style={heartlandBody} className="mt-4 max-w-2xl text-base text-terra-600">
              Our community comes together in many ways — all of them open to everyone.
            </p>
          </FadeIn>
          <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {activities.map((item, i) => {
              const accents = [
                { bg: 'bg-terra-50', ring: 'ring-terra-200', dot: 'bg-terra-400', text: 'text-terra-700' },
                { bg: 'bg-sage-50', ring: 'ring-sage-200', dot: 'bg-sage-400', text: 'text-sage-700' },
                { bg: 'bg-gold-50', ring: 'ring-gold-200', dot: 'bg-gold-400', text: 'text-gold-700' },
              ][i]
              return (
                <FadeIn key={item.title} className="flex">
                  <article className={`group relative flex w-full flex-col overflow-hidden rounded-[1.5rem] ${accents.bg} p-6 ring-1 ${accents.ring} transition hover:shadow-md`}>
                    <div className="relative mb-6 h-44 overflow-hidden rounded-[1rem]">
                      <OptimizedImage
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover saturate-[0.85] transition duration-500 group-hover:saturate-100 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${accents.dot}`} />
                      <h3 style={heartlandHeading} className="text-lg text-terra-900">{item.title}</h3>
                    </div>
                    <p style={heartlandBody} className="mt-3 flex-1 text-sm leading-relaxed text-terra-600">
                      {item.desc}
                    </p>
                    <p style={heartlandBody} className={`mt-4 text-sm font-semibold ${accents.text}`}>
                      Come join us &rarr;
                    </p>
                  </article>
                </FadeIn>
              )
            })}
          </FadeInStagger>
        </Container>

        {/* Quote — warm full-width band */}
        <div className="mt-24 bg-terra-50 py-16 sm:py-24">
          <Container>
            <FadeIn>
              <figure className="mx-auto max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-1 rounded-full bg-terra-400" />
                  <span className="h-8 w-1 rounded-full bg-sage-400" />
                </div>
                <blockquote className="mt-8">
                  <p style={heartlandHeading} className="text-2xl leading-relaxed text-terra-900 sm:text-3xl">
                    &ldquo;So powerful is the light of unity that it can illuminate the whole earth.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <div className="h-px w-8 bg-terra-300" />
                  <span style={heartlandBody} className="text-sm text-terra-500">
                    Bahá&apos;u&apos;lláh
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          </Container>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   PAGE SHELL
   ════════════════════════════════════════════════════════════════ */

function TableOfContents() {
  return (
    <div className="bg-neutral-950 py-16">
      <Container>
        <FadeIn className="text-center">
          <h1 className="font-display text-4xl font-medium text-white sm:text-5xl">
            Style Showcase
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
            Six visual directions for the Bahá&apos;í Community of Winnipeg
            website. A–C stay closer to the template; D–F break much further
            with different typography, color, and texture. Scroll to compare.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#option-a" className="rounded-full bg-gold-400/20 px-4 py-2 text-sm font-semibold text-gold-300 ring-1 ring-gold-400/30 transition hover:bg-gold-400/30">
              A: Prairie Warmth
            </a>
            <a href="#option-b" className="rounded-full bg-teal-400/20 px-4 py-2 text-sm font-semibold text-teal-300 ring-1 ring-teal-400/30 transition hover:bg-teal-400/30">
              B: Contemplative
            </a>
            <a href="#option-c" className="rounded-full bg-gold-300/20 px-4 py-2 text-sm font-semibold text-gold-200 ring-1 ring-gold-300/30 transition hover:bg-gold-300/30">
              C: Gathering Place
            </a>
            <a href="#option-d" className="rounded-full bg-burgundy-400/20 px-4 py-2 text-sm font-semibold text-burgundy-200 ring-1 ring-burgundy-400/30 transition hover:bg-burgundy-400/30">
              D: Lotus &amp; Stone
            </a>
            <a href="#option-e" className="rounded-full bg-indigo-400/20 px-4 py-2 text-sm font-semibold text-indigo-300 ring-1 ring-indigo-400/30 transition hover:bg-indigo-400/30">
              E: Northern Light
            </a>
            <a href="#option-f" className="rounded-full bg-terra-400/20 px-4 py-2 text-sm font-semibold text-terra-200 ring-1 ring-terra-400/30 transition hover:bg-terra-400/30">
              F: Heartland
            </a>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Style Showcase',
  description: 'Visual direction options for the Bahá\'í Community of Winnipeg website.',
}

export default function Showcase() {
  return (
    <RootLayout>
      <TableOfContents />
      <OptionA />
      <OptionB />
      <OptionC />
      <OptionD />
      <OptionE />
      <OptionF />
    </RootLayout>
  )
}
