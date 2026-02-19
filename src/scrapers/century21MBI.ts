import * as cheerio from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { matchM2, matchPrice } from '../utils.js'

const century21MBI: Scraper = {
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

    $('a[href*="/trouver_logement/detail/"]').each((_i, el) => {
      const $el = $(el)
      const url = $el.attr('href') ?? ''
      const img = $el.find('img').attr('src') ?? ''
      const title = $el.find('h2, h3, .c21-listing__title').first().text().trim()

      let sqm = ''
      let price = ''
      let rooms = ''
      let ref = ''

      $el.find('h2, h3, p, span, div').each((_j, child) => {
        const text = $(child).text().trim()
        if (!sqm) sqm = matchM2(text)
        if (!price) price = matchPrice(text)
        const roomsMatch = text.match(/(\d+)\s*pi[eè]ce/i)
        if (!rooms && roomsMatch) rooms = roomsMatch[1]
        const refMatch = text.match(/Ref\s*:?\s*(\d+)/i)
        if (!ref && refMatch) ref = refMatch[1]
      })

      const fullText = $el.text().trim()
      results.push({ ref, title, price, desc: fullText, sqm, rooms, url, img })
    })

    return results
  },
}

export default century21MBI
