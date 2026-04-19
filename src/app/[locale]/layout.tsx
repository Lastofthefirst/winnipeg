import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/types'
import { getDictionary } from '@/i18n/getDictionary'
import { RootLayout } from '@/components/RootLayout'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: any
}) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  return (
    <RootLayout locale={locale} nav={t.nav} footer={t.footer}>
      {children}
    </RootLayout>
  )
}
