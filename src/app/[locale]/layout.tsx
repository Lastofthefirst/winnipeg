import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/types'
import { getDictionary } from '@/i18n/getDictionary'
import { RootLayout } from '@/components/RootLayout'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  return {
    openGraph: {
      type: 'website',
      siteName: "Bahá'í Community of Winnipeg",
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
    },
  }
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
