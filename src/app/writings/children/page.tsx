import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "Children are even as a branch that is fresh and green \u2014 \u2018Abdu'l\u2011Bah\u00e1",
  description:
    "Children are even as a branch that is fresh and green; they will grow up in whatever way ye train them.",
}

export default function ChildrenQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/children-willow-sprout-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;Children are even as a branch that is fresh and green;
                they will grow up in whatever way ye train them. Take the utmost
                care to give them high ideals and goals, so that once they come
                of age, they will cast their beams like brilliant candles on the
                world, and will not be defiled by lusts and passions in the way
                of animals, heedless and unaware, but instead will set their
                hearts on achieving everlasting honour and acquiring all the
                excellences of humankind.&rdquo;
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
