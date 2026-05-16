import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "Glory be to Thee, O Lord my God! \u2014 Bah\u00e1'u'll\u00e1h",
  description:
    "Make manifest the rivers of Thy sovereign might, that the waters of Thy Unity may flow through the inmost realities of all things.",
}

export default function UnityPrayerPage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/unity-prayer-confluence-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;Glory be to Thee, O Lord my God! Make manifest the
                rivers of Thy sovereign might, that the waters of Thy Unity may
                flow through the inmost realities of all things, in such wise
                that the banner of Thine unfailing guidance may be raised aloft
                in the kingdom of Thy command and the stars of Thy divine
                splendor may shine brightly in the heaven of Thy majesty.
                Potent art Thou to do what pleaseth Thee. Thou, verily, art the
                Help in Peril, the Self-Subsisting.&rdquo;
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
