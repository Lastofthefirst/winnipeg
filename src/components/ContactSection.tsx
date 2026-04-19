import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import type { Locale } from '@/i18n/types'

export function ContactSection({
  heading = "Connect with the Bahá'í Community",
  button = 'Get in Touch',
  locale = 'en',
}: {
  heading?: string
  button?: string
  locale?: Locale
}) {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="relative -mx-6 overflow-hidden bg-burgundy-900 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="max-w-xl">
          <div className="mb-8 h-px w-16 bg-gold-400" />
          <h2 className="font-display text-3xl font-normal text-ivory sm:text-4xl">
            {heading}
          </h2>
          <div className="mt-6 flex">
            <Button href={`/${locale}/contact`} invert>
              {button}
            </Button>
          </div>
          <div className="mt-10 border-t border-burgundy-700 pt-10">
            <Offices invert />
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
