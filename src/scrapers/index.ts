import type { Scraper } from '../types/scraper.js'
import aim from './aim.js'
import antoineImmo from './antoineImmo.js'
import chamImmo from './chamImmo.js'
import laFloriaImmobilier from './laFloriaImmobilier.js'

export const scrapers: Record<string, Scraper> = {
  aim,
  antoineImmo,
  chamImmo,
  lafloriaImmobilier: laFloriaImmobilier,
}
