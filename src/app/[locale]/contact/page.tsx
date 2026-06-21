import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { ContactForm } from '@/components/ContactForm'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { getDictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/types'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)
  const base = 'https://winnipegbahais.org'
  return {
    title: t.meta.contact.title,
    description: t.meta.contact.description,
    alternates: {
      canonical: `${base}/${locale}/contact`,
      languages: {
        en: `${base}/en/contact`,
        fr: `${base}/fr/contact`,
        'x-default': `${base}/en/contact`,
      },
    },
  }
}

interface ContactDetailsProps {
  visiting: { heading: string; body: string }
  email: { heading: string; generalInquiries: string }
  follow: { heading: string }
}

function ContactDetails({ visiting, email, follow }: ContactDetailsProps) {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-burgundy-900">
        {visiting.heading}
      </h2>
      <p className="mt-6 text-base text-burgundy-700">{visiting.body}</p>

      <Offices className="mt-10" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-burgundy-900">
          {email.heading}
        </h2>
        <dl className="mt-6 text-sm">
          <div>
            <dt className="font-semibold text-burgundy-900">{email.generalInquiries}</dt>
            <dd>
              <Link
                href="mailto:LSA@winnipegbahais.org"
                className="text-burgundy-600 hover:text-burgundy-900"
              >
                LSA@winnipegbahais.org
              </Link>
            </dd>
          </div>
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-burgundy-900">
          {follow.heading}
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export default async function ContactPage({ params }: { params: any }) {
  const { locale } = (await params) as { locale: Locale }
  const t = await getDictionary(locale)

  return (
    <>
      <PageIntro eyebrow={t.contact.eyebrow} title={t.contact.heading}>
        <p>{t.contact.intro}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm
            labels={{
              heading: t.contact.form.heading,
              name: t.contact.form.name,
              email: t.contact.form.email,
              phone: t.contact.form.phone,
              subject: t.contact.form.subject,
              message: t.contact.form.message,
              button: t.contact.form.button,
            }}
          />
          <ContactDetails
            visiting={t.contact.visiting}
            email={t.contact.email}
            follow={t.contact.follow}
          />
        </div>
      </Container>
    </>
  )
}
