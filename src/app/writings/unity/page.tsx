import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "O ye discerning ones \u2014 Bah\u00e1'u'll\u00e1h",
  description:
    "O ye discerning ones! Verily, the words which have descended from the heaven of the Will of God are the source of unity and harmony for the world.",
}

export default function UnityQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/unity-three-streams-01_00001_.png"
            alt=""
            className="mx-auto mb-12"
          />

          <figure>
            <blockquote>
              <p className="font-display text-2xl font-normal leading-relaxed text-burgundy-900 sm:text-3xl lg:text-4xl">
                &ldquo;O ye discerning ones! Verily, the words which have
                descended from the heaven of the Will of God are the source of
                unity and harmony for the world. Close your eyes to racial
                differences, and welcome all with the light of
                oneness.&rdquo;
              </p>
            </blockquote>

            <div className="mx-auto my-8 h-px w-16 bg-gold-400" />

            <figcaption className="font-display text-sm uppercase tracking-[0.2em] text-burgundy-500">
              Bahá&apos;u&apos;lláh
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 h-px w-20 bg-gold-500" />
        </div>
      </div>
    </StandalonePage>
  )
}
