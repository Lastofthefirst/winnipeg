# Edge CMS Pattern Analysis

*June 2, 2026 — Winnipeg site review*

## Current State

The site is a Next.js 16 static export (App Router) with two content layers:

1. **Static dictionary files** (`src/i18n/dictionaries/*.ts`) — All marketing copy lives here. Two locales (en/fr). Typed via `Dictionary` interface. Imported at build time by pages.
2. **External API** (`winnipeg-bahais.dust.ridvan.org/api/`) — Events and contact form submissions go through a remote Dust CMS instance. News comes from a static `public/news.json` file.

Content is **not editable by non-technical users**. Changing copy requires touching TypeScript source files and redeploying.

## The edge-cms.md Concept

The document proposes a hardened, reusable CMS pattern: shared-password auth → JWT cookie → edge API → GitHub Contents API → static rebuild. Admin shell loads the public site in an iframe with `?editMode=true` and communicates via `postMessage`.

The concept is solid. The security hardening (JWT, rate limiting, DOMPurify, SHA-mismatch detection) is well thought out. The separation of a reusable library from per-site adapters is the right call for a pattern used across many small sites.

## Core Question: Shared Components Between Site and Admin

The central tension: **how to keep components consistent between the public site and the admin preview without creating indirection that hurts either.**

### The iframe approach (as described in edge-cms.md)

The document proposes loading the *actual public site* in an iframe. This is the cleanest approach — the admin doesn't need to duplicate rendering logic at all. The site renders itself, and the admin shell adds chrome (edit panels, save buttons) around it.

**For this to work, the public site needs a thin edit-mode layer.** The document shows `data-cms-field` attributes and `postMessage` listeners. This is additive — it doesn't restructure components, it decorates them.

### The `withEditOverlay` HOC approach

The document also shows `withEditOverlay(Component, { editableProps })` — a higher-order component that wraps site components with edit affordances. This is useful for the admin's *own* preview rendering but is **not needed on the public site** if the iframe approach is used.

### Recommendation: The "marker" pattern

Neither the iframe nor the HOC approach requires restructuring components. The winning pattern is **attribute-based markers** on the public site:

```tsx
// Site component — unchanged structure, just data attributes in edit mode
function HeroSection({ headline, subhead }) {
  const editable = useEditMode() // returns null in production
  return (
    <section>
      <h1 {...editable("hero", "headline")}>{headline}</h1>
      <p {...editable("hero", "subhead")}>{subhead}</p>
    </section>
  )
}
```

The `useEditMode()` hook is a no-op in production (tree-shaken). In edit mode it returns a function that adds `data-cms-field`, `data-cms-file`, and `onClick` handlers. **The component's JSX structure doesn't change** — only attributes are added.

This solves the "order of component" problem: you're not wrapping the component in a parent editor. You're marking specific DOM nodes within the component as editable. The admin shell listens for clicks on those nodes and opens the appropriate editor panel.

### Content schema as the bridge

The `cms.config.js` (per-site adapter) serves as the single source of truth for what's editable. It maps:

```
file path → file label → component name → field definitions
```

Both the admin shell and the public site's edit mode read from this. The admin knows what fields exist and how to render their editors. The site knows which DOM nodes to mark.

**Critical insight:** The schema doesn't need to describe the full component API. It describes *which props* are editable. A `HeroSection` might have 12 props but only 4 are editable. The schema says so — no component restructuring needed.

## Reliability Concerns

### The site must not depend on CMS infrastructure

The public site reads from dictionary files at build time. This doesn't change. The CMS only writes to those files (via GitHub). **The site is unaffected whether the CMS is up, down, or deleted.**

Events data comes from an external API (`dust.ridvan.org`). If that goes down, the component shows a fallback ("Always gathering" message). This is already reliable.

### Edit mode is additive, not required

The `?editMode=true` layer is:
- Conditionally loaded (only in iframe)
- Tree-shaken from production builds
- Purely attribute-based (no rendering changes)

If edit mode fails, the site still renders correctly — just without edit highlights.

### The rebuild latency

The document acknowledges 30-60 second build latency. For small business sites, this is acceptable. The "building..." spinner manages expectations. The alternative (real-time CMS) adds database costs and complexity that isn't justified for 1-3 editors making occasional copy changes.

