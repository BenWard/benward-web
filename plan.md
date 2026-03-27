# Jekyll to Next.js Migration Plan

## Overview

Port benward.uk from Jekyll 4 to Next.js (App Router) with TypeScript. All existing content files remain unchanged in their current structure. The site renders server-side with JIT (on-demand) rendering — no static export. All new TypeScript code has tests.

---

## 1. Project Scaffold

Create a new `nextjs/` directory alongside the existing `jekyll/` directory.

```
benward-web/
├── jekyll/          # existing, untouched
├── nextjs/          # new Next.js app
│   ├── app/         # App Router pages
│   ├── components/  # React components (layouts, includes), each with colocated tests
│   ├── config/      # Site configuration (ported from _config.yml)
│   ├── lib/         # Data fetching, plugins, utilities, each with colocated tests
│   ├── public/      # Static assets (copied from jekyll/static, jekyll/images)
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── jest.config.ts
```

**Content reference**: The Next.js app reads content directly from `../jekyll/_posts/` and other content files. No content duplication.

---

## 2. Content Library (`lib/`)

### `lib/content.ts` — Post loading and parsing
- Read all `.md` and `.textile` files from `../jekyll/_posts/blog/`
- Parse YAML frontmatter with `gray-matter`
- Render Markdown with `unified`/`remark`/`rehype` pipeline
- Render Textile with `textile-js` (or equivalent)
- Extract and normalize all frontmatter fields:
  - `title`, `date`, `updated`, `summary`, `tags`, `category`, `layout`
  - `geo` (name, latitude, longitude)
  - `canonical`, `atomid`, `original_service`, `original_url`, `tumblr_post_type`
- Preserve timezone information from date strings (store as ISO 8601 strings, not JS Date objects)
- Sort posts by date descending

### `lib/archives.ts` — Archive index generation
- Group posts by year and month
- Generate archive period metadata (previous/next navigation, post counts)
- Provide functions: `getYearArchive(year)`, `getMonthArchive(year, month)`, `getAllArchivePeriods()`

### `lib/posts.ts` — Post enrichment (port of `jekyl_post.rb`)
- `cleanUrl(post)` — strip `.html` extension
- `githubSourceUrl(post)` — generate GitHub edit link from slug/path
- `globalDate(post)` — preserve timezone from frontmatter date
- `generateTitle(post)` — auto-generate title from date for untitled Tumblr imports
- `getExcerpt(post)` — use `summary` frontmatter or auto-generate

### `lib/base60.ts` — Base60 encoding (port of `base60.rb`)
- Port NewBase60 encoding algorithm to TypeScript
- `encode(timestamp: number): string`
- Used for shortlink generation: `https://bnwrd.me/{base60}`

### `lib/romans.ts` — Roman numeral conversion (port of `romans.rb`)
- `romanize(year: number): string`
- Used in footer copyright display

### `lib/tag-id.ts` — Atom tag URI generation (port of `tag_id.rb`)
- `generateTagId(post): string`
- RFC 4151 tag URIs using domain-switching logic (benward.me pre-2018, benward.uk 2018+)

### `lib/dates.ts` — Date formatting utilities (port of `liquid_standard_filters.rb`, `jekyll_utils.rb`)
- Timezone-preserving date formatting
- ISO format, display format, time-only format matching `_config.yml` patterns
- Uses `date-fns` or `luxon` for formatting with timezone support

### `config/site.ts` — Site configuration
- Centralize all config values currently in `_config.yml`:
  - `title`, `url`, `shortdomain`, `author`, `github_slug`, `git_base`
  - Date format strings
  - Permalink structure
- Lives in `config/` directory, not `lib/`

---

## 3. App Router URL Structure (`app/`)

All routes use dynamic server rendering (no `generateStaticParams` — JIT only).

### Routes

