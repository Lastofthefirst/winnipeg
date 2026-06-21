// ─── Admin sections config ──────────────────────────────────────────────────
// Declares which sections are exposed in the admin and which fields are editable.
// This is the per-site customization — the admin shell is reused across sites.

export interface AdminSection {
  id: string
  label: string
  page: string        // e.g. "Homepage", "Events Page" — for labeling only
  fields: string[]    // dot-separated field paths that are editable
  imageFields?: string[]  // dot-separated paths to editable images
  isList?: true  // marks this as a list-based section (events, news, etc.)
}

export const adminSections: AdminSection[] = [
  {
    id: 'hero',
    label: 'Hero',
    page: 'Homepage',
    fields: ['hero.eyebrow', 'hero.heading', 'hero.subheading'],
  },
  {
    id: 'community',
    label: 'Community Snapshot',
    page: 'Homepage',
    fields: ['community.eyebrow', 'community.heading', 'community.body.0', 'community.body.1'],
    imageFields: ['community.image'],
  },
  {
    id: 'activities',
    label: 'Activities',
    page: 'Homepage',
    fields: [
      'activities.intro',
      'activities.items.0.title', 'activities.items.0.description',
      'activities.items.1.title', 'activities.items.1.description',
      'activities.items.2.title', 'activities.items.2.description',
      'activities.items.3.title', 'activities.items.3.description',
    ],
    imageFields: [
      'activities.items.0.image',
      'activities.items.1.image',
      'activities.items.2.image',
      'activities.items.3.image',
    ],
  },
  {
    id: 'events',
    label: 'Events',
    page: 'Events Page',
    fields: [],  // events handled separately as a list
    isList: true as const,  // marks this as a list-based section (events, news, etc.)
  },
]
