import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "The fruits that best befit the tree of human life \u2014 Bah\u00e1'u'll\u00e1h",
  description:
    "The fruits that best befit the tree of human life are trustworthiness and godliness, truthfulness and sincerity.",
}

export default function VirtuesQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-12 h-px w-20 bg-gold-500" />

          <StandaloneImage
            src="/writings-nature/virtues-coneflower-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-2xl font-normal leading-relaxed text-burgundy-900 sm:text-3xl lg:text-4xl">
                &ldquo;The fruits that best befit the tree of human life are
                trustworthiness and godliness, truthfulness and sincerity; but
                greater than all, after recognition of the unity of God, praised
                and glorified be He, is regard for the rights that are due to
                one&apos;s parents. This teaching hath been mentioned in all the
                Books of God, and reaffirmed by the Most Exalted Pen.&rdquo;
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
