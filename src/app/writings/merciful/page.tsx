import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "He Who is your Lord \u2014 Bah\u00e1'u'll\u00e1h",
  description:
    "He Who is your Lord, the All-Merciful, cherisheth in His heart the desire of beholding the entire human race as one soul and one body.",
}

export default function MercifulQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-12 h-px w-20 bg-gold-500" />

          <StandaloneImage
            src="/writings-nature/merciful-elder-tree-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-2xl font-normal leading-relaxed text-burgundy-900 sm:text-3xl lg:text-4xl">
                &ldquo;He Who is your Lord, the All-Merciful, cherisheth in
                His heart the desire of beholding the entire human race as one
                soul and one body. Haste ye to win your share of God&apos;s
                good grace and mercy in this Day that eclipseth all other
                created Days. How great the felicity that awaiteth the man
                that forsaketh all he hath in a desire to obtain the things of
                God! Such a man, We testify, is among God&apos;s blessed
                ones.&rdquo;
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
