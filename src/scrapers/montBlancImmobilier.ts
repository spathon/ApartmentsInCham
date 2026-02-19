import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { matchM2, matchPrice } from '../utils.js'

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

    $('.Card.Card_Lots').each((_i, el) => {
      const $el = $(el)
      const fullText = $el.text()

      if (/vendu/i.test(fullText)) return

      const url = $el.find('.Card_Medias a').attr('href') ?? ''
      const img = $el.find('.Card_Medias img').attr('src') ?? ''
      const title = $el.find('.Card_Title_Libelle').text().trim()
      const price = matchPrice($el.find('.Card_Price').text())
      const descText = $el.find('.Card_Desc').text().trim()
      const sqm = matchM2(descText)

      const roomsMatch = descText.match(/(\d+)\s*pi[eè]ce/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const refMatch = descText.match(/R[eé]f[.\s:]*(\w+)/i)
      const ref = refMatch ? refMatch[1] : ''

      results.push({ ref, title, price, desc: descText, sqm, rooms, url, img })
    })

    return results
  },
}

export default montBlancImmobilier