```
app/
├── layout.tsx                          # Root layout (port of base.html)
├── page.tsx                            # Homepage: / (port of index.html)
├── blog/
│   └── [slug]/
│       └── page.tsx                    # Blog post: /blog/{slug}
│       └── route-redirects handled via next.config redirects for .html
├── [year]/
│   ├── page.tsx                        # Year archive: /2024/
│   └── [month]/
│       └── page.tsx                    # Month archive: /2024/01/
├── about/
│   └── page.tsx                        # /about
├── network/
│   └── page.tsx                        # /network
├── feeds/
│   └── page.tsx                        # /feeds
├── feed.atom/
│   └── route.ts                        # Atom feed (Route Handler)
├── robots.txt/
│   └── route.ts                        # robots.txt (Route Handler)
├── sitemap.xml/
│   └── route.ts                        # sitemap (Route Handler)
├── humans.txt/
│   └── route.ts                        # humans.txt (Route Handler)
└── not-found.tsx                       # 404 page
```

### `.html` Redirects

In `next.config.ts`, add redirect rules:
```ts
redirects: [
  { source: '/blog/:slug.html', destination: '/blog/:slug', permanent: true },
  // etc.
]
```

---

## 4. React Components (`components/`)

Port Jekyll layouts and includes to React server components. Each component lives in its own subdirectory with colocated styles, tests, and barrel export:

```
components/Cover/
├── Cover.tsx
├── Cover.module.css
├── Cover.test.tsx
└── index.ts          # re-exports Cover
```

### Layout Components
- **`RootLayout`** — port of `base.html`: HTML shell, meta tags, header, footer (with Roman numeral year), nav
- **`BlogPostLayout`** — port of `blog.html`: article with h-entry microformat, dateline, geo, tags, prev/next nav
- **`ArticleLayout`** — port of `article.html`: simple article wrapper
- **`ArchiveMonthLayout`** — port of `archive_month.html`: monthly h-feed with navigation
- **`ArchiveYearLayout`** — port of `archive_year.html`: yearly h-feed organized by month

### Include Components
- **`Cover`** — port of `cover.html`: bio card with h-card
- **`Identity`** — port of `identity.html`: microformat profile links
- **`PostSummary`** — port of `post_summary.html`: article summary for listings
- **`ArchiveNavigation`** — port of `archive_navigation.html`: prev/next archive period nav
- **`Share`** — port of `share.html`: permalink, shortlink, GitHub source link
- **`TwitterMeta`** — port of `twitter.html`: Twitter Card meta tags
- **`Scripts`** — port of `scripts.html`: Gauges analytics, Twitter widgets
- **`Profiles`** — port of `profiles.html`: microformat profile links

---

## 5. Static Assets & CSS (`public/`, CSS Modules)

### Static files
Copy from Jekyll:
- `jekyll/static/` → `public/static/`
- `jekyll/images/` → `public/images/`

### CSS Strategy
Decompose `jekyll/css/sixthree.css` into:
- **`lib/global.css`** — CSS variables/custom properties, base/reset styles, body/html defaults, typography. Imported in `app/layout.tsx`.
- **CSS Modules per component** — Each component directory includes a colocated `.module.css`:
  - `components/Cover/Cover.module.css` — h-card/bio styles
  - `components/PostSummary/PostSummary.module.css` — article summary styles
  - `components/ArchiveNavigation/ArchiveNavigation.module.css` — archive nav flexbox
  - `components/Share/Share.module.css` — share/link section styles
  - `components/BlogPostLayout/BlogPostLayout.module.css` — h-entry, dateline, geo, tag list styles
  - `components/ArchiveMonthLayout/ArchiveMonthLayout.module.css` — monthly archive styles
  - `components/ArchiveYearLayout/ArchiveYearLayout.module.css` — yearly archive styles
  - `app/layout.module.css` — header, footer, page canvas, site nav

Microformat class names (`.h-entry`, `.p-name`, etc.) remain as plain classes in the global CSS since they're semantic markers, not styling hooks. Component-specific visual styles use CSS Modules.

---

## 6. Atom Feed (`app/feed.atom/route.ts`)

Route Handler that:
- Fetches 20 most recent blog posts
- Generates Atom XML with shortlinks (base60), tag URIs, canonical URLs
- Returns `Response` with `Content-Type: application/atom+xml`
- Ports all logic from `jekyll/feed.atom`

