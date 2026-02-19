import * as cheerio from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const cimalpes: Scraper = {
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

    $('a[href*="/buy/"]').each((_i, el) => {
      const $el = $(el)
      const url = $el.attr('href') ?? ''

      const img = $el.find('img[src*="/photos/annonce/"]').attr('src')
        ?? $el.find('img').attr('src')
        ?? ''

      const title = $el.find('h2, h3').first().text().trim()

      const detailsText = $el.text()
      const sqm = matchM2(detailsText)
      const roomsMatch = detailsText.match(/(\d+)\s*bedroom/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const priceMatch = detailsText.match(/[\d\s,.]+\s*€/)
      const price = priceMatch ? formatPrice(priceMatch[0]) : ''

      const refMatch = url.match(/ref-(\d+)/)
      const ref = refMatch ? refMatch[1] : ''

      results.push({ ref, title, price, desc: detailsText.trim(), sqm, rooms, url, img })
    })

    return results
  },
}

export default cimalpes
