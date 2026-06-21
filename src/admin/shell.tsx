'use client'

import { type ReactNode } from 'react'

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

function ExternalLinkIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M15 3h6v6M15 3l7 7M21 3l-9 9" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

// ─── Shell ───────────────────────────────────────────────────────────────────

interface AdminShellProps {
  children?: ReactNode
  dirty: boolean
  onPush: () => void
  pushing: boolean
  pushStatus: 'idle' | 'success' | 'error'
  pushMessage: string
  rebuildSeconds?: number
  sectionLabels?: string[]
}

export function AdminShell({
  children,
  dirty,
  onPush,
  pushing,
  pushStatus,
  pushMessage,
  rebuildSeconds,
  sectionLabels,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-burgundy-100 bg-ivory">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="h-6 w-px bg-gold-500" />
            <div>
              <h1 className="font-display text-sm font-normal text-burgundy-900">
                Bahá'í Community of Winnipeg
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-burgundy-400">
                Site Editor
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Analytics link */}
            <a
              href="https://stats.ridvan.org/share/winnipeg.pages.dev?auth=Quni4eI3Gawi0uuo1qfOm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-burgundy-500 transition hover:text-burgundy-900"
            >
              <ExternalLinkIcon />
              Analytics
            </a>

            {/* Push to Live */}
            <button
              disabled={!dirty || pushing}
              onClick={onPush}
              className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                dirty && !pushing
                  ? 'bg-burgundy-900 text-white hover:bg-burgundy-800'
                  : pushing
                    ? 'bg-burgundy-900/80 text-white cursor-wait'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
              }`}
            >
              {pushing ? <SpinnerIcon /> : dirty ? <ArrowRightIcon /> : <CheckIcon />}
              {pushing ? 'Publishing…' : dirty ? 'Push to Live' : 'All Saved'}
            </button>
          </div>
        </div>
      </header>

      {/* Content area */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-burgundy-900">
            Edit Content
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">
            Click any highlighted text to edit. When ready, click <strong className="text-stone-700">Push to Live</strong> to publish your changes.
          </p>

          {/* Status message */}
          {pushStatus !== 'idle' && (
            <div className={`mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
              pushStatus === 'success'
                ? (rebuildSeconds ?? 0) > 0
                  ? 'bg-amber-50 text-amber-900'
                  : 'bg-emerald-50 text-emerald-800'
                : 'bg-red-50 text-red-800'
            }`}>
              {pushStatus === 'success'
                ? (rebuildSeconds ?? 0) > 0
                  ? <SpinnerIcon />
                  : <CheckIcon />
                : <AlertIcon />
              }
              {pushMessage}
              {rebuildSeconds !== undefined && rebuildSeconds > 0 && (
                <span className="ml-2 font-mono text-xs opacity-75">
                  ~{Math.floor(rebuildSeconds / 60)}m {rebuildSeconds % 60 < 10 ? '0' : ''}{rebuildSeconds % 60}s
                </span>
              )}
            </div>
          )}

          {/* Table of contents */}
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
              <p className="text-xs text-stone-500">Your changes will go live on the website within a minute.</p>
            </div>
            <button
              disabled={!dirty || pushing}
              onClick={onPush}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                dirty && !pushing
                  ? 'bg-burgundy-900 text-white hover:bg-burgundy-800'
                  : pushing
                    ? 'bg-burgundy-900/80 text-white cursor-wait'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
              }`}
            >
              {pushing ? <SpinnerIcon /> : <ArrowRightIcon />}
              {pushing ? 'Publishing…' : 'Push to Live'}
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
  bgColor?: string
  locale?: 'en' | 'fr'
  onLocaleChange?: (l: 'en' | 'fr') => void
}

export function SectionCard({ id, label, page, children, bgColor = 'bg-ivory', locale, onLocaleChange }: SectionCardProps) {
  return (
    <div id={id} className={`rounded-2xl border border-stone-200 shadow-sm overflow-hidden ${bgColor}`}>
      <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-burgundy-900">{label}</h3>
          {page && (
            <>
              <span className="text-stone-300">/</span>
              <span className="text-xs text-stone-500">{page}</span>
            </>
          )}
        </div>
        {locale && onLocaleChange && (
          <div className="flex rounded-md border border-burgundy-200 bg-white/80 p-0.5">
            <button
              onClick={() => onLocaleChange('en')}
              className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition ${
                locale === 'en'
                  ? 'bg-burgundy-900 text-ivory'
                  : 'text-burgundy-500 hover:text-burgundy-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLocaleChange('fr')}
              className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition ${
                locale === 'fr'
                  ? 'bg-burgundy-900 text-ivory'
                  : 'text-burgundy-500 hover:text-burgundy-900'
              }`}
            >
              FR
            </button>
          </div>
        )}
      </div>
      <div className="px-6 py-6">
        {children}
      </div>
    </div>
  )
}
