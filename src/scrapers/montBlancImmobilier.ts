import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const montBlancImmobilier: Scraper = {
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

    $('a[href*="/transaction/catalogue/"]').each((_i, el) => {
      const $el = $(el)
      const fullText = $el.text()

      if (/vendu/i.test(fullText)) return

      const url = $el.attr('href') ?? ''
      const img = $el.find('img').attr('src') ?? ''
      const title = $el.find('.property-type, h2, h3').first().text().trim()

      const detailsText = $el.find('.details, .property-details').text()
      const sqm = matchM2(detailsText, fullText)
      const roomsMatch = fullText.match(/(\d+)\s*pi[eè]ce/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const priceMatch = fullText.match(/[\d\s,.]+\s*€/)
      const price = priceMatch ? formatPrice(priceMatch[0]) : ''

      const refMatch = fullText.match(/R[eé]f[.\s:]*(\w+)/i)
      const ref = refMatch ? refMatch[1] : ''

      results.push({ ref, title, price, desc: detailsText.trim(), sqm, rooms, url, img })
    })

    return results
  },
}

export default montBlancImmobilier