## What Would Be Editable on This Site

Mapping the current `Dictionary` interface to editable content:

| Page | Editable fields | Type |
|---|---|---|
| Hero | eyebrow, heading, subheading | text (short) |
| Community section | eyebrow, heading, body paragraphs | text + markdown array |
| Activities | heading, intro, item titles/descriptions | text + array of objects |
| About | heading, body, stats labels, principles | text + array of objects |
| Community Life | All section text and tags | text + markdown arrays |
| Learn More | Central figures, core teachings | text + array of objects |
| Events/News UI strings | eyebrow, heading, intro | text (short) |
| Contact form labels | field labels, subject options | text |
| Meta tags | title, description per page | text |

**Not editable (by design):** Layout structure, component order, image paths, CSS classes, animation behavior. These are developer-controlled.

## Two Content Tiers

This site has two tiers of content that need different handling:

**Tier 1 — Static dictionary content** (marketing copy): These are the strings in `en.ts`/`fr.ts`. This is what the CMS would manage. Converting the TypeScript dictionaries to JSON files (`content/en.json`, `content/fr.json`) would make them editable via the CMS without changing how pages consume them (still imported at build time).

**Tier 2 — Dynamic API content** (events, news): Already managed externally via the Dust API. The edge CMS doesn't need to touch this. If the team wants to unify editing, the edge CMS could write to the same underlying data store, but that's a separate decision.

## The Pattern For Reuse

Across many small sites, the reusable pattern is:

1. **Reusable library** (`@team/cms-edge`, `@team/cms-admin`): Auth, GitHub client, admin shell UI, iframe orchestration, `postMessage` protocol, `useEditMode()` hook.
2. **Per-site adapter**: `cms.config.js` (schema), `cms.preview.tsx` (preview component mappings), and content files (JSON instead of TS dictionaries).
3. **Public site**: Unchanged structure. Adds `useEditMode()` hook calls at content-rendering DOM nodes. Content files are JSON instead of TS (no other change).

The site developer's work is:
- Convert dictionary files from TS to JSON
- Write `cms.config.js` mapping JSON paths to field definitions
- Add `editable()` markers to ~20-40 DOM nodes across pages
- Mount the admin shell at `/admin/`

## Open Questions

1. **Dictionary files as JSON vs TS:** Converting `en.ts` to `content/en.json` loses TypeScript validation at import time. Could keep a `types.ts` for the `Dictionary` interface and use `satisfies` or runtime validation. Or keep TS files and have the CMS write TS (less ideal).

2. **Two-locale editing:** The admin UI needs to support editing both `en` and `fr` variants of the same field. Schema should specify `{ field_name: { type: "text", locales: ["en", "fr"] } }`.

3. **Array editing:** Fields like `items: [{ title, body }]` need an array editor in the admin panel (add/remove/reorder items). The schema `type: "array"` with `itemSchema` handles this, but the admin UI needs a polished array editor.

4. **Image management:** Currently images are pre-generated assets. The CMS could support uploading/replacing images, but this is a larger feature. For phase one, image paths are developer-only.

5. **Build trigger:** After the CMS commits to GitHub, something needs to trigger the static rebuild. Options: GitHub Actions (push-triggered), manual deploy, or the edge API calling a deploy webhook. The edge-cms.md mentions a "building..." state — this implies a webhook callback.

6. **The Dust API integration:** Events come from an external service. If the team wants the edge CMS to manage events too, it would need to write to the same data store rather than GitHub files. Or the Dust API could read from GitHub files (if it supports that). This depends on what "Dust" is and whether it's customizable.

## Verdict

The edge-cms.md concept is a good fit. The key design decisions:

- **Use the iframe approach** — the public site renders itself, admin adds chrome around it
- **Use attribute-based markers** (`data-cms-field`) — no component restructuring needed
- **Convert dictionaries to JSON** — makes them editable without changing page logic
- **Keep the site fully independent** — CMS writes files, site reads them. No coupling.
- **Schema as the bridge** — one `cms.config.js` describes what's editable for both admin and site

The pattern is reusable across small sites with minimal per-site work: schema definition + marker placement.
