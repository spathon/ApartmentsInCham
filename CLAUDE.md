# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

TypeScript app that scrapes apartment listings from Chamonix real estate agencies, stores them in SQLite via Drizzle ORM, and displays them on a web page using Hono + JSX.

## Commands

- `npm run dev` — dev server with tsx watch (port 1337)
- `npm start` — production server (port 1337)
- `npm run scrape` — run scrapers once
- `npm run dev:scrape` — run scrapers with tsx watch auto-reload
- `npm run build` — compile TypeScript to `dist/`
- `npm run db:push` — push Drizzle schema to SQLite
- No test framework configured

## Architecture

**Two independent entry points:**
1. `src/bin/www.ts` → Hono web server → `src/app.tsx` → `src/routes/index.tsx` → JSX views
2. `src/scraper.ts` → orchestrates scraping across all agencies

**Scraping flow:** `src/scraper.ts` reads agency configs from `src/config/agencies.ts`, uses native `fetch()` for HTTP requests, parses HTML with cheerio, delegates to site-specific scrapers in `src/scrapers/`, validates with Zod, then upserts via Drizzle `onConflictDoNothing` using SHA256 hash of URL as unique key. Supports Playwright for JS-rendered sites.

**Each scraper module** (`src/scrapers/*.ts`) exports a typed `Scraper` object (cheerio or playwright variant) that returns `RawApartment[]`.

**Data model:** Drizzle schema in `src/db/schema.ts`, `apartments` table. SQLite (`db.sqlite`).

**Views:** Hono JSX (`src/views/*.tsx`) with static CSS served from `public/stylesheets/`.

**Types:** Zod schemas in `src/types/apartment.ts`, agency config in `src/types/agency.ts`, scraper discriminated union in `src/types/scraper.ts`.

## Key Patterns

- `src/utils.ts` has shared scraping helpers: `formatPrice()`, `trimM2()`, `matchM2()`, `removeNoneDigit()`
- Scraper error handling: catches per-agency errors and continues with remaining agencies
- URL normalization: relative URLs resolved with `new URL(path, baseUrl)`
- TypeScript strict mode, Zod validation, no `as` assertions
- Playwright browser singleton in `src/lib/browser.ts` (lazy-loaded)
