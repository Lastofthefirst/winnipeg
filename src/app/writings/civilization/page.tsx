import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "All men have been created to carry forward an ever-advancing civilization \u2014 Bah\u00e1'u'll\u00e1h",
  description:
    "All men have been created to carry forward an ever-advancing civilization.",
}

export default function CivilizationQuotePage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/civilization-path-horizon-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;All men have been created to carry forward an
                ever-advancing civilization. The Almighty beareth Me witness: To
                act like the beasts of the field is unworthy of man. Those
                virtues that befit his dignity are forbearance, mercy,
                compassion and loving-kindness towards all the peoples and
                kindreds of the earth. Say: O friends! Drink your fill from this
                crystal stream that floweth through the heavenly grace of Him
                Who is the Lord of Names. Let others partake of its waters in My
                name, that the leaders of men in every land may fully recognize
                the purpose for which the Eternal Truth hath been revealed, and
                the reason for which they themselves have been created.&rdquo;
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
