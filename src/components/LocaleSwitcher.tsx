'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/i18n/types'

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const other = locale === 'en' ? 'fr' : 'en'
  const href = pathname.replace(`/${locale}`, `/${other}`)
  return (
    <Link
      href={href}
      className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-burgundy-700 transition hover:text-burgundy-900"
    >
      {other.toUpperCase()}
    </Link>
  )
}
