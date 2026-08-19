import clsx from 'clsx'

import type { Dictionary, Locale } from '@/i18n/types'
import { formatEventDate } from '@/utils/events'
import type { Recurrence } from '@/utils/events'

interface EventRepeatProps {
  repeat: Recurrence
  endDate?: string
  locale: Locale
  labels: Dictionary['events']['repeat']
  className?: string
}

export function EventRepeat({
  repeat,
  endDate,
  locale,
  labels,
  className,
}: EventRepeatProps) {
  const parts = [labels[repeat]]
  if (endDate) {
    parts.push(`${labels.until} ${formatEventDate(endDate, locale, { short: true })}`)
  }
  return (
    <p
      className={clsx(
        'font-display text-[11px] uppercase tracking-[0.2em] text-gold-600',
        className,
      )}
    >
      {parts.join(' · ')}
    </p>
  )
}
