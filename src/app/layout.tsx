import { type Metadata } from 'next'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Bahá\'í Community of Winnipeg',
    default: 'Bahá\'í Community of Winnipeg - Official Community Website',
  },
  description:
    'The official website of the Bahá\'í Community of Winnipeg, Manitoba. Learn about the Bahá\'í Faith, community activities, and upcoming events.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full bg-burgundy-900 text-base antialiased">
      <head>
        <script defer data-domain="winnipeg.pages.dev" src="https://stats.ridvan.org/js/script.js" />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  )
}
