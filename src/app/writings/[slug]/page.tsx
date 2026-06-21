import { notFound } from 'next/navigation'
import { type Metadata } from 'next'
import writingsData from '@/../content/cms/writings.json'
import { StandaloneImage, StandalonePage } from '@/components/StandalonePage'

type WritingsEntry = {
  slug: string
  passage: string
  source: string
  language: string
  image: string
}

const writings = writingsData as WritingsEntry[]

export function generateStaticParams() {
  return writings.map((w) => ({ slug: w.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = writings.find((w) => w.slug === params.slug)
  if (!entry) return { title: 'Writing not found' }

  const shortPassage = entry.passage.length < 200 ? entry.passage : entry.passage.slice(0, 120) + '…'
  return {
    title: `${shortPassage} — ${entry.source}`,
    description: shortPassage,
  }
}

export default function WritingPage({ params }: { params: { slug: string } }) {
  const entry = writings.find((w) => w.slug === params.slug)
  if (!entry) {
    notFound()
    return null
  }

  const { passage, source, image } = entry
  // Long passages get smaller text
  const isLong = passage.length >= 200
  const textSize = isLong
    ? 'text-lg sm:text-xl lg:text-2xl'
    : 'text-2xl sm:text-3xl lg:text-4xl'

  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-12 h-px w-20 bg-gold-500" />

          <StandaloneImage
            src={`/writings-nature/${image}`}
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className={`font-display font-normal leading-relaxed text-burgundy-900 ${textSize}`}>
                {passage}
              </p>
            </blockquote>

            <div className="mx-auto my-8 h-px w-16 bg-gold-400" />

            <figcaption className="font-display text-sm uppercase tracking-[0.2em] text-burgundy-500">
              {source}
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 h-px w-20 bg-gold-500" />
        </div>
      </div>
    </StandalonePage>
  )
}
