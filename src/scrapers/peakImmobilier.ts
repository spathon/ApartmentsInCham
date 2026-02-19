import * as cheerio from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const peakImmobilier: Scraper = {
  type: 'playwright',
  async scrape(page) {
    const html = await page.content()
    const $ = cheerio.load(html)

    const results: {
      ref: string
      title: string
      price: string
      desc: string
      sqm: string
      rooms: string
      url: string
      img: string
    }[] = []

    $('.property-cards-module .item-wrap, .property-card, article.property-item').each((_i, el) => {
      const $el = $(el)
      const $a = $el.find('a[href]').first()
      const url = $a.attr('href') ?? ''
      const img = $el.find('img').attr('src') ?? $el.find('img').attr('data-src') ?? ''
      const title = $el.find('h2, h3, .item-title').first().text().trim()

      const descText = $el.find('.item-short-description, .item-body').text().trim()
      const fullText = $el.text()
      const sqm = matchM2(fullText)

      const roomsMatch = fullText.match(/(\d+)\s*(?:pi[eè]ce|room|bed|chambre)/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const priceMatch = fullText.match(/[\d\s,.]+\s*€/)
      const price = priceMatch ? formatPrice(priceMatch[0]) : ''

      const refMatch = fullText.match(/R[eé]f[.\s:]*(\w+)/i)
      const ref = refMatch ? refMatch[1] : ''

      results.push({ ref, title, price, desc: descText, sqm, rooms, url, img })
    })

    return results
  },
}

export default peakImmobilier
