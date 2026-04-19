import type { Locale } from './types'

export function getCmsField(item: Record<string, unknown>, field: string, locale: Locale): string {
  return (item[`${field}_${locale}`] ?? item[`${field}_en`]) as string
}
