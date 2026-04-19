import type { Locale, Dictionary } from './types'

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await import(`./dictionaries/${locale}`)).default
}
