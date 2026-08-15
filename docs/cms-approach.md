# Built-in GitHub Pages CMS — Approach Summary

## Architecture at a Glance

The CMS is a **password-gated admin page** built into the Next.js site at `/admin/`. It reads content as JSON files from GitHub, lets the client edit in a visual form, then commits changes back to the repo using the GitHub Git Trees API. The Cloudflare Pages build triggers automatically on push, rebuilding the static site.

No external CMS, no database, no headless service — just **Git as the backend**.

---

## Content Model: JSON files as the single source of truth

All editable content lives in `content/cms/` as plain JSON:

```
content/cms/
  en.json          # English CMS-editable fields
  fr.json          # French CMS-editable fields
  writings.json    # Writings/prayer entries (language-agnostic)
```

Each JSON file maps to **named sections** (hero, community, activities, events) with nested fields. The site imports these at **build time** into the i18n dictionaries, where CMS values **override** static defaults via `mergeCms()`.

```ts
// Dictionary merges CMS over fallback defaults:
home: {
  hero: mergeCms({ eyebrow: "Fallback...", heading: "Fallback...", ... }, cms.hero),
  community: mergeCms({ ...defaults... }, cms.community),
  // ...
}
```

This means the static site always has safe fallback content, while CMS edits take precedence.

---

## Built-in Sections

The admin defines sections in `src/admin/config.ts`:

```ts
export const adminSections = [
  { id: 'hero', label: 'Hero', page: 'Homepage', fields: ['hero.eyebrow', 'hero.heading', ...] },
  { id: 'community', label: 'Community Snapshot', page: 'Homepage', fields: [...], imageFields: [...] },
  { id: 'activities', label: 'Activities', page: 'Homepage', fields: [...], imageFields: [...] },
  { id: 'events', label: 'Events', page: 'Events Page', fields: [], isList: true },
]
```

Each section is rendered as a **SectionCard** in the admin — a card with a label, page context, and locale toggle. The section's fields are exposed as inline editable components.

---

## Editable Components

Two primitives handle in-place editing:

### EditableText
Wraps any text node. On click, an absolutely-positioned input overlays the text (zero layout shift). Blur or Enter commits the change into local state. Uses `<textarea>` for long/multi-line content, `<input>` for short text.

### EditableImage
Wraps images with a hover overlay ("Replace Image"). Click opens a file picker; selected file creates a local object URL.

### DatePicker / TimePicker
Specialized editable fields for events — inline pickers that follow the same click-to-edit pattern.

---

## Per-section Locale Toggles

Each section card has an EN/FR toggle. When a section is in "EN" mode, edits go into `contentEnState`; in "FR" mode, edits go into `contentFrState`. This allows editing each section independently in either language. The "Push to Live" button commits only the locales that were actually changed.

---

## List-based Sections (Events, Writings)

Sections marked `isList: true` use a different editing model:

- **Events**: Grid of event cards with inline date/time pickers. "Add Event" / "Remove" buttons.
- **Writings**: Card grid with language filter, image picker from a pre-defined set, and add/edit forms with autocomplete for language and source fields.

These use their own handlers (`handleAddEvent`, `handleRemoveEvent`, `handleAddWriting`, etc.) that mutate the local state arrays.

---

## GitHub Integration

### Reading
On login, `fetchFile()` from `src/admin/github.ts` fetches the latest JSON from the GitHub Contents API for each locale file. This ensures the admin always starts with the live repo state.

### Writing (Atomic Commits)
`commitFiles()` uses the **Git Trees API** for atomic multi-file commits:

1. Fetch current branch ref → get head commit SHA
2. Get current commit's tree SHA (base tree)
3. Create blobs for each changed file
4. Create a new tree from base_tree + all blobs
5. Create a commit pointing to the new tree
6. Update the branch ref to the new commit

This ensures all locale files are committed in **one atomic commit**, triggering only **one** Cloudflare build regardless of how many files changed.

### Concurrent Edit Protection
If the branch ref update fails with 422 (SHA mismatch), the admin shows a conflict error.

---

## Auth

Simple shared password (`nineyearplan`) checked client-side. Session persisted in `localStorage`. The GitHub PAT is embedded at build time via `NEXT_PUBLIC_GITHUB_PAT`. The admin route itself is the access control boundary.

---

## Build Flow

1. Client edits content in `/admin/`
2. Clicks "Push to Live"
3. Changes committed atomically to GitHub (all dirty locale files in one commit)
4. Cloudflare Pages detects push → triggers static build (~2 min)
5. Admin shows countdown timer; site rebuilds from the updated JSON
6. CMS values merge over dictionary defaults at build time → live site updated

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| JSON over MDX/frontmatter | Simpler for non-technical clients to edit; no template syntax to learn |
| Git Trees API for commits | Atomic multi-file changes, single build trigger |
| Sections as cards, not live page | More stable editing surface; no iframe complexity; works with any page layout |
| mergeCms() pattern | Safe defaults in code; CMS overrides at build time; easy to add new editable fields |
| Per-section locale toggle | Client can work on EN or FR independently per section |
| Writings as separate JSON + image picker | Writings are numerous and have their own structure; image picker avoids manual path entry |
