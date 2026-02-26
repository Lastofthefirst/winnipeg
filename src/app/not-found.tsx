import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

export default function NotFound() {
  return (
    <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-normal text-burgundy-900 sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-normal text-burgundy-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-burgundy-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
        >
          Go to the home page
        </Link>
      </FadeIn>
    </Container>
  )
}
