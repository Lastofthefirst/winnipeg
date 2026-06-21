import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "These Prophets and chosen Ones of God \u2014 Bah\u00e1'u'll\u00e1h",
  description:
    "These Prophets and chosen Ones of God are the recipients and revealers of all the unchangeable attributes and names of God.",
}

export default function ProphetsQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/prophets-sunflower-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;These Prophets and chosen Ones of God are the recipients
                and revealers of all the unchangeable attributes and names of
                God. They are the mirrors that truly and faithfully reflect the
                light of God. Whatsoever is applicable to them is in reality
                applicable to God, Himself, Who is both the Visible and the
                Invisible. The knowledge of Him, Who is the Origin of all
                things, and attainment unto Him, are impossible save through
                knowledge of, and attainment unto, these luminous Beings who
                proceed from the Sun of Truth. By attaining, therefore, to the
                presence of these holy Luminaries, the &ldquo;Presence
                of God&rdquo; Himself is attained.&rdquo;
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
