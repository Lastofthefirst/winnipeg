'use client'

import { useEffect, useState } from 'react'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

interface NewsItem {
  title: string
  description: string
  link: string
  pubDate: string
  image: string
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
    <div className="animate-pulse border border-burgundy-200 bg-ivory p-6 sm:p-8">
      <div className="h-4 w-24 bg-burgundy-100" />
      <div className="mt-6 h-6 w-full bg-burgundy-100" />
      <div className="mt-2 h-6 w-3/4 bg-burgundy-100" />
      <div className="mt-4 h-4 w-full bg-burgundy-100" />
      <div className="mt-2 h-4 w-2/3 bg-burgundy-100" />
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
        const response = await fetch('/news.json')
        if (!response.ok) throw new Error('Network error')
        const items: NewsItem[] = await response.json()
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
      <div className="border border-burgundy-200 bg-ivory p-8 text-center sm:p-12">
        <p className="text-base text-burgundy-700">
          Visit{' '}
          <a
            href="https://news.bahai.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-burgundy-900 underline transition hover:text-burgundy-600"
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
          <article className="relative flex w-full flex-col border border-burgundy-200 bg-ivory p-6 transition hover:border-burgundy-400 sm:p-8">
            <p className="flex gap-x-2 text-sm text-burgundy-900">
              <time dateTime={article.pubDate} className="font-semibold">
                {formatDate(article.pubDate)}
              </time>
            </p>
            <h3 className="mt-6 font-display text-2xl font-normal text-burgundy-900">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="absolute inset-0" />
                {article.title}
              </a>
            </h3>
            <p className="mt-4 text-base text-burgundy-700 line-clamp-3">
              {article.description}
            </p>
          </article>
        </FadeIn>
      ))}
    </FadeInStagger>
  )
}
