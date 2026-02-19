import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, removeNoneDigit } from '../utils.js'

const chamImmo: Scraper = {
  type: 'cheerio',
  scrape($: CheerioAPI) {
    const places = $('.fiches_liste-immo > .fiches-immo').map((_i, el) => {
      const $el = $(el)
      const $a = $el.find('> a')
      const titleEl = $el.find('.titre_minifiche')
      const roomsSpan = titleEl.find('span').text()
      return {
        ref: removeNoneDigit($el.find('.reference').text()),
        title: $el.find('.accroche').text(),
        price: formatPrice($el.find('.prix').text()),
        desc: titleEl.text().trim(),
        sqm: '',
        rooms: removeNoneDigit(roomsSpan),
        url: $a.attr('href') ?? '',
        img: $a.find('img').attr('src') ?? '',
      }
    })
    return places.get()
  },
}

export default chamImmo
