import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const chxImmobilier: Scraper = {
  type: 'cheerio',
  scrape($: CheerioAPI) {
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

    $('.ui-property').each((_i, el) => {
      const $el = $(el)
      const $a = $el.find('a').first()
      const url = $a.attr('href') ?? ''
      const img = $el.find('img').attr('src') ?? ''
      const title = $el.find('h2, h3, .title').first().text().trim()

      const fullText = $el.text()
      const sqm = matchM2(fullText)

      const roomsMatch = fullText.match(/(\d+)\s*pi[eè]ce/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const priceMatch = fullText.match(/[\d\s,.]+\s*€/)
      const price = priceMatch ? formatPrice(priceMatch[0]) : ''

      const refMatch = fullText.match(/R[eé]f[.\s:]*(\w+)/i)
      const ref = refMatch ? refMatch[1] : $el.attr('id') ?? ''

      results.push({ ref, title, price, desc: fullText.trim(), sqm, rooms, url, img })
    })

    return results
  },
}

export default chxImmobilier
