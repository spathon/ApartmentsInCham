import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const antoineImmo: Scraper = {
  type: 'cheerio',
  scrape($: CheerioAPI) {
    const places = $('#first .sole-block').map((_i, el) => {
      const $el = $(el)
      const $a = $el.find('a[href^="chamonix-property"]')
      const url = $a.attr('href') ?? ''
      const ref = url.split('/').pop() ?? ''
      const desc = $el.find('.ai-txt-secteur').text().trim()

      const sqmEl = $el.find('.sole-section .col-12.text-center')
        .not('.ai-txt-secteur')
        .not('.ai-txt-price')
        .not('.sous-compromis')
        .first()
      const sqmText = sqmEl.text().trim()

      return {
        ref,
        title: $a.attr('title') ?? '',
        price: formatPrice($el.find('.ai-txt-price').text()),
        desc,
        sqm: matchM2(sqmText),
        rooms: '',
        url,
        img: $el.find('img.zoom').attr('src') ?? '',
      }
    })
    return places.get()
  },
}

export default antoineImmo
