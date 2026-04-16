import { type Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { OptimizedImage } from '@/components/OptimizedImage'
import { RootLayout } from '@/components/RootLayout'

export const metadata: Metadata = {
  title: 'Background Art Trial',
  description: 'Testing seamless background art elements',
}

// Page theme assignments
const pageThemes = {
  home: { name: 'Prairie', icon: 'prairie-grass' },
  about: { name: 'Prairie', icon: 'wheat-stalk' },
  'community-life': { name: 'Garden', icon: 'rose-bloom' },
  'learn-more': { name: 'River', icon: 'river-stones' },
  events: { name: 'Forest', icon: 'birch-branch' },
  news: { name: 'Marsh', icon: 'cattail' },
}

// Nav button with corner art decoration
function NavButtonWithArt({
  label,
  theme,
  artSrc,
}: {
  label: string
  theme: string
  artSrc?: string
}) {
  return (
    <div className="group relative isolate overflow-hidden bg-burgundy-900 px-6 py-10">
      <span className="font-display text-3xl font-medium tracking-tight text-parchment">
        {label}
      </span>
      <span className="mt-2 block text-sm text-burgundy-300">{theme} theme</span>

      {/* Corner art decoration */}
      {artSrc ? (
        <OptimizedImage
          src={artSrc}
          alt=""
          width={80}
          height={80}
          className="absolute right-2 bottom-2 opacity-60 transition-opacity group-hover:opacity-100"
        />
      ) : (
        <div className="absolute right-2 bottom-2 flex h-16 w-16 items-center justify-center rounded border border-dashed border-parchment/30">
          <span className="text-xs text-parchment/50">art</span>
        </div>
      )}

      <span className="absolute inset-y-0 -z-10 w-screen bg-burgundy-800 opacity-0 transition group-hover:opacity-100" />
    </div>
  )
}

// Scattered overlay component for floating elements
function ScatteredOverlay({
  src,
  className = '',
  theme,
}: {
  src?: string
  className?: string
  theme: string
}) {
  if (!src) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 -z-5 flex items-center justify-center ${className}`}
      >
        <div className="rounded-lg border-2 border-dashed border-burgundy-200 bg-burgundy-50/20 px-4 py-2">
          <span className="text-sm text-burgundy-400">
            {theme} scattered elements
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-5 overflow-hidden ${className}`}
    >
      <OptimizedImage
        src={src}
        alt=""
        fill
        className="object-cover opacity-40"
        style={{ objectPosition: 'top' }}
      />
    </div>
  )
}

// Placeholder component for background art - swap src to test different images
function BackgroundArt({
  src,
  alt = '',
  className = '',
  position = 'right',
}: {
  src?: string
  alt?: string
  className?: string
  position?: 'left' | 'right' | 'center'
}) {
  const positionClasses = {
    left: '-left-20 lg:-left-40',
    right: '-right-20 lg:-right-40',
    center: 'left-1/2 -translate-x-1/2',
  }

  if (!src) {
    // Placeholder when no image
    return (
      <div
        className={`absolute ${positionClasses[position]} pointer-events-none -z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-burgundy-200 bg-burgundy-50/30 ${className}`}
      >
        <span className="text-sm text-burgundy-400">Background Art</span>
      </div>
    )
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={`absolute ${positionClasses[position]} pointer-events-none -z-10 object-contain ${className}`}
    />
  )
}

