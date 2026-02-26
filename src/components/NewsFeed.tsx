'use client'

import { useEffect, useState } from 'react'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

const RSS_URL = 'https://news.bahai.org/rss.xml'
const PROXY_URL = 'https://api.allorigins.win/get?url='

interface NewsItem {
  title: string
  description: string
  link: string
  pubDate: string
  image: string
}

function parseRSS(xmlString: string): NewsItem[] {
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlString, 'application/xml')

  const parseError = xml.querySelector('parsererror')
  if (parseError) return []

  const items = xml.querySelectorAll('item')
  return Array.from(items).map((item) => {
    const title =
      item.querySelector('title')?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '').trim() ||
      'No Title'
    const description =
      item.querySelector('description')?.textContent?.replace(/<!\[CDATA\[|\]\]>/g, '').trim() ||
      ''
    const link = item.querySelector('link')?.textContent || '#'
    const pubDate = item.querySelector('pubDate')?.textContent || ''

    let image = ''
    const mediaContent = item.getElementsByTagNameNS(
      'http://search.yahoo.com/mrss/',
      'content',
    )[0]
    const enclosure = item.querySelector('enclosure')
    if (mediaContent) image = mediaContent.getAttribute('url') || ''
    else if (enclosure) image = enclosure.getAttribute('url') || ''

    return { title, description, link, pubDate, image }
  })
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl bg-neutral-100 p-6 sm:p-8">
      <div className="h-4 w-24 rounded bg-neutral-200" />
      <div className="mt-6 h-6 w-full rounded bg-neutral-200" />
      <div className="mt-2 h-6 w-3/4 rounded bg-neutral-200" />
      <div className="mt-4 h-4 w-full rounded bg-neutral-200" />
      <div className="mt-2 h-4 w-2/3 rounded bg-neutral-200" />
    </div>
  )
}

export function NewsFeed({ limit = 6 }: { limit?: number }) {
  const [articles, setArticles] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `${PROXY_URL}${encodeURIComponent(RSS_URL)}`,
        )
        if (!response.ok) throw new Error('Network error')

        const data = await response.json()
        const items = parseRSS(data.contents)
        setArticles(items.slice(0, limit))
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {Array.from({ length: Math.min(limit, 3) }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (error || articles.length === 0) {
    return (
      <div className="rounded-3xl bg-neutral-50 p-8 text-center sm:p-12">
        <p className="text-base text-neutral-600">
          Visit{' '}
          <a
            href="https://news.bahai.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neutral-950 underline transition hover:text-neutral-700"
          >
            news.bahai.org
          </a>{' '}
          for the latest Bahá&apos;í World News stories.
        </p>
      </div>
    )
  }

  return (
    <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {articles.map((article) => (
        <FadeIn key={article.link} className="flex">
          <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
            <p className="flex gap-x-2 text-sm text-neutral-950">
              <time dateTime={article.pubDate} className="font-semibold">
                {formatDate(article.pubDate)}
              </time>
            </p>
            <h3 className="mt-6 font-display text-2xl font-semibold text-neutral-950">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute inset-0 rounded-3xl" />
                {article.title}
              </a>
            </h3>
            <p className="mt-4 text-base text-neutral-600 line-clamp-3">
              {article.description}
            </p>
          </article>
        </FadeIn>
      ))}
    </FadeInStagger>
  )
}
