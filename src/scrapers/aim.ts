import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const aim: Scraper = {
  type: 'cheerio',
  scrape($: CheerioAPI) {
    const places = $('.property-summary-block').map((_i, el) => {
      const $el = $(el)
      const $a = $el.find('.img-md a')
      const url = $a.attr('href') ?? ''
      const titleText = $el.find('.col-12.mb-15 .txt-md').first().text().trim()
      const refText = $el.find('.col-sm-3 .txt-md').first().text().trim()
      const desc = $el.find('.txt-desc-md').first().contents().filter(function () {
        return this.type === 'text'
      }).text().trim()

      return {
        ref: refText.replace(/^Ref\.\s*/i, '').trim(),
        title: titleText,
        price: formatPrice($el.find('.txt-price-lg').text()),
        desc,
        sqm: matchM2(desc, url),
        rooms: '',
        url,
        img: $el.find('.img-md img').attr('src') ?? '',
      }
    })
    return places.get()
  },
}

export default aim
