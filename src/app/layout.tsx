import { type Metadata } from 'next'

import { StyleProvider } from '@/components/StyleSwitcher'
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
    <html lang="en" className="h-full bg-burgundy-900 text-base antialiased">
      <body className="flex min-h-full flex-col">
        <StyleProvider>{children}</StyleProvider>
      </body>
    </html>
  )
}
