import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "Thank divine Providence \u2014 \u2018Abdu'l\u2011Bah\u00e1",
  description:
    "Thank divine Providence that thou hast been assisted in service and hast been the cause of the promulgation of the oneness of the world of humanity.",
}

export default function OnenessQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/oneness-vines-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;Thank divine Providence that thou hast been assisted in
                service and hast been the cause of the promulgation of the
                oneness of the world of humanity, so that the darkness of
                differences among men may be dissipated, and the pavilion of the
                unity of nations may cast its shadow over all regions. Without
                such unity, rest and comfort, peace and universal reconciliation
                are unachievable. This illumined century needeth and calleth for
                its fulfilment. In every century a particular and central theme
                is, in accordance with the requirements of that century,
                confirmed by God. In this illumined age that which is confirmed
                is the oneness of the world of humanity. Every soul who serveth
                this oneness will undoubtedly be assisted and confirmed.&rdquo;
              </p>
            </blockquote>

            <div className="mx-auto my-8 h-px w-16 bg-gold-400" />

            <figcaption className="font-display text-sm uppercase tracking-[0.2em] text-burgundy-500">
              &apos;Abdu&apos;l&thinsp;Bah\u00e1
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 h-px w-20 bg-gold-500" />
        </div>
      </div>
    </StandalonePage>
  )
}
