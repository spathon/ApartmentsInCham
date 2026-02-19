import type { CheerioAPI } from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const laFloriaImmobilier: Scraper = {
  type: 'cheerio',
  scrape($: CheerioAPI) {
    const places = $('.NewsContent > .col-md-4').map((_i, el) => {
      const $el = $(el)
      const $link = $el.find('a.img-link')
      const style = $link.attr('style') ?? ''
      const imgMatch = style.match(/background-image: url\((.*)\);/)
      const img = imgMatch ? imgMatch[1] : ''
      const desc = $el.find('> p').text()

      return {
        ref: $el.find('.Ref strong').text(),
        title: $el.find('h3').text(),
        price: formatPrice($el.find('.Prix strong').text()),
        desc,
        sqm: matchM2(desc),
        rooms: '',
        url: $link.attr('href') ?? '',
        img,
      }
    })
    return places.get()
  },
}

export default laFloriaImmobilier
