import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "O Thou Whose face is the object of my adoration \u2014 Bah\u00e1'u'll\u00e1h",
  description:
    "O Thou Whose face is the object of my adoration, Whose beauty is my sanctuary, Whose habitation is my goal, Whose praise is my hope.",
}

export default function SupplicationPage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <StandaloneImage
            src="/writings-nature/supplication-wild-rose-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-lg font-normal leading-relaxed text-burgundy-900 sm:text-xl lg:text-2xl">
                &ldquo;O Thou Whose face is the object of my adoration, Whose
                beauty is my sanctuary, Whose habitation is my goal, Whose
                praise is my hope, Whose providence is my companion, Whose love
                is the cause of my being, Whose mention is my solace, Whose
                nearness is my desire, Whose presence is my dearest wish and
                highest aspiration, I entreat Thee not to withhold from me the
                things Thou didst ordain for the chosen ones among Thy servants.
                Supply me, then, with the good of this world and of the next.
                Thou, truly, art the King of all men. There is no God but Thee,
                the Ever-Forgiving, the Most Generous.&rdquo;
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
