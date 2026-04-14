import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 bg-burgundy-900 px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <div className="mb-8 h-px w-16 bg-gold-400" />
            <h2 className="font-display text-3xl font-normal text-ivory sm:text-4xl">
              Connect with the Bahá&apos;í Community
            </h2>
            <div className="mt-6 flex">
              <Button href="/contact" invert>
                Get in Touch
              </Button>
            </div>
            <div className="mt-10 border-t border-burgundy-700 pt-10">
              <Offices invert />
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
