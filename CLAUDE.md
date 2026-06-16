# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a church website (CDMC) built with Astro (frontend) + Sanity (CMS). It uses an npm workspaces monorepo with two packages: `frontend` and `studio`.

## Commands

### Development
```sh
npm run dev          # Starts both frontend (port 4321) and studio (port 3333) concurrently
```

### Frontend only
```sh
cd frontend && npm run dev
cd frontend && npm run build    # Runs astro check + tsc --noEmit + astro build
cd frontend && npm run preview
```

### Studio only
```sh
cd studio && npm run dev
cd studio && npx sanity deploy   # Deploy studio to sanity.studio
```

Node >= 22.12.0 is required.

## Architecture

### Monorepo Structure
- `/frontend` — Astro SSR app (Vercel adapter), fetches content from Sanity
- `/studio` — Sanity Studio v3, defines the CMS schema and editing UI

### Content Flow
1. Editors manage content in Sanity Studio
2. Astro pages fetch content via GROQ queries in `frontend/src/utils/sanity.ts`
3. All query functions (`getSettings`, `getHome`, `getHeader`, `getFooter`, `getAbout`, `getTeamMembers`, `getTeamMember`, `getContact`) and all TypeScript interfaces live in that single file

### Sanity Schema (Singleton Documents)
The studio uses fixed document IDs for singleton pages — these are accessed by ID in GROQ queries, not by slug:
- `siteSettings` (type: `settings`) — church name, colors, contact info, SEO defaults
- `siteHeader` (type: `header`) — header appearance and behavior
- `siteFooter` (type: `footer`) — footer appearance and featured link
- `homePage` (type: `home`) — home page sections: hero, whoWeAre, feature, serviceTimes, cta
- `aboutPage` (type: `about`) — about page sections: aboutUs, history, team
- `contactPage` (type: `contact`) — contact page heading, image, and closing message

Collection documents (multiple records):
- `teamMember` — staff/team members with slug, ordered by `order` field; each has a detail page at `/about/[slug]`

Object types (reusable, not top-level documents):
- `blockContent` — Portable Text type used for rich text fields (body, bio); rendered with `astro-portabletext`
- `seo` — reusable SEO object (metaTitle, metaDescription, ogImage) used in post pages

### Frontend Pages & Components
- `frontend/src/pages/index.astro` — home page, uses `Hero`, `WhoWeAre`, `FeatureGallery`, `ServiceTimes`
- `frontend/src/pages/about.astro` — about page
- `frontend/src/pages/about/[slug].astro` — individual team member detail page (bio, role, image)
- `frontend/src/pages/contact.astro` — contact page
- `frontend/src/layouts/Layout.astro` — main shell with SEO meta, Header, Footer, VisualEditing
- `frontend/src/layouts/Bare.astro` — layout without header/footer
- `frontend/src/components/Container.astro` — shared wrapper: `max-w-7xl mx-auto px-6 md:px-12`; accepts optional `class` prop for extra classes
- `frontend/src/utils/image.ts` — `urlFor()` and `buildSrcSet()` helpers for Sanity images
- `frontend/src/utils/index.ts` — `formatDate()` utility

**Template remnants (unused, can be deleted):** `Welcome.astro`, `CodeBlock.astro`, `post/[slug].astro` — these are leftover from the Sanity Astro starter. `post/[slug].astro` calls `getPost()` which does not exist in `sanity.ts`.

### GROQ Image Queries
All image fields in `sanity.ts` use the shared `imageProjection` snippet, which expands each image with `width`, `height`, and `lqip` (low-quality image placeholder). When writing new GROQ queries that include images, always append `${imageProjection}` after the field name.

### Styling
Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Colors are driven by Sanity content (stored as `@sanity/color-input` values with `.hex`).

Fonts loaded in `Layout.astro` and `Bare.astro` via Google Fonts: Inter and Playfair Display. **Note:** `global.css` maps `--font-serif` to `"Lora"` (not Playfair Display), which means `font-serif` utility classes fall back to the system serif font — this is a bug. New serif text should use an inline `font-family` style or fix the CSS variable to reference `"Playfair Display"`.

### Visual Editing
Controlled by `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`. When `"true"`:
- Fetches from `drafts` perspective with stega encoding enabled
- Uses `SANITY_API_READ_TOKEN` for authenticated requests
- `VisualEditing` component is injected into the layout

When `"false"` (production): fetches published content only, no stega, no `data-sanity` attributes.

## Environment Variables

**`frontend/.env`**
```
PUBLIC_SANITY_STUDIO_PROJECT_ID=   # Sanity project ID
PUBLIC_SANITY_STUDIO_DATASET=production
SANITY_API_READ_TOKEN=             # Read token for server-side fetching
PUBLIC_SANITY_STUDIO_URL=          # Deployed studio URL (blank = localhost:3333)
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=false
```

**`studio/.env`**
```
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=         # Astro app URL (blank = localhost:4321)
SANITY_STUDIO_STUDIO_HOST=         # Subdomain for sanity.studio deploy
```

## Adding New Content Sections

1. Define a new schema type in `studio/src/schemaTypes/documents/` and register it in `studio/src/schemaTypes/index.ts`
2. Add a GROQ query function and TypeScript interface in `frontend/src/utils/sanity.ts`
3. Create a component in `frontend/src/components/` and use it in the relevant page
4. Run `npx sanity deploy` from `/studio` to push the updated schema

## Design System

- Minimalist, understated aesthetic — small church (15 members), not megachurch
- Container: use `<Container>` component (`max-w-7xl mx-auto px-6 md:px-12`); add `py-20` per section as needed
- Labels: `text-xs uppercase tracking-[0.25em]` with low opacity (0.4–0.5)
- Dividers: `w-8 h-px` with low opacity (0.2)
- Tailwind for all layout — no scoped CSS for spacing/sizing
- Scoped `<style define:vars>` only for dynamic Sanity colors (backgroundColor, textColor)
- Typography: Inter (`font-sans font-light`) for UI, Playfair Display (`font-serif italic`) for quotes/body — see font bug note above
- No React, no client-side JS unless absolutely necessary
- Pages: Home, About, Contact — nothing else
- Header and Footer render on every page via Layout.astro

## Studio Code Style

Studio uses its own Prettier config (see `studio/package.json`): single quotes, no semicolons, 100-char print width, no bracket spacing.
