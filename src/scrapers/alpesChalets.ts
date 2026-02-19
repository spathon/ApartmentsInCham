import * as cheerio from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const alpesChalets: Scraper = {
  type: 'playwright',
  async scrape(page) {
    const html = await page.content()
    const $ = cheerio.load(html)

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

    $('figure').each((_i, el) => {
      const $el = $(el)
      const $a = $el.find('figcaption a').length ? $el.find('figcaption a') : $el.find('a')
      const url = $a.attr('href') ?? ''
      const title = $el.find('figcaption h3, h3').first().text().trim()

      const imgSrc = $el.find('img').attr('src') ?? ''
      const img = imgSrc.startsWith('//') ? `https:${imgSrc}` : imgSrc

      const detailsText = $el.find('figcaption p, figcaption').text().trim()
      const sqm = matchM2(detailsText)
      const roomsMatch = detailsText.match(/(\d+)\s*Pi[eè]ce/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const refMatch = $el.text().match(/Ref\s*:\s*(.+)/i)
      const ref = refMatch ? refMatch[1].trim() : ''

      const priceMatch = $el.text().match(/[\d\s]+€/)
      const price = priceMatch ? formatPrice(priceMatch[0]) : ''

      results.push({ ref, title, price, desc: detailsText, sqm, rooms, url, img })
    })

    return results
  },
}

export default alpesChalets
