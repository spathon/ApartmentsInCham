export interface AgencyConfig {
  id: string
  title: string
  baseUrl: string
  url: string
  post?: Record<string, string | number>
  scrapeMethod: 'cheerio' | 'playwright'
}
