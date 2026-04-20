'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import type { Locale } from '@/i18n/types'

export function LocaleSwitcher({ locale, invert = false }: { locale: Locale; invert?: boolean }) {
  const pathname = usePathname()
  const other = locale === 'en' ? 'fr' : 'en'
  const href = pathname.replace(`/${locale}`, `/${other}`)
  return (
    <Link
      href={href}
      className={clsx(
        'font-display text-sm font-semibold uppercase tracking-[0.15em] transition',
        invert
          ? 'text-parchment hover:text-burgundy-200'
          : 'text-burgundy-700 hover:text-burgundy-900',
      )}
    >
      {other.toUpperCase()}
    </Link>
  )
}
