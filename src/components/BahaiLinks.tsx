import { Border } from '@/components/Border'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

const officialLinks = [
  {
    title: 'Bahai.org',
    description: 'The official international website of the Bahá\'í Faith.',
    href: 'https://www.bahai.org',
  },
  {
    title: 'Bahá\'í World News Service',
    description: 'News stories from the global Bahá\'í community.',
    href: 'https://news.bahai.org',
  },
  {
    title: 'Bahá\'ís of Canada',
    description: 'The official website of the Bahá\'í Community of Canada.',
    href: 'https://www.bahai.ca',
  },
  {
    title: 'Bahá\'í Reference Library',
    description: 'Authoritative texts of the Bahá\'í Faith.',
    href: 'https://www.bahai.org/library/',
  },
  {
    title: 'Bahá\'í Blog',
    description: 'Stories, reflections, and perspectives from Bahá\'ís around the world.',
    href: 'https://www.bahaiblog.net',
  },
]

function ExternalLinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.5-3.25a.75.75 0 0 0 0 1.5h2.44l-5.72 5.72a.75.75 0 0 0 1.06 1.06l5.72-5.72v2.44a.75.75 0 0 0 1.5 0v-4.25a.75.75 0 0 0-.75-.75h-4.25Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function BahaiLinks() {
  return (
    <FadeInStagger>
      <ul role="list" className="text-base text-neutral-600">
        {officialLinks.map((link) => (
          <li key={link.href} className="group mt-10 first:mt-0">
            <FadeIn>
              <Border className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <strong className="font-semibold text-neutral-950 transition group-hover:text-neutral-700">
                      {link.title}
                    </strong>
                    <p className="mt-1">{link.description}</p>
                  </div>
                  <ExternalLinkIcon className="mt-1 h-5 w-5 flex-none text-neutral-400 transition group-hover:text-neutral-600" />
                </a>
              </Border>
            </FadeIn>
          </li>
        ))}
      </ul>
    </FadeInStagger>
  )
}
