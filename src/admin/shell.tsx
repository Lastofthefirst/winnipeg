'use client'

import { type ReactNode } from 'react'
import { Container } from '@/components/Container'

// ─── Icons ───────────────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

// ─── Shell ───────────────────────────────────────────────────────────────────

interface AdminShellProps {
  children: ReactNode
  locale: 'en' | 'fr'
  onLocaleChange: (locale: 'en' | 'fr') => void
  dirty: boolean
  onPush: () => void
  sectionLabels?: string[]
}

export function AdminShell({
  children,
  locale,
  onLocaleChange,
  dirty,
  onPush,
  sectionLabels,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-burgundy-100 bg-ivory">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {/* Gold divider */}
            <div className="h-6 w-px bg-gold-500" />
            <div>
              <h1 className="font-display text-sm font-normal text-burgundy-900">
                Bahá'í Community of Winnipeg
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-burgundy-400">
                Site Editor
              </p>
            </div>
            <span className="ml-2 rounded-full border border-gold-300 bg-gold-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold-700">
              Local Trial
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div className="flex rounded-lg border border-burgundy-200 bg-white p-0.5">
              <button
                onClick={() => onLocaleChange('en')}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  locale === 'en'
                    ? 'bg-burgundy-900 text-ivory'
                    : 'text-burgundy-600 hover:text-burgundy-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLocaleChange('fr')}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  locale === 'fr'
                    ? 'bg-burgundy-900 text-ivory'
                    : 'text-burgundy-600 hover:text-burgundy-900'
                }`}
              >
                Français
              </button>
            </div>

            {/* Push changes */}
            <button
              disabled={!dirty}
              onClick={onPush}
              className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                dirty
                  ? 'bg-burgundy-900 text-white hover:bg-burgundy-800'
                  : 'bg-stone-100 text-stone-400 cursor-not-allowed'
              }`}
            >
              {dirty ? <ArrowRightIcon /> : <CheckIcon />}
              {dirty ? 'Push Changes' : 'All Saved'}
            </button>
          </div>
        </div>
      </header>

      {/* Content area */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-burgundy-900">
            Edit {locale === 'en' ? 'English' : 'French'} Content
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">
            Click any highlighted text to edit in place. Changes are staged locally — click <strong className="text-stone-700">Push Changes</strong> when ready to publish.
            Use the toggle above to switch between languages.
          </p>

          {/* Table of contents — shown when more than 4 sections */}
          {sectionLabels && sectionLabels.length > 4 && (
            <nav className="mt-4 flex flex-wrap gap-2">
              {sectionLabels.map((label, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900"
                >
                  {label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Section cards */}
        <div className="space-y-12">
          {children}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white px-6 py-5 shadow-sm">
            <div>
              <p className="text-sm font-medium text-burgundy-900">Ready to publish?</p>
              <p className="text-xs text-stone-500">This will commit changes and trigger a site rebuild.</p>
            </div>
            <button
              disabled={!dirty}
              onClick={onPush}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                dirty
                  ? 'bg-burgundy-900 text-white hover:bg-burgundy-800'
                  : 'bg-stone-100 text-stone-400 cursor-not-allowed'
              }`}
            >
              <ArrowRightIcon />
              Push Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── Section card ────────────────────────────────────────────────────────────

interface SectionCardProps {
  id?: string
  label: string
  page?: string
  children: ReactNode
}

export function SectionCard({ id, label, page, children, bgColor = 'bg-ivory' }: SectionCardProps & { bgColor?: string }) {
  return (
    <div id={id} className={`rounded-2xl border border-stone-200 shadow-sm overflow-hidden ${bgColor}`}>
      {/* Section header */}
      <div className="flex items-center gap-3 border-b border-stone-100 px-6 py-4">
        <h3 className="text-sm font-semibold text-burgundy-900">{label}</h3>
        {page && (
          <>
            <span className="text-stone-300">/</span>
            <span className="text-xs text-stone-500">{page}</span>
          </>
        )}
      </div>

      {/* Section content — the actual component */}
      <div className="px-6 py-6">
        {children}
      </div>
    </div>
  )
}
