# CMS Extraction Plan — Reusable Library & LLM Package

*A design document for turning the Winnipeg site's inline admin pattern into a portable, well-documented system that an LLM can implement on new static sites with minimal hand-holding.*

---

## 1. What We Have Now (Audit)

### Current Architecture

| Layer | Implementation | Assessment |
|---|---|---|
| **Auth** | Client-side password check (`ADMIN_PASSWORD` string in `page.tsx`) | Weak — plaintext in bundle, no session |
| **Data storage** | JSON files in `content/cms/{en,fr}.json` committed via GitHub API | Good — git-backed, versioned, zero database |
| **Build trigger** | GitHub push triggers Cloudflare Pages rebuild | Good — 30–60s latency, acceptable for this use case |
| **Admin UI** | Inline components (`src/admin/*`) rendered directly in admin page | Good — no iframe, components are actual site components |
| **Editable wrappers** | `EditableText`, `EditableImage`, `DatePicker`, `TimePicker` | Solid — hover-to-highlight, click-to-edit, zero layout shift |
| **Content merge** | `mergeCms(defaults, cms)` in dictionary files | Clever — defaults are TypeScript, CMS overrides are JSON |
| **i18n** | Two JSON files (en/fr), language toggle in admin shell | Good — simple, works for bilingual sites |
| **List editing** | Events with add/remove/reorder | Good — patterned, extensible |
| **GitHub client** | Direct fetch to GitHub Contents API with `NEXT_PUBLIC_GITHUB_PAT` | Risky — PAT exposed in client bundle |
| **Per-site code** | `src/app/admin/page.tsx` is ~450 lines of section wiring | Brittle — all site-specific admin logic in one file |
| **Config** | `src/admin/config.ts` declares sections but is not actually used by the admin page | Dead code — the config interface exists but page.tsx hardcodes everything |

### What's Working Well

1. **Inline editing experience.** No iframe, no `postMessage` protocol. The admin renders the *actual* site components with editable wrappers. This is the strongest feature — keep it.
2. **JSON-as-source-of-truth.** Content files are plain JSON. The public site imports them at build time. The admin reads/writes them via GitHub. Simple, reliable, no runtime CMS dependency.
3. **Default + override pattern.** TypeScript dictionaries provide safe fallbacks. JSON overrides apply on top. If the CMS disappears, the site still builds and renders.
4. **Edit-in-place affordances.** Amber hover tint, absolute-positioned overlay inputs, blur-to-save locally. Intuitive and zero-layout-shift.

### What's Broken or Risky

1. **PAT exposed client-side.** `NEXT_PUBLIC_GITHUB_PAT` is embedded in the JS bundle. Anyone with the password (which is also in the bundle) can extract the token. This is the biggest security gap.
2. **No server-side auth.** Password is plaintext string comparison in React state. No session, no rate limiting, no JWT.
3. **No SHA-mismatch handling.** If two people edit concurrently, the second commit fails with no conflict UI.
4. **Admin page is one massive file.** All section wiring, all type definitions, all handlers in `src/app/admin/page.tsx`. Adding a new editable section means editing this file.
5. **Config file is unused.** `src/admin/config.ts` has a nice schema but the admin page ignores it and hardcodes section components inline.
6. **No validation.** Content written to GitHub is not schema-validated. A bad edit could corrupt the JSON and break the build.
7. **Image uploads are object URLs.** `EditableImage` creates `URL.createObjectURL()` — images are not persisted. This is a known limitation.

---

## 2. The Core Design Decision

**Keep the inline pattern. Harden the security. Package the reusable parts.**

The `edge-cms.md` document proposes an iframe + `postMessage` + edge API approach. The `cms-pattern-analysis.md` correctly identifies that the iframe adds complexity without clear benefit *for this use case*. The inline approach (actual components rendered in admin shell) is simpler and produces a better editing experience.

