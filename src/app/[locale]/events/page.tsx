import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { EventsList } from '@/components/EventsList'
import { PageIntro } from '@/components/PageIntro'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'
import { getUpcomingEvents } from '@/utils/events'
import eventsData from '@/../content/cms/events.json'
import type { CmsEvent } from '@/utils/events'

const events = eventsData as CmsEvent[]

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  const base = 'https://winnipegbahais.org'
  return {
    title: t.meta.events.title,
    description: t.meta.events.description,
    alternates: {
      canonical: `${base}/${locale}/events`,
      languages: {
        en: `${base}/en/events`,
        fr: `${base}/fr/events`,
        'x-default': `${base}/en/events`,
      },
    },
  }
}

export default async function EventsPage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)

  return (
    <>
      <PageIntro eyebrow={t.events.eyebrow} title={t.events.heading}>
        <p>{t.events.intro}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <EventsList
          locale={locale}
          strings={t.events}
          events={events}
          initial={getUpcomingEvents(events)}
        />
      </Container>

      <ContactSection
        heading={t.contactSection.heading}
        button={t.contactSection.button}
        locale={locale}
      />
    </>
  )
}
