import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const arveImmobilier: Scraper = {
  type: 'cheerio',
  scrape($: CheerioAPI) {
    const places = $('article').map((_i, el) => {
      const $el = $(el)

      const fullText = $el.text()
      if (/vendu|sous\s+compromis/i.test(fullText)) {
        return null
      }

      const $titleLink = $el.find('.entry-title a')
      const url = $titleLink.attr('href') ?? ''
      const title = $titleLink.text().trim()

      const img = $el.find('.post-thumbnail img').attr('src') ?? ''

      const priceText = $el.find('.price').text().trim()
      const price = priceText ? formatPrice(priceText) : ''

      const refMatch = fullText.match(/Ref\.?\s*(.+)/i)
      const ref = refMatch ? refMatch[1].trim() : ''

      const specsText = $el.find('.property-specs').text().trim()
      const sqm = matchM2(specsText)
      const roomsMatch = specsText.match(/(\d+)\s*pi[eè]ce/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      return {
        ref,
        title,
        price,
        desc: specsText,
        sqm,
        rooms,
        url,
        img,
      }
    })
    return places.get().filter((item): item is NonNullable<typeof item> => item !== null)
  },
}

export default arveImmobilier
