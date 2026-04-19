import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

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
        'relative isolate bg-burgundy-900 py-16 sm:py-28 md:py-32',
        className,
      )}
    >
      <div>
        <Container>
          <FadeIn>
            <figure className="mx-auto max-w-4xl text-center">
              <div className="mx-auto mb-8 text-5xl text-gold-400">
                &ldquo;
              </div>
              <blockquote>
                <p className="font-display text-2xl font-normal leading-relaxed text-ivory sm:text-3xl">
                  {children}
                </p>
              </blockquote>
              <div className="mx-auto my-8 h-px w-16 bg-gold-400" />
              <figcaption className="text-sm uppercase tracking-[0.2em] text-gold-400">
                {author}
                {source && (
                  <span className="text-burgundy-400">, {source}</span>
                )}
              </figcaption>
            </figure>
          </FadeIn>
        </Container>
      </div>
    </div>
  )
}