---

## 7. Testing Strategy

Use Jest + React Testing Library. **Tests are colocated with their source files** (e.g., `lib/base60.ts` → `lib/base60.test.ts`, `components/Cover.tsx` → `components/Cover.test.tsx`).

### Library Tests (colocated in `lib/`)
- `lib/base60.test.ts` — encode/decode correctness, edge cases
- `lib/romans.test.ts` — Roman numeral conversion
- `lib/tag-id.test.ts` — tag URI generation with domain switching
- `lib/dates.test.ts` — timezone-preserving formatting
- `lib/content.test.ts` — frontmatter parsing, Markdown/Textile rendering
- `lib/posts.test.ts` — post enrichment (clean URLs, GitHub links, title generation)
- `lib/archives.test.ts` — archive grouping, period navigation

### Config Tests (colocated in `config/`)
- `config/site.test.ts` — config values

### Component Tests (colocated in each component's subdirectory)
- e.g. `components/PostSummary/PostSummary.test.tsx`
- Test key components render correct microformat markup
- Test archive navigation generates correct links
- Test post summary handles canonical URLs

### Integration Tests
- Test Atom feed generation produces valid XML
- Test archive routes return correct post groupings

---

## 8. Implementation Order

### Phase 1: Foundation
1. Initialize Next.js project with TypeScript
2. Set up Jest testing
3. Implement `config/site.ts`
4. Implement `lib/base60.ts` + tests
5. Implement `lib/romans.ts` + tests
6. Implement `lib/dates.ts` + tests
7. Implement `lib/tag-id.ts` + tests

### Phase 2: Content Pipeline
8. Implement `lib/content.ts` (frontmatter parsing, Markdown rendering, Textile rendering) + tests
9. Implement `lib/posts.ts` (post enrichment) + tests
10. Implement `lib/archives.ts` (archive grouping/navigation) + tests

### Phase 3: Components & Layouts
11. Copy static assets to `public/`
12. Build `RootLayout` (base.html port) with all include components
13. Build `BlogPostLayout` and blog post page route
14. Build archive page routes with layout components
15. Build homepage
16. Build static pages (about, network, feeds)

### Phase 4: Feeds & Metadata
17. Build Atom feed route handler
18. Build robots.txt, sitemap.xml, humans.txt route handlers
19. Add `.html` redirect rules in next.config.ts
20. Add Twitter Card / Open Graph meta tags

### Phase 5: Polish & Verification
21. Component tests for microformat correctness
22. Integration tests for feed and archive generation
23. Manual verification of URL structure against Jekyll output
24. Verify all frontmatter-driven features work (canonical URLs, geo, Tumblr imports)

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "gray-matter": "^4",
    "unified": "^11",
    "remark-parse": "^11",
    "remark-rehype": "^11",
    "rehype-stringify": "^10",
    "rehype-raw": "^7",
    "textile-js": "^2",
    "date-fns": "^4",
    "date-fns-tz": "^3"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/react": "^19",
    "@types/node": "^22",
    "jest": "^29",
    "ts-jest": "^29",
    "@testing-library/react": "^16",
    "@testing-library/jest-dom": "^6"
  }
}
```

---

## Design Decisions

1. **JIT rendering, not static**: All pages use `force-dynamic` or default dynamic rendering. No `generateStaticParams`. This matches the requirement for JIT rendering over static builds.

2. **Content stays in Jekyll directory**: Posts are read from `../jekyll/_posts/` — no content duplication. The Jekyll site can continue to work alongside.

3. **Server components by default**: All components are React Server Components unless interactivity is needed (unlikely for this blog).

4. **Timezone preservation**: Dates stored as ISO 8601 strings throughout, never converted to local time. This is critical — the Jekyll site has custom plugins specifically for this.

5. **Microformat fidelity**: All h-entry, h-card, h-feed, h-geo class names preserved exactly as in the Jekyll templates.

6. **CSS Modules**: The existing `sixthree.css` is decomposed into CSS Modules per component, with global styles (variables, resets, typography, microformat classes) in `lib/global.css`.
