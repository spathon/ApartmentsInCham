import type { CheerioAPI } from 'cheerio'
import type { RawApartment } from './apartment.js'

/** Minimal subset of playwright Page used by scrapers */
export interface PlaywrightPage {
  goto(url: string, options?: { waitUntil?: string }): Promise<unknown>
  content(): Promise<string>
  evaluate<R>(fn: () => R): Promise<R>
  $(selector: string): Promise<unknown>
  $$(selector: string): Promise<unknown[]>
  close(): Promise<void>
}

export interface CheerioScraper {
  type: 'cheerio'
  scrape: ($: CheerioAPI) => RawApartment[]
}

export interface PlaywrightScraper {
  type: 'playwright'
  scrape: (page: PlaywrightPage) => Promise<RawApartment[]>
}

export type Scraper = CheerioScraper | PlaywrightScraper
