import crypto from 'node:crypto'
import * as cheerio from 'cheerio'
import { sql } from 'drizzle-orm'
import { db, schema } from './db/index.js'
import { agencies } from './config/agencies.js'
import { scrapers } from './scrapers/index.js'
import { ApartmentSchema } from './types/apartment.js'
import { getBrowser, closeBrowser } from './lib/browser.js'
import type { RawApartment } from './types/apartment.js'

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

async function fetchHtml(url: string, post?: Record<string, string | number>): Promise<string> {
  const headers: Record<string, string> = { 'User-Agent': USER_AGENT }
  if (post) {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(post)) {
      params.append(key, String(value))
    }
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: params.toString(),
    })
    return response.text()
  }
  const response = await fetch(url, { headers })
  return response.text()
}

function hashUrl(url: string): string {
  return crypto.createHash('sha256').update(url).digest('hex')
}

function resolveUrl(path: string, baseUrl: string): string {
  if (path.startsWith('http')) return path
  if (path.startsWith('//')) return `https:${path}`
  return new URL(path, baseUrl).href
}

async function init() {
  let usedPlaywright = false

  for (const site of agencies) {
    console.log('Start', site.title)
    const scraper = scrapers[site.id]
    if (!scraper) {
      console.error(`No scraper found for ${site.id}`)
      continue
    }

    let rawApartments: RawApartment[]

    try {
      if (scraper.type === 'cheerio') {
        const html = await fetchHtml(site.url, site.post)
        const $ = cheerio.load(html)
        rawApartments = scraper.scrape($)
      } else {
        usedPlaywright = true
        const browser = await getBrowser()
        const page = await browser.newPage()
        try {
          await page.goto(site.url, { waitUntil: 'networkidle' })
          rawApartments = await scraper.scrape(page)
        } finally {
          await page.close()
        }
      }
    } catch (e) {
      console.error('Fetch error:', site.title, e)
      continue
    }

    let inserted = 0
    let total = 0

    for (const raw of rawApartments) {
      if (!raw.url) continue

      const url = resolveUrl(raw.url, site.baseUrl)
      const img = raw.img ? resolveUrl(raw.img, site.baseUrl) : ''

      const parsed = ApartmentSchema.safeParse({
        ...raw,
        url,
        img,
        hash: hashUrl(url),
        agencyId: site.id,
      })

      if (!parsed.success) {
        console.error('Validation error:', parsed.error.flatten())
        continue
      }

      const result = db
        .insert(schema.apartments)
        .values(parsed.data)
        .onConflictDoUpdate({
          target: schema.apartments.hash,
          set: {
            ref: parsed.data.ref,
            title: parsed.data.title,
            price: parsed.data.price,
            desc: parsed.data.desc,
            sqm: parsed.data.sqm,
            rooms: parsed.data.rooms,
            img: parsed.data.img,
            updatedAt: sql`datetime('now')`,
          },
        })
        .run()

      total++
      if (result.changes > 0) inserted++
    }

    console.log(`Finish ${site.title} — Total: ${total}, Updated: ${inserted}`)
  }

  if (usedPlaywright) {
    await closeBrowser()
  }

  console.log('done')
}

init().catch(console.error)
