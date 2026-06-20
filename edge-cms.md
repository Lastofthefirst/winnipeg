I'll write a hardened concept document that keeps the shared-password simplicity for non-technical clients while fixing the security gaps, and clearly separates the reusable library from per-site work.

---

# Hardened Static-Site CMS — Concept Document
*For small teams & non-technical clients. Shared-password auth. Edit-in-place experience.*

---

## 1. Philosophy

**Keep what works:** Git-backed content, static hosting, zero database, serverless edge API.  
**Harden what doesn't:** Replace localStorage auth with signed JWT sessions, add rate limiting, concurrent-edit detection, and server-side content validation.  
**The client experience:** They visit `/admin/`, enter a password, and see their *actual website* with editable regions highlighted. They click, edit, save. The site rebuilds in ~30 seconds.

---

## 2. Architecture Overview

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Public Site    │         │   Admin Shell    │         │   Edge API  │
│  (Static Host)  │         │  (Static HTML)   │         │  (Library)  │
│                 │         │                  │         │             │
│  /              │◄────────│  /admin/         │◄────────│  /api/cms   │
│  /about         │  iframe │  (loads site in  │  fetch  │  (auth +    │
│  ?editMode=true │         │   preview frame) │         │   GitHub)   │
└─────────────────┘         └──────────────────┘         └─────────────┘
         ▲                                                       │
         │                                                       ▼
         │                                              ┌─────────────┐
         │                                              │   GitHub    │
         └─────────────────────────────────────────────│   Contents  │
                                                       │   API       │
                                                       └─────────────┘
```

**Two distinct codebases:**

| Component | What it is | Reuse |
|---|---|---|
| **CMS Library** | Auth, GitHub client, rate limiter, session manager, base UI shell | **Reused across all sites** |
| **Site Adapter** | Content schema, component mapping, preview styling, validators | **Per-site implementation** |

---

## 3. The Common Library Specification

A reusable package/module that handles all security-critical and boilerplate functionality. A developer imports this and mounts the site-specific adapter on top.

### 3.1 Edge Function Library (`@yourteam/cms-edge`)

**Responsibilities:** Auth, rate limiting, GitHub I/O, path validation, content sanitization, audit logging.

#### Exported Handler Pattern
```typescript
// Conceptual API — implement in your library
export function createCMSHandler(config: CMSConfig): (request: Request) => Promise<Response>;

