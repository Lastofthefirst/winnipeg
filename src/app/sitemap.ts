import type { MetadataRoute } from 'next'
import writingsData from '@/../content/cms/writings.json'

export const dynamic = 'force-static'

const BASE_URL = 'https://winnipegbahais.org'
const LOCALES = ['en', 'fr'] as const
const PAGES = ['', '/about', '/community-life', '/learn-more', '/events', '/news', '/contact'] as const

const writings = writingsData as { slug: string }[]

export default function sitemap(): MetadataRoute.Sitemap {
  const localePages = LOCALES.flatMap((locale) =>
    PAGES.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
  )

  const writingPages = writings.map((entry) => ({
    url: `${BASE_URL}/writings/${entry.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  return [...localePages, ...writingPages]
}
