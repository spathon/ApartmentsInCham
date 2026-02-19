import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const clipImmobilier: Scraper = {
  type: 'cheerio',
  scrape($: CheerioAPI) {
    const places = $('figure').map((_i, el) => {
      const $el = $(el)
      const $a = $el.find('figcaption a')
      const url = $a.attr('href') ?? ''
      const title = $el.find('figcaption h3').text().trim()
      const imgSrc = $el.find('img').attr('src') ?? ''
      const img = imgSrc.startsWith('//') ? `https:${imgSrc}` : imgSrc

      const detailsText = $el.find('figcaption p').text().trim()
      const sqm = matchM2(detailsText)
      const roomsMatch = detailsText.match(/(\d+)\s*Pi[eè]ce/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const refMatch = $el.text().match(/Ref\s*:\s*(.+)/i)
      const ref = refMatch ? refMatch[1].trim() : ''

      const priceText = $el.find('figcaption').text()
      const priceMatch = priceText.match(/[\d\s]+€/)
      const price = priceMatch ? formatPrice(priceMatch[0]) : ''

      return {
        ref,
        title,
        price,
        desc: detailsText,
        sqm,
        rooms,
        url,
        img,
      }
    })
    return places.get()
  },
}

export default clipImmobilier
