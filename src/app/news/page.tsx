import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { NewsFeed } from '@/components/NewsFeed'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { ContactSection } from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'News',
  description:
    'The latest news from the Bahá\'í World News Service and the global Bahá\'í community.',
}

export default function News() {
  return (
    <RootLayout>
      <PageIntro eyebrow="News" title="Bahá'í World News">
        <p>
          Stories from the global Bahá&apos;í community, sourced from the
          Bahá&apos;í World News Service.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <NewsFeed limit={12} />
        <div className="mt-16 text-center">
          <a
            href="https://news.bahai.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-900 transition hover:text-burgundy-600"
          >
            Visit news.bahai.org for more stories{' '}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
