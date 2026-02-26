import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'

export function Quote({
  children,
  author,
  source,
  className,
}: {
  children: React.ReactNode
  author: string
  source?: string
  className?: string
}) {
  return (
    <div
      className={clsx(
        'relative isolate bg-gold-50 py-16 sm:py-28 md:py-32',
        className,
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)] fill-gold-100 stroke-gold-400/10"
        yOffset={-256}
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="relative font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              <p className="before:content-['\u201C'] after:content-['\u201D'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10 text-base text-neutral-600">
              &mdash; {author}
              {source && (
                <span className="text-neutral-400">, {source}</span>
              )}
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  )
}