The winning architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│  Admin Page (per-site)                                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Admin Shell (reusable library)                         │  │
│  │  • Sticky header (title, locale toggle, save button)    │  │
│  │  • Section cards with labels                            │  │
│  │  • Bottom CTA bar                                       │  │
│  │  • Dirty tracking, push status, toast messages          │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Site Sections (per-site, imported from actual site)      │  │
│  │  • HeroSection, CommunitySection, etc.                    │  │
│  │  • Wrapped with EditableText/EditableImage                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ fetch (client-side, to edge API)
┌─────────────────────────────────────────────────────────────────┐
│  Edge API Route (reusable library)                              │
│  • POST /auth — password → JWT cookie                           │
│  • GET /content?file=... — read file via GitHub API             │
│  • POST /content — validate → sanitize → commit to GitHub       │
│  • Rate limiting, path whitelist, SHA-mismatch detection        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                        ┌─────────────┐
                        │   GitHub    │
                        │  Contents   │
                        │    API      │
                        └─────────────┘
```

**Why not the iframe approach?**
- The iframe approach requires the public site to support an `?editMode=true` query param, add `data-cms-field` attributes, and listen for `postMessage`. This touches *every* public page component.
- The inline approach requires only that components accept content as props (which they already do, or can be made to do). The admin imports and renders them. No changes to public pages.
- The iframe approach needs a `postMessage` protocol, edit-mode hook, and marker system. The inline approach just renders React components with wrapper props.
- The iframe approach shines when the site is *not* React-based (e.g., Astro, Svelte, plain HTML). But for Next.js sites, inline is strictly simpler.

---

## 3. What Goes Into the Library vs What Stays Per-Site

### Library (`@yourteam/static-cms` or internal monorepo package)

| Module | Contents |
|---|---|
| `AdminShell` | Header, locale toggle, save button, section card container, dirty status, push status, bottom CTA |
| `SectionCard` | Card wrapper with label, page tag, optional locale toggle per card |
| `EditableText` | Hover highlight, click-to-edit, input/textarea overlay, blur/Enter commit |
| `EditableImage` | Hover overlay, file picker, object URL (with clear documentation that real upload needs backend) |
| `EditableDate` / `EditableTime` | Date/time pickers with locale formatting |
| `ListEditor` | Add/remove/reorder wrapper for array fields |
| `useAdminContent` | Hook: fetch content from edge API, manage local state, track dirty, handle pushes |
| `useFieldChange` | Hook: generic deep path updater (`hero.heading`, `events.0.title`) |
| `createCMSApiRoute` | Next.js Route Handler factory — auth, rate limit, GitHub I/O, validation |
| `LoginScreen` | Password field, submit to edge API, handle 429/rate-limit |
| `types.ts` | All TypeScript interfaces for config, content, API responses |

### Per-Site (what the LLM writes for each new site)

| Module | Contents |
|---|---|
| `app/admin/page.tsx` | Import `AdminShell` from library, import site sections, wire up with `useAdminContent` |
| `cms.config.ts` | Declare which sections are editable and which fields. **This is the single source of truth.** |
| `app/api/cms/route.ts` | One line: `export { createCMSApiRoute } from '@yourteam/static-cms'` with site config |
| `.env.local` / hosting secrets | `CMS_PASSWORD`, `CMS_JWT_SECRET`, `GITHUB_PAT` |
| Site sections (already exist) | Ensure components accept content as props (not reading from global dictionary) |
| `content/cms/*.json` | Content files (created empty or seeded from dictionary defaults) |

---

## 4. The Schema-Driven Admin (The Key Insight)

The most important design decision for making this LLM-friendly is **schema-driven rendering.** Instead of the admin page containing hand-wired section components, it should iterate over a config schema and render each section declaratively.

### Current (bad — hand-wired)

```tsx
// src/app/admin/page.tsx — 450 lines, every section hardcoded
<SectionCard label="Hero">
  <HeroSection {...content.hero} editing={editing} onEdit={...} />
</SectionCard>
<SectionCard label="Community">
  <CommunitySection {...content.community} editing={editing} onEdit={...} />
</SectionCard>
// ... 4 more sections, each with bespoke prop drilling
```

Adding a new section means editing this file. The LLM has to understand the entire file to add one section.

### Proposed (good — schema-driven)

```tsx
// cms.config.ts
export const cmsConfig = defineCmsConfig({
  contentFiles: {
    en: 'content/cms/en.json',
    fr: 'content/cms/fr.json',
  },
  locales: ['en', 'fr'],
  sections: [
    {
      id: 'hero',
      label: 'Hero',
      page: 'Homepage',
      component: () => import('@/components/HeroSection'),
      fields: {
        eyebrow: { type: 'text', maxLength: 80 },
        heading: { type: 'text', maxLength: 200 },
        subheading: { type: 'text', maxLength: 300 },
      },
    },
    {
      id: 'community',
      label: 'Community',
      page: 'Homepage',
      component: () => import('@/components/CommunitySection'),
      fields: {
        eyebrow: { type: 'text' },
        heading: { type: 'text' },
        body: { type: 'array', itemType: 'text' },
      },
      images: ['image'],
    },
    {
      id: 'events',
      label: 'Events',
      page: 'Events',
      component: () => import('@/components/EventsList'),
      fields: {
        items: {
          type: 'array',
          itemSchema: {
            title: { type: 'text' },
            date: { type: 'date' },
            time: { type: 'time' },
            location: { type: 'text' },
          },
        },
      },
    },
  ],
})
```

```tsx
// app/admin/page.tsx — ~40 lines, never changes
'use client'
import { AdminShell, useAdminContent, SchemaDrivenSections } from '@yourteam/static-cms'
import { cmsConfig } from './cms.config'

export default function AdminPage() {
  const { content, setContent, dirty, pushing, pushStatus, pushMessage, locale, setLocale } =
    useAdminContent(cmsConfig)

  return (
    <AdminShell
      locale={locale}
      onLocaleChange={setLocale}
      dirty={dirty}
      pushing={pushing}
      pushStatus={pushStatus}
      pushMessage={pushMessage}
      onPush={() => pushContent(content)}
    >
      <SchemaDrivenSections config={cmsConfig} content={content} onChange={setContent} />
    </AdminShell>
  )
}
```

**Why this is better for LLM implementation:**
- The LLM only needs to write `cms.config.ts` — a declarative schema.
- The LLM doesn't need to understand the admin page's internal state machinery.
- The LLM doesn't write any React wiring — it just declares "this component has these editable fields."
- If the LLM makes a mistake in the schema, it's isolated to one file. If it makes a mistake in hand-wired JSX, it could break the entire admin page.
- The library handles all the complex `onFieldChange` path parsing, array mutations, and dirty tracking.

---

## 5. Content Schema Format

The schema needs to be rich enough to describe what's editable but simple enough that an LLM can generate it from looking at a site's components.

```typescript
// Types the library exports
export type FieldType = 'text' | 'textarea' | 'date' | 'time' | 'image' | 'array'

export interface FieldSchema {
  type: FieldType
  label?: string
  maxLength?: number
  // For arrays:
  itemType?: 'text' | 'object'
  itemSchema?: Record<string, FieldSchema>
}

export interface SectionSchema {
  id: string           // key in content JSON
  label: string        // shown in admin UI
  page?: string        // e.g. "Homepage", for grouping
  component: string    // import path or lazy loader
  fields: Record<string, FieldSchema>
  images?: string[]    // field names that are image paths
  bgColor?: string     // card background class
}

export interface CmsConfig {
  contentFiles: Record<string, string>  // locale -> file path
  locales: string[]
  defaultLocale: string
  sections: SectionSchema[]
  github: {
    owner: string
    repo: string
    branch: string
    allowedPaths: string[]
  }
  rateLimit?: { windowSeconds: number; maxAttempts: number }
}
```

---

## 6. The Edge API (Security Hardening)

**Deployment target:** The edge API runs as a **Cloudflare Pages Function** (or equivalent edge platform). Next.js `output: 'export'` disables built-in API routes at build time, so the server-side layer is deployed as platform-native edge functions instead.

The library provides a factory that creates a Cloudflare Pages Function handler. The per-site file is one line:

```typescript
// functions/api/cms/[[path]].ts (Cloudflare Pages Functions)
import { createCMSHandler } from '@yourteam/static-cms/edge'
import { cmsConfig } from '../../src/admin/cms.config'

export const onRequest = createCMSHandler(cmsConfig)
```

The factory handles:

### Auth Flow

```
POST /api/cms/auth
  Body: { password }

  Edge function:
    1. Compare password with env.CMS_PASSWORD using constant-time string comparison
    2. If valid: sign a JWT (HMAC-SHA256 via Web Crypto API, no external crypto library)
    3. Set cookie: cms-session=<jwt>; HttpOnly; Secure; SameSite=Strict; Max-Age=7776000; Path=/admin
    4. Return { ok: true }
```

**Cookie properties:**
- `HttpOnly` — JavaScript can't read it
- `Secure` — HTTPS only
- `SameSite=Strict` — only sent on same-site requests
- `Max-Age=7776000` — 90 days. The device is treated as trusted. No forced re-authentication within this window
- `Path=/admin` — only sent for admin and API routes

Subsequent API calls (`/api/cms/content`, `/api/cms/push`) automatically include this cookie. The edge function verifies the JWT signature and expiry before doing anything with GitHub.

**Why no bcrypt?** For a single shared password on an edge function, `bcrypt` is heavy and requires a WASM polyfill. A constant-time comparison of a strong, random password (e.g., `openssl rand -base64 24`) is sufficient. Even if an attacker knows the comparison is happening, guessing a 32-character random string is computationally infeasible.

| Concern | Implementation |
|---|---|
| **Auth** | POST `{ password }` → constant-time compare → issue `HttpOnly; Secure; SameSite=Strict` JWT cookie |
| **Session** | JWT in cookie, 90-day expiry, verified on every request |
| **Rate limit** | Per-IP KV counter for auth attempts (5 per 15 min) |
| **Path whitelist** | Only allow paths starting with `content/` or `data/` |
| **Content validation** | JSON Schema validation against per-site schema before commit |
| **Sanitization** | DOMPurify on HTML/markdown fields (if any) |
| **SHA mismatch** | Fetch current SHA before write; on 422, return conflict error for UI to handle |
| **Audit log** | Commit messages prefixed with `cms:`; optional audit file |

**Critical:** The GitHub PAT lives only in the edge function environment, never in the client bundle.

---

## 7. LLM Implementation Workflow

This is the answer to your core question: *"What's the best way to bundle code and documentation so an LLM can implement this on a new static site without additional guidance?"*

### The Package Structure

```
@yourteam/static-cms/
├── README.md              # Quick start — the ONLY file the LLM reads first
├── SETUP-GUIDE.md         # Detailed step-by-step with decision trees
├── docs/
│   ├── CONCEPT.md         # Philosophy and architecture overview
│   ├── SECURITY.md        # Threat model and hardening decisions
│   ├── TROUBLESHOOTING.md # Common errors and solutions
│   └── DECISION-LOG.md    # Why we chose inline over iframe, etc.
├── src/
│   ├── client/            # React components and hooks (admin UI)
│   ├── edge/              # Edge API route factory (Next.js)
│   └── types.ts
├── examples/
│   ├── nextjs-app-router/ # Complete working example site
│   └── minimal/           # Bare-bones 1-section example
└── package.json
```

### The LLM Prompt Pattern

When giving this to an LLM to implement on a new site, the prompt should be:

```
Implement the static-site CMS from @yourteam/static-cms on this existing site.

Steps:
1. Read the package README.md for quick start.
2. Identify which sections of the site should be editable (marketing copy, not layout).
3. For each editable section, ensure the component accepts its content as props.
4. Write cms.config.ts declaring the editable sections and fields.
5. Create app/admin/page.tsx using the library's AdminShell and SchemaDrivenSections.
6. Create app/api/cms/route.ts using the library's createCMSHandler.
7. Convert existing content from hardcoded TS to JSON files in content/cms/.
8. Update public pages to import JSON content at build time.
9. Add environment variables for password hash, JWT secret, and GitHub PAT.

Style the admin shell to match the site's color palette and typography.
Do not create new component files — import existing ones from the site.
```

### Why This Works for LLMs

1. **Clear boundaries.** The LLM knows exactly what's library (don't touch) vs what's per-site (you write this).
2. **Schema-driven.** The LLM's main creative task is writing `cms.config.ts` — a declarative file. It doesn't need to write complex stateful React logic.
3. **Single source of truth.** The schema drives both the admin UI and the edge API validation. No duplication.
4. **Familiar patterns.** It uses Next.js App Router, React hooks, and Tailwind (already used in the site). No new framework to learn.
5. **Example sites.** The `examples/` directory shows what a finished implementation looks like. The LLM can pattern-match.

---

## 8. Migration Path From Current Code

### Phase 1: Extract Reusable Library (no new sites yet)

1. Create a new package/directory for the library code.
2. Move `AdminShell`, `SectionCard`, `EditableText`, `EditableImage`, `DatePicker`, `TimePicker` into the library.
3. Generalize them: remove hardcoded Tailwind classes (burgundy, gold, ivory) and accept a `theme` prop or CSS variables.
4. Create `useAdminContent` and `useFieldChange` hooks that encapsulate the 200+ lines of state logic from `page.tsx`.
5. Create `SchemaDrivenSections` component that reads a config and renders sections with editable wrappers automatically.
6. Extract the GitHub client into an edge-safe module. Create `createCMSHandler` factory.
7. Write comprehensive types.

### Phase 2: Refactor Winnipeg Site (dogfood the library)

1. Replace `src/app/admin/page.tsx` with a thin wrapper using the library.
2. Write a proper `cms.config.ts` that the admin page actually uses.
3. Move auth to the edge API route. Remove `NEXT_PUBLIC_GITHUB_PAT` from client env.
4. Move password to edge env, add JWT sessions, rate limiting.
5. Add SHA-mismatch detection and conflict UI.
6. Validate content server-side before commit.

### Phase 3: Package for Distribution

1. Publish as npm package or internal monorepo package.
2. Create the `examples/` directory with a minimal Next.js site demonstrating the pattern.
3. Write the documentation (README, SETUP-GUIDE, etc.) with the LLM consumer in mind.
4. Test by having an LLM implement it on a fresh site using only the documentation.

---

## 9. Open Questions

1. **How does the library handle Tailwind theming?**
   - Option A: Library components accept a `theme` object mapping semantic names to Tailwind classes. Verbose but flexible.
   - Option B: Library uses CSS variables (`--cms-primary`, `--cms-surface`, etc.) and the per-site provides a small CSS file. Cleanest.
   - Option C: Library ships unstyled or with minimal styling; per-site wraps components. Most flexible but more work.
   - **Recommendation: Option B.** The LLM writes a 20-line CSS file with the site's colors as CSS variables. The library uses those variables.

2. **How are images actually uploaded?**
   - Current code uses `URL.createObjectURL()` — images disappear on refresh.
   - For a real implementation, the edge API needs to accept image uploads, write them to `public/`, and commit via GitHub.
   - This is a larger feature. Phase 1 should document the limitation. Phase 2 should implement upload via edge API.

3. **What about non-Next.js sites?**
   - The iframe approach (from `edge-cms.md`) becomes relevant here. For Astro, SvelteKit, or plain HTML sites, the iframe + `postMessage` pattern is better because the admin can't import React components.
   - **Recommendation:** Phase 1 targets Next.js App Router only. Document that other frameworks need the iframe approach (a future Phase 4).

4. **Should the library include a CLI scaffold?**
   - `npx @yourteam/static-cms init` could scan the site, suggest editable sections, and generate a starter `cms.config.ts`.
   - This is a nice-to-have. The LLM can do this work manually for now.

---

## 10. Summary

| Aspect | Current State | Target State |
|---|---|---|
| **Architecture** | Inline components, hand-wired | Inline components, schema-driven |
| **Auth** | Client-side plaintext | Edge JWT sessions + constant-time compare |
| **GitHub PAT** | In client bundle | In edge env only |
| **Per-site code** | ~450 line admin page | ~40 line admin page + schema config |
| **Adding a section** | Edit admin page, add types, wire props | Add to schema config |
| **LLM friendliness** | Low — must understand full page.tsx | High — just write declarative schema |
| **Security** | Weak | Hardened (JWT, rate limit, validation) |
| **Reusability** | None | Publishable library |

The key enabler is moving from **imperative section wiring** (hand-coding each section into the admin page) to **declarative schema config** (describing what's editable and letting the library render it). This is what makes the package consumable by an LLM with minimal guidance.
