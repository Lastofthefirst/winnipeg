import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "O God, guide me, protect me \u2014 \u2018Abdu'l\u2011Bah\u00e1",
  description:
    "O God, guide me, protect me, make of me a shining lamp and a brilliant star.",
}

export default function GuideMePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-12 h-px w-20 bg-gold-500" />

          <StandaloneImage
            src="/writings-nature/guide-me-fireweed-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-2xl font-normal leading-relaxed text-burgundy-900 sm:text-3xl lg:text-4xl">
                &ldquo;O God, guide me, protect me, make of me a shining lamp
                and a brilliant star. Thou art the Mighty and the
                Powerful.&rdquo;
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
