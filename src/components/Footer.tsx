import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'

const navigation = [
  {
    title: 'Explore',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Community Life', href: '/community-life' },
      { title: 'Learn More', href: '/learn-more' },
      { title: 'Events', href: '/events' },
      { title: 'News', href: '/news' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Official Resources',
    links: [
      { title: 'Bahai.org', href: 'https://www.bahai.org' },
      { title: 'Bahá\'í World News', href: 'https://news.bahai.org' },
      { title: 'Bahá\'ís of Canada', href: 'https://www.bahai.ca' },
      { title: 'Bahá\'í Reference Library', href: 'https://www.bahai.org/library/' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
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
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            &copy; Bahá&apos;í Community of Winnipeg {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
