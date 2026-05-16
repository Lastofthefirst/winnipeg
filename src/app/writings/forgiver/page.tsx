import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "O Thou forgiver of sins, bestower of gifts \u2014 \u2018Abdu'l\u2011Bah\u00e1",
  description:
    "O my God! O Thou forgiver of sins, bestower of gifts, dispeller of afflictions!",
}

export default function ForgiverPage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/forgiver-spring-water-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;O my God! O Thou forgiver of sins, bestower of gifts,
                dispeller of afflictions! Verily, I beseech Thee to forgive the
                sins of such as have abandoned the physical garment and have
                ascended to the spiritual world. O my Lord! Purify them from
                trespasses, dispel their sorrows, and change their darkness
                into light. Cause them to enter the garden of happiness, cleanse
                them with the most pure water, and grant them to behold Thy
                splendors on the loftiest mount.&rdquo;
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
