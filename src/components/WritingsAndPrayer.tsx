'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import { WritingsGrid, WritingsLanguageTab } from '@/components/WritingsGrid'
import type { Locale } from '@/i18n/types'

type WritingsEntry = {
  slug: string
  passage: string
  source: string
  language: string
  image: string
}

export function WritingsAndPrayer({
  eyebrow,
  heading,
  intro,
  locale,
  writings,
}: {
  eyebrow: string
  heading: string
  intro: string
  locale: Locale
  writings: WritingsEntry[]
}) {
  const defaultLanguage = locale === 'fr' ? 'French' : 'English'

  const { writingsByLanguage, availableLanguages } = useMemo(() => {
    const byLang = writings.reduce((acc, w) => {
      if (!acc[w.language]) acc[w.language] = []
      acc[w.language].push(w)
      return acc
    }, {} as Record<string, WritingsEntry[]>)

    return {
      writingsByLanguage: byLang,
      availableLanguages: Object.keys(byLang),
    }
  }, [writings])

  const initialLang = availableLanguages.includes(defaultLanguage)
    ? defaultLanguage
    : availableLanguages[0]

  const [activeLanguage, setActiveLanguage] = useState(initialLang)

  const entries = writingsByLanguage[activeLanguage] || []

  const byAuthor = useMemo(() => {
    return entries.reduce((acc, w) => {
      if (!acc[w.source]) acc[w.source] = []
      acc[w.source].push(w)
      return acc
    }, {} as Record<string, WritingsEntry[]>)
  }, [entries])

  const canonicalOrder = ["Bahá'u'lláh", "The Báb", "'Abdu'l Bahá"]
  const authorOrder = Object.keys(byAuthor).sort((a, b) => {
    const aIdx = canonicalOrder.indexOf(a)
    const bIdx = canonicalOrder.indexOf(b)
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
    if (aIdx !== -1) return -1
    if (bIdx !== -1) return 1
    return a.localeCompare(b)
  })

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro eyebrow={eyebrow} title={heading}>
        <p>{intro}</p>
      </SectionIntro>
      {availableLanguages.length > 1 && (
        <div className="mt-10 flex gap-2">
          {availableLanguages.map((lang) => (
            <WritingsLanguageTab
              key={lang}
              language={lang}
              active={lang === activeLanguage}
              onClick={() => setActiveLanguage(lang)}
            />
          ))}
        </div>
      )}
      {authorOrder.map((author) => {
        const authorEntries = byAuthor[author]
        if (!authorEntries) return null
        return (
          <div key={author}>
            <h4 className="mt-10 font-display text-lg font-normal text-burgundy-900 first:mt-16">
              {author}
            </h4>
            <WritingsGrid entries={authorEntries} />
          </div>
        )
      })}
    </Container>
  )
}
