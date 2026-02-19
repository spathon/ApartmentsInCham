import * as cheerio from 'cheerio'
import type { Scraper } from '../types/scraper.js'
import { formatPrice, matchM2 } from '../utils.js'

const barnesMontBlanc: Scraper = {
  type: 'playwright',
  async scrape(page) {
    const html = await page.content()
    const $ = cheerio.load(html)

    const results: ReturnType<typeof formatResult>[] = []

    $('a[href*="/luxury-real-estate/"]').each((_i, el) => {
      const $el = $(el)
      const fullText = $el.text()

      if (!/chamonix/i.test(fullText)) return

      const url = $el.attr('href') ?? ''
      const img = $el.find('img').attr('src') ?? ''
      const title = $el.find('h3').text().trim()

      const detailsText = fullText
      const sqm = matchM2(detailsText)
      const roomsMatch = detailsText.match(/(\d+)\s*bedroom/i)
      const rooms = roomsMatch ? roomsMatch[1] : ''

      const priceMatch = fullText.match(/[\d\s,.]+\s*€/)
      const price = priceMatch ? formatPrice(priceMatch[0]) : ''

      const refMatch = url.match(/(\d+)\/?$/)
      const ref = refMatch ? refMatch[1] : ''

      results.push(formatResult({ ref, title, price, desc: detailsText.trim(), sqm, rooms, url, img }))
    })

    return results
  },
}

function formatResult(data: {
  ref: string
  title: string
  price: string
  desc: string
  sqm: string
  rooms: string
  url: string
  img: string
}) {
  return data
}

export default barnesMontBlanc
