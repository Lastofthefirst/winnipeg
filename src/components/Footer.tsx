import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import type { Locale } from '@/i18n/types'
import type { Dictionary } from '@/i18n/types'

export function Footer({
  locale = 'en',
  nav,
  footer,
}: {
  locale?: Locale
  nav?: Dictionary['nav']
  footer?: Dictionary['footer']
}) {
  const exploreLabel = footer?.explore ?? 'Explore'
  const officialResourcesLabel = footer?.officialResources ?? 'Official Resources'
  const connectLabel = footer?.connect ?? 'Connect'
  const navLabels = nav ?? {
    home: 'Home', about: 'About', communityLife: 'Community Life',
    theFaith: "The Bahá'í Faith", events: 'Events', news: 'News', contact: 'Contact',
  }

  const navigation = [
    {
      title: exploreLabel,
      links: [
        { title: navLabels.about, href: `/${locale}/about` },
        { title: navLabels.communityLife, href: `/${locale}/community-life` },
        { title: navLabels.theFaith, href: `/${locale}/the-faith` },
        { title: navLabels.events, href: `/${locale}/events` },
        { title: navLabels.news, href: `/${locale}/news` },
        { title: navLabels.contact, href: `/${locale}/contact` },
      ],
    },
    {
      title: officialResourcesLabel,
      links: [
        { title: 'Bahai.org', href: 'https://www.bahai.org' },
        { title: "Bahá'í World News", href: 'https://news.bahai.org' },
        { title: "Bahá'ís of Canada", href: 'https://www.bahai.ca' },
        { title: "Bahá'í Reference Library", href: 'https://www.bahai.org/library/' },
      ],
    },
    { title: connectLabel, links: socialMediaProfiles },
  ]

  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <nav>
            <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {navigation.map((section, sectionIndex) => (
                <li key={sectionIndex}>
                  <div className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-burgundy-900">
                    {section.title}
                  </div>
                  <ul role="list" className="mt-4 text-sm text-burgundy-600">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="mt-4">
                        <Link
                          href={link.href}
                          className="transition hover:text-burgundy-900"
                          {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-burgundy-200 pt-12">
          <Link href={`/${locale}`} aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-burgundy-500">
            &copy; Bahá&apos;í Community of Winnipeg {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