interface CMSConfig {
  passwordHash: string;           // bcrypt/argon2 hash, not plaintext
  jwtSecret: string;              // HS256 key, 32+ bytes
  githubPAT: string;              // Fine-grained PAT (repo:contents read+write only)
  githubOwner: string;
  githubRepo: string;
  allowedPaths: string[];         // e.g. ['content/', 'data/']
  rateLimit: { windowSeconds: number; maxAttempts: number; };
  contentSchema: Record<string, ContentSchema>; // Injected per-site
}
```

#### Auth Flow
1. **POST /api/cms/auth** — Client sends `{ password }`.
2. Server hashes attempt, compares against `passwordHash` (constant-time).
3. On success: issues `HttpOnly`, `Secure`, `SameSite=Strict` cookie containing a signed JWT with a session ID and timestamp. **No localStorage.**
4. On failure: increments per-IP counter in edge KV/store. After N failures, returns 429 for the window.
5. **All subsequent requests** send the cookie automatically; server verifies JWT signature and expiry (e.g., 8-hour sessions).

#### GitHub Operations
- **GET /api/cms/content?file=content/hero.json**  
  - Validate JWT → validate path whitelist → fetch from GitHub Contents API → Base64 decode → return JSON.
- **POST /api/cms/content**  
  - Validate JWT → validate path → **schema validate** content against per-site schema → **sanitize** if HTML fields present → fetch current file SHA from GitHub → commit with `PUT` including SHA → return `{ ok, sha, commitUrl }`.
  - **Concurrent edit detection:** If GitHub returns 422 (SHA mismatch), return a specific error code so the UI can show a conflict resolution dialog.

#### Rate Limiting
Use the edge platform's KV/Blob store:
- Key: `rate_limit:<ip>:<<endpoint>`
- Value: attempt count + window expiry
- Apply to `/auth` (strict) and optionally to content writes (generous).

#### Content Sanitization
If the schema marks a field as `type: "html"` or `"markdown"`, run DOMPurify (or equivalent) in the edge function before committing. This prevents a compromised admin session from injecting XSS into the public site.

#### Audit Logging
Since shared password means no "who," log "when and what":
- Append to `data/.cms-audit.json` (or similar) via GitHub API on every write:
  ```json
  { "t": "2026-06-02T18:10:00Z", "session": "abc123", "file": "content/hero.json", "sha": "..." }
  ```
- Or embed in commit messages: `cms: update hero.json [session:abc123]`

---

### 3.2 Admin Shell Library (`@yourteam/cms-admin`)

**Responsibilities:** Login screen, session management, file tree, preview frame orchestration, field renderer framework.

#### Core UI (no per-site code needed)
- **Login view:** Password field, submit to `/api/cms/auth`, handles 429/rate-limit messaging.
- **Session manager:** Reads/writes nothing to localStorage. Relies entirely on cookie auth. Auto-redirects to login on 401.
- **File tree sidebar:** Fetches `/api/cms/content?file=...` for the whitelist directory, lists editable files.
- **Editor chrome:** Toolbar (Save, Discard, Last edited, Commit status), responsive layout, dark mode toggle.

#### Preview Frame System
The admin page loads the **public site** in an `<iframe src="/?editMode=true">`.  
Communication via `postMessage`:
- **Admin → Site:** `cms:highlight { file, fieldId }` — tells the site to highlight an editable region.
- **Site → Admin:** `cms:fieldClicked { file, fieldId, currentValue }` — tells the admin to open the editor panel for that field.

This is how "edit in place" works without the admin needing to know the site's CSS.

---

## 4. The Per-Site Adapter

This is what a developer writes for each client project. It teaches the library *what* content exists and *how* it maps to the site's components.

### 4.1 Content Schema (`cms.config.js` or similar)

Defines every editable file, its structure, and which component it feeds.

```typescript
// Per-site configuration
export default defineCMSSchema({
  // Each key is a file path (must match whitelist)
  "content/hero.json": {
    label: "Homepage Hero",
    // The site component that renders this data
    component: "HeroSection", 
    fields: {
      headline: { type: "text", label: "Headline", maxLength: 120 },
      subhead: { type: "markdown", label: "Subhead", sanitize: true },
      ctaText: { type: "text", label: "Button Text" },
      ctaLink: { type: "text", label: "Button URL", pattern: "^(/|https?://)" }
    }
  },
  "content/announcements.json": {
    label: "Announcements",
    component: "AnnouncementBar",
    fields: {
      messages: { 
        type: "array", 
        label: "Messages",
        itemSchema: {
          text: { type: "text" },
          link: { type: "text" }
        }
      }
    }
  },
  "data/navigation.json": {
    label: "Navigation",
    component: "NavBar",
    fields: {
      links: { type: "array", itemSchema: { label: "text", href: "text" } }
    }
  }
});
```

### 4.2 Preview Components

The admin UI imports the **actual JSX components** used by the public site and wraps them with edit affordances.

```tsx
// Per-site: admin/preview-components.tsx
import { HeroSection } from "../src/components/HeroSection";
import { withEditOverlay } from "@yourteam/cms-admin";

export const previewComponents = {
  HeroSection: withEditOverlay(HeroSection, {
    editableProps: ["headline", "subhead", "ctaText"],
    // withEditOverlay adds click handlers and highlight borders in edit mode
  }),
  // ... other components
};
```

**How edit mode works on the public site:**
The public site's build system (Vite, Next.js, Astro, etc.) checks for `?editMode=true` (or detects the iframe `window.self !== window.top`). When active:
1. It fetches content from the same JSON files it normally uses at build time, but **client-side** (so changes appear immediately before save).
2. It renders components normally but adds `data-cms-field` attributes to editable DOM nodes.
3. It listens for `postMessage` from the admin shell to highlight fields.
4. Clicking an editable region sends `postMessage` back to the admin shell with the field identifier.

**Key insight:** The public site doesn't need a heavy "CMS runtime." It just needs a thin edit-mode wrapper that is **tree-shaken out of the production build** or loaded conditionally.

---

## 5. Hardened Security Model

### Authentication
| Layer | Implementation |
|---|---|
| Password storage | Argon2id or bcrypt hash in edge env var. Never plaintext. |
| Session | Signed JWT in `HttpOnly; Secure; SameSite=Strict` cookie. 8h expiry. |
| Transport | HTTPS only. HSTS headers on admin route. |
| Rate limiting | Per-IP: 5 auth attempts per 15 minutes. Content writes: 30 per minute. |

### Authorization
| Layer | Implementation |
|---|---|
| Path whitelist | Server-side only. `ALLOWED_PATHS` array. Reject any path not starting with a whitelisted prefix. |
| Traversal guard | Reject `..`, absolute paths, and null bytes. Normalize slashes. |
| Content validation | JSON Schema validation server-side before GitHub commit. Reject unknown fields. |

### GitHub PAT Hardening
- Use a **Fine-Grained Personal Access Token** scoped to:
  - Repository: only the target repo
  - Permissions: **Contents** (read + write) only
  - No admin, no metadata, no code scanning access
- Rotate quarterly. Store in edge platform secrets, never in repo.

### Concurrent Edit Protection
- The library always fetches the current SHA before writing.
- If GitHub returns `409 Conflict` or `422 Invalid` due to SHA mismatch, the library returns a structured error.
- The admin UI shows: *"Someone else (or another tab) saved this file. Please review the latest version and re-apply your changes."*

### XSS Prevention
| Vector | Mitigation |
|---|---|
| Malicious HTML in content | DOMPurify in edge function on all `type: "html"` / `"markdown"` fields before commit. |
| Script injection via JSON | Schema validation rejects non-string types where strings expected. |
| Admin UI XSS | Admin shell renders text fields as text nodes, not `innerHTML`. |

### Audit & Recovery
- Every commit message prefixed with `cms:` for easy filtering.
- Audit log file auto-committed to `data/.cms-audit.jsonl`.
- One-click "Revert" in admin UI: fetches previous commit from GitHub API and restores.

---

## 6. Developer Implementation Guide

### Step 1: Install Library
```bash
npm install @yourteam/cms-edge @yourteam/cms-admin
```

### Step 2: Configure Edge Function
```typescript
// functions/api/cms.ts (Cloudflare Worker example)
import { createCMSHandler } from "@yourteam/cms-edge";
import siteSchema from "../../cms.config";

