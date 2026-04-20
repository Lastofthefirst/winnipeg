import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { NewsFeed } from '@/components/NewsFeed'
import { PageIntro } from '@/components/PageIntro'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  const base = 'https://winnipegbahais.org'
  return {
    title: t.meta.news.title,
    description: t.meta.news.description,
    alternates: {
      canonical: `${base}/${locale}/news`,
      languages: {
        en: `${base}/en/news`,
        fr: `${base}/fr/news`,
        'x-default': `${base}/en/news`,
      },
    },
  }
}

export default async function NewsPage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)

  return (
    <>
      <PageIntro eyebrow={t.news.eyebrow} title={t.news.heading}>
        <p>{t.news.intro}</p>
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
            {t.news.visitMore}{' '}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </Container>

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
