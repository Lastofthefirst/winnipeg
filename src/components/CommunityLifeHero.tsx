import Link from 'next/link'
import { FadeIn } from '@/components/FadeIn'
import { OptimizedImage } from '@/components/OptimizedImage'
import type { Locale } from '@/i18n/types'

const heroImages = [
  { src: '/community-hero/DSC02517.jpeg', alt: 'Community gathering', accent: 'bottom-left' },
  { src: '/community-hero/DSC02496.jpeg', alt: 'Community activity' },
  { src: '/community-hero/DSC02489.jpeg', alt: 'Community members together' },
  { src: '/community-hero/DSC02464.jpeg', alt: 'Group gathering', accent: 'top-right' },
  { src: '/community-hero/DSC02373.jpeg', alt: 'Community event', accent: 'bottom-right' },
]

function PhotoColumn({
  images,
  className = '',
  staggerDelay = 0,
}: {
  images: typeof heroImages
  className?: string
  staggerDelay?: number
}) {
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {images.map((image, index) => (
        <FadeIn
          key={image.src}
          className="w-44 flex-none sm:w-48 lg:w-52"
          transition={{ delay: staggerDelay + index * 0.1 }}
        >
          <div className="relative">
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              width={400}
              height={600}
              className="aspect-[2/3] w-full object-cover"
            />
            {image.accent === 'top-left' && (
              <div
                aria-hidden="true"
                className="absolute -left-1 -top-1 h-14 w-14 border-l border-t border-burgundy-900"
              />
            )}
            {image.accent === 'top-right' && (
              <div
                aria-hidden="true"
                className="absolute -right-1 -top-1 h-14 w-14 border-r border-t border-burgundy-900"
              />
            )}
            {image.accent === 'bottom-left' && (
              <div
                aria-hidden="true"
                className="absolute -bottom-1 -left-1 h-14 w-14 border-b border-l border-burgundy-900"
              />
            )}
            {image.accent === 'bottom-right' && (
              <div
                aria-hidden="true"
                className="absolute -bottom-1 -right-1 h-14 w-14 border-b border-r border-burgundy-900"
              />
            )}
          </div>
        </FadeIn>
      ))}
    </div>
  )
}

export function CommunityLifeHero({
  eyebrow,
  heading,
  intro,
  locale,
}: {
  eyebrow: string
  heading: string
  intro: string
  locale: Locale
}) {
  const leftImages = [heroImages[0]]
  const centerImages = [heroImages[1], heroImages[2]]
  const rightImages = [heroImages[3], heroImages[4]]

  return (
    <div className="relative isolate overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '6rem 6rem',
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-28 lg:px-8 lg:pb-12 lg:pt-32">
        <div className="lg:flex lg:items-start lg:gap-x-16">
          {/* Text content */}
          <div className="lg:w-1/2 lg:shrink-0">
            <FadeIn>
              <div className="mb-4 h-px w-12 bg-gold-500" />
              <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-600">
                {eyebrow}
              </p>
              <h1 className="mt-6 font-display text-4xl font-normal leading-tight tracking-tight text-burgundy-900 sm:text-5xl lg:text-6xl">
                {heading}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-burgundy-700">
                {intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/${locale}/community-life#devotional-meetings`}
                  className="inline-flex border border-burgundy-900 bg-burgundy-900 px-8 py-3 text-sm uppercase tracking-widest text-ivory transition hover:bg-burgundy-800"
                >
                  Activities
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex border border-burgundy-300 px-8 py-3 text-sm uppercase tracking-widest text-burgundy-700 transition hover:bg-burgundy-50"
                >
                  Get in Touch
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Photo columns — DOM order uses lg:order-* to control visual position */}
          <div className="mt-12 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
            {/* 1-image column — visually right on desktop via lg:order-last */}
            <PhotoColumn
              images={leftImages}
              className="ml-auto pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80"
              staggerDelay={0.2}
            />

            {/* 2-image column — visually center on desktop */}
            <PhotoColumn
              images={centerImages}
              className="mr-auto sm:mr-0 sm:pt-52 lg:pt-36"
              staggerDelay={0.1}
            />

            {/* 2-image column — visually left on desktop */}
            <PhotoColumn
              images={rightImages}
              className="pt-32 sm:pt-20"
              staggerDelay={0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
