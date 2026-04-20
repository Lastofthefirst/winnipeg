'use client'

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { Logo, Logomark } from '@/components/Logo'
import { Offices } from '@/components/Offices'
import { SocialMedia } from '@/components/SocialMedia'
import type { Locale } from '@/i18n/types'
import type { Dictionary } from '@/i18n/types'

const EN_NAV_FALLBACK: Dictionary['nav'] = {
  home: 'Home', about: 'About', communityLife: 'Community Life',
  learnMore: 'Learn More', events: 'Events', news: 'News', contact: 'Contact',
}
const EN_FOOTER_FALLBACK: Dictionary['footer'] = {
  explore: 'Explore', officialResources: 'Official Resources', connect: 'Connect',
}

const RootLayoutContext = createContext<{
  logoHovered: boolean
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function Header({
  panelId,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
  locale,
  contactLabel,
}: {
  panelId: string
  icon: React.ComponentType<{ className?: string }>
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement | null>
  invert?: boolean
  locale: Locale
  contactLabel: string
}) {
  let { logoHovered, setLogoHovered } = useContext(RootLayoutContext)!

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href={`/${locale}`}
          aria-label="Home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Logomark
            className="h-8 sm:hidden"
            invert={invert}
            filled={logoHovered}
          />
          <Logo
            className="hidden h-8 sm:block"
            invert={invert}
            filled={logoHovered}
          />
        </Link>
        <div className="flex items-center gap-x-8">
          <LocaleSwitcher locale={locale} invert={invert} />
          <Button href={`/${locale}/contact`} invert={invert}>
            {contactLabel}
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={panelId}
            className={clsx(
              'group -m-2.5 rounded-full p-2.5 transition',
              invert ? 'hover:bg-parchment/10' : 'hover:bg-burgundy-900/10',
            )}
            aria-label="Toggle navigation"
          >
            <Icon
              className={clsx(
                'h-6 w-6',
                invert
                  ? 'fill-parchment group-hover:fill-burgundy-200'
                  : 'fill-burgundy-900 group-hover:fill-burgundy-700',
              )}
            />
          </button>
        </div>
      </div>
    </Container>
  )
}

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-px first:mt-0 sm:bg-burgundy-900">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-burgundy-900 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-burgundy-800 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-burgundy-800 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  )
}

function Navigation({ locale, nav }: { locale: Locale; nav: Dictionary['nav'] }) {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-parchment">
      <NavigationRow>
        <NavigationItem href={`/${locale}`}>{nav.home}</NavigationItem>
        <NavigationItem href={`/${locale}/about`}>{nav.about}</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href={`/${locale}/community-life`}>{nav.communityLife}</NavigationItem>
        <NavigationItem href={`/${locale}/learn-more`}>{nav.learnMore}</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href={`/${locale}/events`}>{nav.events}</NavigationItem>
        <NavigationItem href={`/${locale}/news`}>{nav.news}</NavigationItem>
      </NavigationRow>
    </nav>
  )
}

function RootLayoutInner({
  children,
  locale,
  nav,
  footer,
}: {
  children: React.ReactNode
  locale: Locale
  nav: Dictionary['nav']
  footer?: Dictionary['footer']
}) {
  let panelId = useId()
  let [expanded, setExpanded] = useState(false)
  let [isTransitioning, setIsTransitioning] = useState(false)
  let openRef = useRef<React.ElementRef<'button'>>(null)
  let closeRef = useRef<React.ElementRef<'button'>>(null)
  let navRef = useRef<React.ElementRef<'div'>>(null)
  let shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('a')?.href === window.location.href
      ) {
        setIsTransitioning(false)
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <MotionConfig
      transition={
        shouldReduceMotion || !isTransitioning ? { duration: 0 } : undefined
      }
    >
      <header>
        <div
          className="absolute top-2 right-0 left-0 z-40 pt-14"
          aria-hidden={expanded ? 'true' : undefined}
          inert={expanded ? true : undefined}
        >
          <Header
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            locale={locale}
            contactLabel={nav.contact}
            onToggle={() => {
              setIsTransitioning(true)
              setExpanded((expanded) => !expanded)
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true }),
              )
            }}
          />
        </div>

        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? 'auto' : '0.5rem' }}
          className="relative z-50 overflow-hidden bg-burgundy-900 pt-2"
          aria-hidden={expanded ? undefined : 'true'}
          inert={expanded ? undefined : true}
        >
          <motion.div layout className="bg-burgundy-800">
            <div ref={navRef} className="bg-burgundy-900 pt-14 pb-16">
              <Header
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                locale={locale}
                contactLabel={nav.contact}
                onToggle={() => {
                  setIsTransitioning(true)
                  setExpanded((expanded) => !expanded)
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true }),
                  )
                }}
              />
            </div>
            <Navigation locale={locale} nav={nav} />
            <div className="relative bg-burgundy-900 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-burgundy-800">
              <Container>
                <div className="flex flex-col items-center py-12 text-center sm:py-16">
                  <Offices invert className="text-center" />
                  <div className="mt-8 flex items-center gap-4">
                    <span className="h-px w-12 bg-burgundy-700" />
                    <SocialMedia invert />
                    <span className="h-px w-12 bg-burgundy-700" />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-parchment pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-burgundy-50 stroke-burgundy-900/5"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer locale={locale} nav={nav} footer={footer} />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({
  children,
  locale = 'en',
  nav = EN_NAV_FALLBACK,
  footer = EN_FOOTER_FALLBACK,
}: {
  children: React.ReactNode
  locale?: Locale
  nav?: Dictionary['nav']
  footer?: Dictionary['footer']
}) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={`${locale}-${pathname}`} locale={locale} nav={nav} footer={footer}>
        {children}
      </RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
