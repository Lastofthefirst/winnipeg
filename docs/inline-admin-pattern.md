# Inline Section Editor Pattern

A lightweight content editor that renders **actual site components** in an admin shell, allowing non-technical users to click and edit text or replace images in context.

## Concept

The admin page imports the same JSX components used by the public site and renders them inside an admin chrome. Each section appears as it would on the live site, with subtle indicators showing which fields are editable.

The admin frame — header, language toggle, save button — is **consistent code across all sites**. What varies is which sections are loaded and which fields within them are editable.

### How it differs from the iframe approach

The iframe approach loads the actual site in a preview frame and communicates via `postMessage`. It works but adds complexity (iframe synchronization, message protocol, dual rendering). The inline approach renders components directly in the admin — one render, one source of truth, no messaging layer.

**Use this pattern when:** the site has a defined set of editable sections (homepage hero, about text, events list) and the rest is fixed. The editor sees only what can be edited.

## Architecture

```
┌─────────────────────────────────────────────┐
│              Admin Shell (consistent)        │
│  ┌───────────────────────────────────────┐  │
│  │  Header: Title | EN/FR toggle | Save  │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │  "Hero — Homepage" (section label)    │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  HeroSection (real component)   │  │  │
│  │  │  • editable eyebrow, heading,   │  │  │
│  │  │    subheading                   │  │  │
│  │  │  • static background image      │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │  "Community — Homepage"               │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  CommunitySection (real comp)   │  │  │
│  │  │  • editable eyebrow, heading,   │  │  │
│  │  │    body paragraphs              │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │  "Events — Events Page"               │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │  EventsList (real component)    │  │  │
│  │  │  • editable per-event fields    │  │  │
│  │  │  • + Add Event button           │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

## The Admin Frame (consistent across sites)

The admin shell is a single page at `/admin` with:

- **Sticky header bar** — site title, language toggle (when multilingual), "Push Changes" button
- **Section containers** — each editable section in a card with vertical margin and horizontal padding from viewport edges. This makes it clear the user is in the editor, not on the live site.
- **Table of contents** — when there are more than ~5 sections, a sidebar or jump-nav at the top for quick navigation.
- **"Push Changes" CTA** — bottom bar repeating the save action. Changes are staged locally, not auto-saved.

The frame styling should match the site's palette (same font families, color tokens) but be visually distinct from the site itself (lighter/darker background, card containers).

### Language toggle

For multilingual sites, a prominent toggle (pill or segmented control) in the header switches between locales. Switching resets the view to that language's content.

## Component Reuse (single source of truth)

**The admin imports the actual components from the site.** When the frontend is redesigned, the admin updates automatically.

This requires components to accept their content as **props** rather than importing from a global dictionary or context:

```tsx
// BEFORE (component reads its own content)
function HeroSection() {
  const t = useDictionary()
  return <h1>{t.hero.heading}</h1>
}

// AFTER (component accepts content props)
function HeroSection({ eyebrow, heading, subheading, image }) {
  return (
    <div className="hero">
      <p>{eyebrow}</p>
      <h1>{heading}</h1>
      <p>{subheading}</p>
      <img src={image} />
    </div>
  )
}
```

The public site passes real content from its dictionary. The admin passes editable state. Same component, different data source.

## Specifying Editable Fields

A per-site config declares which sections are exposed in the admin and which fields within them are editable:

```typescript
// src/admin/config.ts
export const adminSections = [
  {
    id: 'hero',
    label: 'Hero',
    page: 'Homepage',
    component: HeroSection,
    fields: ['eyebrow', 'heading', 'subheading'],
    // image is NOT in fields list — not editable
  },
  {
    id: 'community',
    label: 'Community Snapshot',
    page: 'Homepage',
    component: CommunitySection,
    fields: ['eyebrow', 'heading', 'body'],
    imageField: 'image',  // image IS editable
  },
]
```

The admin frame reads this config and renders each component with editable wrappers around the declared fields. Fields not listed render as-is (static).

### Editable text

Text fields get a subtle hover highlight and click-to-edit behavior:
- Hover: background tints (amber/brand color at low opacity)
- Click: replaces text with an inline input or textarea (auto-sized by content length)
- Blur or Enter: exits edit mode, stages the change

### Editable images

Images get a subtle overlay with a replace icon on hover:
- Hover: semi-transparent overlay with a camera/replace icon centered
- Click: opens a file picker for image upload
- The uploaded image replaces the current one in local state
- On save, the image is written to `public/` and the content reference is updated

## Handling List-Based Content (Events, Activities, etc.)

Some sections render lists of items where the user may want to add, remove, or reorder entries (events, news items, team members).

The pattern: render the actual component, but wrap the list container with admin affordances:

```tsx
function EventsSectionAdmin({ events, onChange }) {
  return (
    <div>
      <EventsList items={events} />
      <button onClick={() => onChange([...events, createEmptyEvent()])}>
        + Add Event
      </button>
    </div>
  )
}
```

Each list item gets:
- **Editable fields** (title, date, description) via the same text wrapper
- **Remove button** (trash icon, visible on hover) — removes from local state
- **Reorder handles** (drag handle or up/down arrows) — optional, for sections where order matters

The "Add" button sits below the list, outside the rendered component. It appends an empty item to the local state. The component re-renders with the new item, and the user fills it in.

## Implementation Pattern

### 1. Make site components prop-driven

Convert components from reading a global dictionary to accepting content as props. The public site passes dictionary values; the admin passes editable state.

### 2. Create the admin config

Define which sections are exposed and which fields are editable. This is the per-site customization.

### 3. Build the admin page

The admin page at `/admin` imports the admin frame (consistent), the config (per-site), and renders each section:

```tsx
// src/app/admin/page.tsx
'use client'
import { AdminShell } from '@/admin/shell'
import { adminSections } from '@/admin/config'

export default function AdminPage() {
  // State for locale, content, editing field, dirty flag
  return (
    <AdminShell>
      {adminSections.map((section) => (
        <SectionCard key={section.id} section={section}>
          <section.component
            {...content[section.id]}
            editMode={{ editingField, onFieldClick, onFieldChange }}
          />
        </SectionCard>
      ))}
    </AdminShell>
  )
}
```

### 4. Wire up save

The "Push Changes" button writes staged changes to the content source (JSON files, API endpoint, git commit, etc.). This is the integration layer — separate from the UI pattern.

## What is per-site vs reusable

| Layer | Scope |
|---|---|
| Admin shell (header, language toggle, save button, section cards) | **Reusable** — same code across all sites |
| Editable text wrapper (hover highlight, click-to-edit) | **Reusable** |
| Editable image wrapper (hover overlay, file picker) | **Reusable** |
| List item wrapper (add/remove/reorder) | **Reusable** |
| Admin config (which sections, which fields) | **Per-site** |
| Site components (HeroSection, EventsList, etc.) | **Per-site** — imported from the actual site |
| Save integration (write to JSON, git, API) | **Per-site** or per-deployment |

## Notes

- **Sections are isolated.** They render independently, not as a continuous page. Each section container has vertical margin and horizontal padding. This makes it clear the user is in the editor, not previewing the live site.
- **Sections can come from different pages.** The config declares source (e.g., "Homepage", "About", "Events Page") purely for labeling — the admin doesn't care about URL routing.
- **Images load normally.** Since components render directly (not in an iframe), images resolve the same way they do on the public site.
- **Non-editable fields render as-is.** The component renders fully; only the declared fields get edit affordances. This keeps the admin faithful to the actual site appearance.