export default createCMSHandler({
  passwordHash: ENV.ADMIN_PASSWORD_HASH, // bcrypt
  jwtSecret: ENV.JWT_SECRET,
  githubPAT: ENV.GITHUB_PAT_FINE_GRAINED,
  githubOwner: "client-org",
  githubRepo: "client-site",
  allowedPaths: ["content/", "data/"],
  rateLimit: { windowSeconds: 900, maxAttempts: 5 },
  contentSchema: siteSchema,
});
```

### Step 3: Configure Admin Page
```html
<!-- admin/index.html -->
<script type="module">
  import { mountAdmin } from "@yourteam/cms-admin";
  import { previewComponents } from "./preview-components";
  
  mountAdmin({
    apiEndpoint: "/api/cms",
    previewComponents,
    siteOrigin: window.location.origin,
  });
</script>
```

### Step 4: Wire Public Site for Edit Mode
```tsx
// src/components/HeroSection.tsx (existing site component)
export function HeroSection({ headline, subhead, ctaText }) {
  const isEditMode = typeof window !== 'undefined' && 
                     new URLSearchParams(window.location.search).has('editMode');
  
  return (
    <section className="hero">
      <h1 {...(isEditMode && { "data-cms-field": "headline", className: "cms-editable" })}>
        {headline}
      </h1>
      {/* ... */}
    </section>
  );
}
```
*(The library provides a `useEditMode()` hook to make this cleaner.)*

### Step 5: Deploy & Set Secrets
Configure in hosting dashboard:
- `ADMIN_PASSWORD_HASH` — `bcrypt.hashSync('client-shared-password', 10)`
- `JWT_SECRET` — 32-byte random string
- `GITHUB_PAT_FINE_GRAINED` — scoped token
- `GITHUB_OWNER`, `GITHUB_REPO`

---

## 7. Client UX Flow

1. **Login:** Visit `yoursite.com/admin/`. Enter shared password. Cookie set.
2. **Preview:** Site loads in iframe. Editable regions have subtle blue borders.
3. **Edit:** Client clicks "Homepage Hero" headline. Right panel opens with a text field.
4. **Save:** Clicks "Save Changes." Library commits to GitHub. Button shows "Building…"
5. **Live:** ~30 seconds later, the public site updates. Client refreshes iframe to verify.

**For non-technical clients, the mental model is:** *"I click the words on my website and change them."*

---

## 8. Trade-offs (Updated)

| Pro | Con | Mitigation |
|---|---|---|
| Shared password (simple) | No user attribution | Audit log by session ID; ask client who edited if needed |
| Zero backend infra | Build latency (30–60s) | Show "building" spinner; edge cache purge on deploy |
| Git history | Concurrent edits possible | SHA-mismatch detection + conflict UI |
| Edit-in-place requires iframe | Some sites block iframe with X-Frame-Options | Use `Content-Security-Policy: frame-ancestors 'self'` instead of DENY |
| Schema must be defined per-site | Initial dev setup required | Provide CLI scaffold: `npx cms-init` |

---

## 9. When to Upgrade

Stay on this pattern if: 1–3 editors, <10 edits/day, content is marketing copy.  
**Upgrade to GitHub OAuth (Decap-style)** if: you need to know *who* edited, multi-tenancy, or >5 editors.  
**Upgrade to a headless CMS** if: high-frequency edits, scheduled publishing, complex media management, or real-time collaboration.

---

This gives your team a **reusable, hardened foundation** while keeping the per-site work limited to: schema definition, mapping components to the preview system, and styling the chrome. The security-critical code is written once in the library and battle-tested across all projects.