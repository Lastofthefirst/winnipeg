import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "O living flame of heavenly love! \u2014 \u2018Abdu'l\u2011Bah\u00e1",
  description:
    "O living flame of heavenly love! Thine heart hath been so fired with the love of God that from ten thousand leagues afar its warmth and radiance may be felt and seen.",
}

export default function FlameQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/flame-fireweed-bloom-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;O living flame of heavenly love! Thine heart hath been so
                fired with the love of God that from ten thousand leagues afar
                its warmth and radiance may be felt and seen. The fire lit by
                mortal hand imparteth light and warmth to but a little space,
                whereas that sacred flame which the Hand of God hath kindled,
                though burning in the east, will set aflame the west and give
                warmth to both the north and the south; nay, it shall rise from
                this world to glow with the hottest flame in the realms on high,
                flooding with light the Kingdom of eternal glory.&rdquo;
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
