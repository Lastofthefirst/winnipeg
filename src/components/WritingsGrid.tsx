'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DownloadIcon } from '@/components/DownloadIcon'

type WritingsEntry = {
  slug: string
  passage: string
  source: string
  language: string
  image: string
}

export function WritingsGrid({ entries }: { entries: WritingsEntry[] }) {
  const [expanded, setExpanded] = useState(6)

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {entries.slice(0, expanded).map((entry) => (
        <div
          key={entry.slug}
          className="group relative rounded border border-burgundy-200 bg-ivory p-6 transition hover:border-burgundy-400"
        >
          <Link
            href={`/writings/${entry.slug}`}
            aria-label={entry.passage.slice(0, 60)}
            className="absolute inset-0"
          />
          <p className="text-sm leading-relaxed text-burgundy-700">
            {entry.passage.length > 150 ? entry.passage.slice(0, 150) + '…' : entry.passage}
          </p>
          <div className="mt-4 flex justify-end">
            <a
              href={`/writings-pdf/${entry.slug}.pdf`}
              download
              className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-500 transition hover:text-burgundy-900"
            >
              PDF
              <DownloadIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      ))}
      {expanded < entries.length && (
        <button
          onClick={() => setExpanded((e) => e + 6)}
          className="col-span-full mt-4 text-center text-sm font-semibold text-burgundy-500 transition hover:text-burgundy-900"
        >
          Show more
        </button>
      )}
    </div>
  )
}

export function WritingsLanguageTab({ language, active, onClick }: { language: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition ${
        active
          ? 'bg-burgundy-900 text-ivory'
          : 'bg-burgundy-100 text-burgundy-500 hover:bg-burgundy-200'
      }`}
    >
      {language}
    </button>
  )
}
