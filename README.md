# CDMC

Website for CDMC, built with [Astro](https://astro.build/) and [Sanity](https://www.sanity.io/).

## Structure

- `/frontend` — Astro site (SSR, Vercel adapter)
- `/studio` — Sanity Studio, content editing for the site

## Getting Started

Requires Node >= 22.12.0.

```sh
npm install
npm run dev
```

This starts the Astro site on [http://localhost:4321](http://localhost:4321) and the Studio on [http://localhost:3333](http://localhost:3333).

### Environment variables

**`frontend/.env`**

```
PUBLIC_SANITY_STUDIO_PROJECT_ID=
PUBLIC_SANITY_STUDIO_DATASET=production
SANITY_API_READ_TOKEN=
PUBLIC_SANITY_STUDIO_URL=
PUBLIC_SANITY_VISUAL_EDITING_ENABLED=false
```

**`studio/.env`**

```
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=
SANITY_STUDIO_STUDIO_HOST=
```

## Deploying

```sh
cd studio && npx sanity deploy   # deploy Studio
cd frontend && npm run build     # build Astro site for Vercel
```
