import { type Metadata } from 'next'

import {
  StandaloneImage,
  StandalonePage,
} from '@/components/StandalonePage'

export const metadata: Metadata = {
  title: "O Lord! Thou art the Remover of every anguish \u2014 The B\u00e1b",
  description:
    "O Lord! Thou art the Remover of every anguish and the Dispeller of every affliction.",
}

export default function RedeemerPage() {
  return (
    <StandalonePage>
      <div className="flex w-full flex-auto items-center justify-center px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-12 h-px w-20 bg-gold-500" />

          <StandaloneImage
            src="/writings-nature/redeemer-aspen-01_00001_.png"
            alt=""
            className="mx-auto mb-12 max-w-xs sm:max-w-sm"
          />

          <figure>
            <blockquote>
              <p className="font-display text-2xl font-normal leading-relaxed text-burgundy-900 sm:text-3xl lg:text-4xl">
                &ldquo;O Lord! Thou art the Remover of every anguish and the
                Dispeller of every affliction. Thou art He Who banisheth every
                sorrow and setteth free every slave, the Redeemer of every
                soul. O Lord! Grant deliverance through Thy mercy, and reckon
                me among such servants of Thine as have gained
                salvation.&rdquo;
              </p>
            </blockquote>

            <div className="mx-auto my-8 h-px w-16 bg-gold-400" />

            <figcaption className="font-display text-sm uppercase tracking-[0.2em] text-burgundy-500">
              The Báb
            </figcaption>
          </figure>

          <div className="mx-auto mt-12 h-px w-20 bg-gold-500" />
        </div>
      </div>
    </StandalonePage>
  )
}
