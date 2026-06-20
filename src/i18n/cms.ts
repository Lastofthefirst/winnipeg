// ─── CMS content types ──────────────────────────────────────────────────────
// Defines the shape of content editable through the admin panel.
// Merged into dictionaries at build time so the static site has live content.

export interface CmsHero {
  eyebrow: string
  heading: string
  subheading: string
  ctaActivities: string
  ctaContact: string
}

export interface CmsCommunity {
  eyebrow: string
  heading: string
  body: string[]
  link: string
}

export interface CmsActivityItem {
  title: string
  description: string
}

export interface CmsActivities {
  heading: string
  intro: string
  items: CmsActivityItem[]
}

export interface CmsEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
}

export interface CmsEditableFields {
  hero: CmsHero
  community: CmsCommunity
  activities: CmsActivities
  events: CmsEvent[]
}

/**
 * Merge CMS-editable fields over dictionary defaults.
 * CMS values take precedence; dictionary provides safe fallbacks.
 */
export function mergeCms<T extends Record<string, unknown>>(defaults: T, cms: Partial<T>): T {
  return { ...defaults, ...cms }
}