function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background art slots - using clean (rembg) versions */}
      <BackgroundArt
        position="right"
        className="top-10 h-[400px] w-[500px] opacity-70"
        src="/background-art-clean/ribbon-burgundy-01.png"
      />
      <BackgroundArt
        position="left"
        className="bottom-0 h-[300px] w-[400px] opacity-60"
        src="/background-art-clean/flourish-persian-01.png"
      />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 h-px w-20 bg-gold-500" />
            <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-600">
              Background Art Trial
            </p>
            <h1 className="mt-6 font-display text-4xl font-normal tracking-tight text-burgundy-900 sm:text-5xl lg:text-6xl">
              Testing seamless artwork integration
            </h1>
            <p className="mt-6 text-lg text-burgundy-600">
              This page demonstrates how painterly background art can add depth
              and elegance when placed on a flat color background.
            </p>
            <div className="mx-auto mt-8 h-px w-20 bg-gold-500" />
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function SectionWithSideArt() {
  return (
    <div className="relative mt-24 overflow-hidden sm:mt-32">
      {/* Right side art */}
      <BackgroundArt
        position="right"
        className="top-0 h-[600px] w-[500px] opacity-80"
        src="/background-art-clean/river-confluence-01.png"
      />

      <Container>
        <FadeIn>
          <div className="max-w-2xl">
            <div className="mb-4 h-px w-12 bg-burgundy-300" />
            <h2 className="font-display text-3xl font-normal text-burgundy-900">
              Side-positioned artwork
            </h2>
            <div className="mt-6 space-y-4 text-base text-burgundy-700">
              <p>
                Background art positioned to the side creates visual interest
                without competing with the main content. The artwork should fade
                seamlessly into the background color at its edges.
              </p>
              <p>
                This approach works well for sections with left-aligned text,
                allowing the art to fill the negative space on the opposite
                side.
              </p>
              <p>
                The key is matching the exact background color (#F5EFE3 parchment)
                so there&apos;s no visible boundary between the art and the page.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function SectionWithTopArt() {
  return (
    <div className="relative mt-24 overflow-hidden sm:mt-32">
      {/* Top center art */}
      <BackgroundArt
        position="center"
        className="-top-20 h-[400px] w-[800px] opacity-50"
        src="/background-art/light-rays-01_00001_.png"
      />

      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-gold-500" />
            <h2 className="font-display text-3xl font-normal text-burgundy-900">
              Centered overhead artwork
            </h2>
            <p className="mt-6 text-base text-burgundy-700">
              Artwork positioned above centered content can create a sense of
              illumination or blessing. Light rays, feathers, or gentle curves
              work well in this position.
            </p>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function QuoteWithArt() {
  return (
    <div className="relative mt-24 overflow-hidden py-16 sm:mt-32">
      {/* Background art behind quote */}
      <BackgroundArt
        position="center"
        className="top-1/2 h-[500px] w-[700px] -translate-y-1/2 opacity-50"
        src="/background-art-clean/lotus-bloom-01.png"
      />

      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-3xl">
            <blockquote className="relative text-center">
              <p className="font-display text-2xl italic text-burgundy-800 sm:text-3xl">
                &ldquo;So powerful is the light of unity that it can illuminate
                the whole earth.&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-8 text-center">
              <div className="mx-auto h-px w-12 bg-gold-500" />
              <p className="mt-4 font-display text-sm uppercase tracking-widest text-burgundy-600">
                Bahá&apos;u&apos;lláh
              </p>
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  )
}

function SectionWithDualArt() {
  return (
    <div className="relative mt-24 overflow-hidden sm:mt-32">
      {/* Left art */}
      <BackgroundArt
        position="left"
        className="top-10 h-[400px] w-[350px] opacity-70"
        src="/background-art-clean/prairie-grass-01.png"
      />
      {/* Right art */}
      <BackgroundArt
        position="right"
        className="bottom-10 h-[400px] w-[350px] opacity-70"
        src="/background-art-clean/wheat-stalks-01.png"
      />

      <Container>
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-4 h-px w-12 bg-burgundy-300" />
            <h2 className="font-display text-3xl font-normal text-burgundy-900">
              Dual artwork framing
            </h2>
            <p className="mt-6 text-base text-burgundy-700">
              Complementary artwork on both sides can frame content elegantly.
              This works especially well with mirrored or thematically paired
              pieces—like prairie grasses and wheat stalks for a Manitoba feel.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              <div className="border-t border-burgundy-200 pt-6">
                <p className="font-display text-4xl text-burgundy-900">100+</p>
                <p className="mt-2 text-sm text-burgundy-600">Years in Winnipeg</p>
              </div>
              <div className="border-t border-burgundy-200 pt-6">
                <p className="font-display text-4xl text-burgundy-900">Unity</p>
                <p className="mt-2 text-sm text-burgundy-600">In diversity</p>
              </div>
              <div className="border-t border-burgundy-200 pt-6">
                <p className="font-display text-4xl text-burgundy-900">Open</p>
                <p className="mt-2 text-sm text-burgundy-600">To all seekers</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function FullWidthArtSection() {
  return (
    <div className="relative mt-24 overflow-hidden py-20 sm:mt-32">
      {/* Full-width subtle background */}
      <BackgroundArt
        position="center"
        className="top-0 h-full w-[1400px] opacity-30"
        src="/background-art/watercolor-blend-01_00001_.png"
      />

      <Container>
        <FadeIn>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 h-px w-12 bg-gold-500" />
              <h2 className="font-display text-3xl font-normal text-burgundy-900">
                Full-width subtle background
              </h2>
              <p className="mt-6 text-base text-burgundy-700">
                Very low opacity artwork spanning the full width creates
                atmosphere without overwhelming. Watercolor washes and abstract
                forms work beautifully here.
              </p>
            </div>
            <div>
              <p className="text-base text-burgundy-700">
                The art becomes almost like a texture—adding warmth and depth
                while remaining subordinate to the content. This technique works
                well for longer reading sections or areas where you want subtle
                visual interest.
              </p>
              <p className="mt-4 text-base text-burgundy-700">
                Consider using complementary colors like dusty blue with burgundy
                accents for these full-width pieces.
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function NavDecorationsTrial() {
  return (
    <div className="mt-24 sm:mt-32">
      <Container>
        <FadeIn>
          <div className="mb-4 h-px w-12 bg-gold-500" />
          <h2 className="font-display text-3xl font-normal text-burgundy-900">
            Nav button corner art
          </h2>
          <p className="mt-4 max-w-2xl text-base text-burgundy-700">
            Each nav button gets a small themed icon in the bottom-right corner.
            These should be ~80x80px, cream/gold on burgundy background.
          </p>

          {/* Nav buttons grid */}
          <div className="mt-10 grid gap-px bg-burgundy-800 sm:grid-cols-2 lg:grid-cols-3">
            <NavButtonWithArt label="Home" theme="Prairie" />
            <NavButtonWithArt label="About" theme="Prairie" />
            <NavButtonWithArt label="Community Life" theme="Garden" />
            <NavButtonWithArt label="Learn More" theme="River" />
            <NavButtonWithArt label="Events" theme="Forest" />
            <NavButtonWithArt label="News" theme="Marsh" />
          </div>

          {/* Nav bottom strip */}
          <div className="mt-12 mb-4 h-px w-12 bg-burgundy-300" />
          <h3 className="font-display text-2xl font-normal text-burgundy-900">
            Nav bottom strip
          </h3>
          <p className="mt-4 max-w-2xl text-base text-burgundy-700">
            A decorative horizontal element at the bottom of the nav drawer.
            Should be ~1400x100px, fade to transparent at top.
          </p>

          <div className="relative mt-8 h-32 overflow-hidden rounded-lg bg-burgundy-900">
            {/* Placeholder for nav bottom art */}
            <div className="absolute inset-x-0 bottom-0 flex h-24 items-center justify-center border-t border-dashed border-parchment/30">
              <span className="text-sm text-parchment/50">
                nav-bottom-prairie-horizon.png (1400x100)
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function ScatteredElementsTrial() {
  const themes = [
    {
      name: 'Prairie',
      page: 'Home / About',
      elements: 'dandelion wisps, grass seeds, wheat chaff',
    },
    {
      name: 'Garden',
      page: 'Community Life',
      elements: 'rose petals, flower petals, butterflies',
    },
    {
      name: 'River',
      page: 'Learn More',
      elements: 'water droplets, floating leaves',
    },
    {
      name: 'Forest',
      page: 'Events',
      elements: 'autumn leaves, pine needles, fireflies',
    },
    {
      name: 'Winter',
      page: 'Seasonal',
      elements: 'snowflakes, frost crystals',
    },
    {
      name: 'Marsh',
      page: 'News',
      elements: 'cattail fluff, dragonflies',
    },
  ]

  return (
    <div className="mt-24 sm:mt-32">
      <Container>
        <FadeIn>
          <div className="mb-4 h-px w-12 bg-gold-500" />
          <h2 className="font-display text-3xl font-normal text-burgundy-900">
            Scattered overlay elements
          </h2>
          <p className="mt-4 max-w-2xl text-base text-burgundy-700">
            Floating elements that drift across page sections. Each theme has
            unique elements. These can be animated with CSS for subtle movement.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <div
                key={theme.name}
                className="relative overflow-hidden rounded-lg border border-burgundy-200 bg-[#F5EFE3] p-6"
              >
                <ScatteredOverlay theme={theme.name} className="opacity-40" />
                <div className="relative">
                  <h3 className="font-display text-lg text-burgundy-900">
                    {theme.name}
                  </h3>
                  <p className="mt-1 text-sm text-burgundy-600">{theme.page}</p>
                  <p className="mt-4 text-sm text-burgundy-500">
                    {theme.elements}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function PageThemeOverview() {
  const pages = [
    {
      name: 'Home',
      path: '/',
      theme: 'Prairie',
      hero: 'Wide prairie sky, wheat fields',
      sides: 'Prairie grass, wildflowers',
      scattered: 'Dandelion wisps',
    },
    {
      name: 'About',
      path: '/about',
      theme: 'Prairie',
      hero: 'Golden wheat, big sky',
      sides: 'Wheat stalks, prairie crocus',
      scattered: 'Floating seeds',
    },
    {
      name: 'Community Life',
      path: '/community-life',
      theme: 'Garden',
      hero: 'Rose garden, arbor',
      sides: 'Sunflowers, butterflies',
      scattered: 'Rose petals falling',
    },
    {
      name: 'Learn More',
      path: '/learn-more',
      theme: 'River',
      hero: 'Flowing river confluence',
      sides: 'River stones, heron',
      scattered: 'Water droplets',
    },
    {
      name: 'Events',
      path: '/events',
      theme: 'Forest',
      hero: 'Birch grove, forest edge',
      sides: 'Pine branches, owl',
      scattered: 'Autumn leaves',
    },
    {
      name: 'News',
      path: '/news',
      theme: 'Marsh',
      hero: 'Cattails, water lilies',
      sides: 'Dragonflies, reeds',
      scattered: 'Cattail fluff',
    },
  ]

  return (
    <div className="mt-24 sm:mt-32">
      <Container>
        <FadeIn>
          <div className="mb-4 h-px w-12 bg-gold-500" />
          <h2 className="font-display text-3xl font-normal text-burgundy-900">
            Page theme assignments
          </h2>
          <p className="mt-4 max-w-2xl text-base text-burgundy-700">
            Each page gets a unique Winnipeg habitat theme. Elements are chosen
            like frames from a continuous scene within that habitat.
          </p>

          <div className="mt-10 overflow-hidden rounded-lg border border-burgundy-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-burgundy-50">
                <tr>
                  <th className="px-4 py-3 font-display font-medium text-burgundy-900">
                    Page
                  </th>
                  <th className="px-4 py-3 font-display font-medium text-burgundy-900">
                    Theme
                  </th>
                  <th className="hidden px-4 py-3 font-display font-medium text-burgundy-900 md:table-cell">
                    Hero Art
                  </th>
                  <th className="hidden px-4 py-3 font-display font-medium text-burgundy-900 lg:table-cell">
                    Side Art
                  </th>
                  <th className="hidden px-4 py-3 font-display font-medium text-burgundy-900 lg:table-cell">
                    Scattered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-burgundy-100">
                {pages.map((page) => (
                  <tr key={page.path} className="hover:bg-burgundy-50/50">
                    <td className="px-4 py-3">
                      <Link
                        href={page.path}
                        className="font-medium text-burgundy-900 hover:text-burgundy-600"
                      >
                        {page.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-burgundy-600">
                      {page.theme}
                    </td>
                    <td className="hidden px-4 py-3 text-burgundy-500 md:table-cell">
                      {page.hero}
                    </td>
                    <td className="hidden px-4 py-3 text-burgundy-500 lg:table-cell">
                      {page.sides}
                    </td>
                    <td className="hidden px-4 py-3 text-burgundy-500 lg:table-cell">
                      {page.scattered}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

function ArtGallery() {
  // Clean versions (rembg + parchment composite)
  const cleanArtworks = [
    '/background-art-clean/ribbon-burgundy-01.png',
    '/background-art-clean/ribbon-burgundy-02.png',
    '/background-art-clean/ribbon-dual-01.png',
    '/background-art-clean/ribbon-vertical-01.png',
    '/background-art-clean/river-confluence-01.png',
    '/background-art-clean/river-flow-01.png',
    '/background-art-clean/river-unity-01.png',
    '/background-art-clean/prairie-grass-01.png',
    '/background-art-clean/prairie-vertical-01.png',
    '/background-art-clean/wheat-stalks-01.png',
    '/background-art-clean/lotus-petals-01.png',
    '/background-art-clean/lotus-bloom-01.png',
    '/background-art-clean/petals-falling-01.png',
    '/background-art-clean/flourish-persian-01.png',
  ]

  // Original generated images for comparison
  const artworks = [
    '/background-art-v2/ribbon-burgundy-01_00001_.png',
    '/background-art-v2/ribbon-burgundy-02_00001_.png',
    '/background-art-v2/ribbon-dual-01_00001_.png',
    '/background-art-v2/ribbon-vertical-01_00001_.png',
    '/background-art-v2/river-confluence-01_00001_.png',
    '/background-art-v2/river-flow-01_00001_.png',
    '/background-art-v2/river-unity-01_00001_.png',
    '/background-art-v2/prairie-grass-01_00001_.png',
    '/background-art-v2/prairie-vertical-01_00001_.png',
    '/background-art-v2/wheat-stalks-01_00001_.png',
    '/background-art-v2/lotus-petals-01_00001_.png',
    '/background-art-v2/lotus-bloom-01_00001_.png',
    '/background-art-v2/petals-falling-01_00001_.png',
    '/background-art-v2/flourish-persian-01_00001_.png',
    '/background-art/flourish-gold-01_00001_.png',
    '/background-art/arabesque-01_00001_.png',
    '/background-art/watercolor-blend-01_00001_.png',
    '/background-art/watercolor-clouds-01_00001_.png',
    '/background-art/watercolor-sunset-01_00001_.png',
    '/background-art/light-rays-01_00001_.png',
    '/background-art/light-beams-vertical-01_00001_.png',
    '/background-art/star-rays-01_00001_.png',
    '/background-art/feathers-cream-01_00001_.png',
    '/background-art/feathers-burgundy-01_00001_.png',
    '/background-art/clouds-wispy-01_00001_.png',
    '/background-art/circles-unity-01_00001_.png',
    '/background-art/botanical-wildflowers-01_00001_.png',
    '/background-art/botanical-branch-01_00001_.png',
    '/background-art/abstract-complement-01_00001_.png',
    '/background-art/fabric-cream-01_00001_.png',
  ]

  return (
    <div className="mt-24 sm:mt-32">
      <Container>
        <FadeIn>
          {/* Clean versions section */}
          <div className="mb-4 h-px w-12 bg-gold-500" />
          <h2 className="font-display text-3xl font-normal text-burgundy-900">
            Clean artwork (rembg + parchment)
          </h2>
          <p className="mt-4 text-base text-burgundy-700">
            Background removed with rembg, then composited onto exact parchment color (#F5EFE3).
            These should blend seamlessly with the page.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cleanArtworks.map((src, i) => (
              <a
                key={i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-burgundy-200 bg-[#F5EFE3]"
              >
                <OptimizedImage
                  src={src}
                  alt={`Clean artwork ${i + 1}`}
                  fill
                  className="object-contain transition group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-900/80 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                  <p className="text-sm text-white">{src.split('/').pop()}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Original versions section */}
          <div className="mt-20 mb-4 h-px w-12 bg-burgundy-300" />
          <h2 className="font-display text-3xl font-normal text-burgundy-900">
            Original generated artwork
          </h2>
          <p className="mt-4 text-base text-burgundy-700">
            Direct output from image generation. Compare with clean versions above.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((src, i) => (
              <a
                key={i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-burgundy-200 bg-[#F5EFE3]"
              >
                <OptimizedImage
                  src={src}
                  alt={`Artwork ${i + 1}`}
                  fill
                  className="object-contain transition group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-burgundy-900/80 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                  <p className="text-sm text-white">{src.split('/').pop()}</p>
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}

export default function BackgroundArtTrial() {
  return (
    <RootLayout>
      <HeroSection />

      {/* New trial sections */}
      <PageThemeOverview />
      <NavDecorationsTrial />
      <ScatteredElementsTrial />

      {/* Existing placement trials */}
      <SectionWithSideArt />
      <SectionWithTopArt />
      <QuoteWithArt />
      <SectionWithDualArt />
      <FullWidthArtSection />
      <ArtGallery />

      {/* Spacer */}
      <div className="h-24" />
    </RootLayout>
  )
}
