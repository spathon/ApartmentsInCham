import * as cheerio from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2, removeNoneDigit } from '../utils.js'

const chamImmo: Scraper = {
  type: 'playwright',
  async scrape(page) {
    const html = await page.content()
    const $ = cheerio.load(html)

    const places = $('.fiches_liste-immo > .fiches-immo').map((_i, el) => {
      const $el = $(el)
      const $a = $el.find('> a')
      const titleEl = $el.find('.titre_minifiche')
      const roomsSpan = titleEl.find('span').text()
      const titleText = titleEl.text().trim()
      const accroche = $el.find('.accroche').text().trim()
      return {
        ref: removeNoneDigit($el.find('.reference').text()),
        title: accroche,
        price: formatPrice($el.find('.prix').text()),
        desc: titleText,
        sqm: matchM2(titleText, accroche),
        rooms: removeNoneDigit(roomsSpan),
        url: $a.attr('href') ?? '',
        img: $a.find('img').attr('src') ?? '',
      }
    })
    return places.get()
  },
}

export default chamImmo
