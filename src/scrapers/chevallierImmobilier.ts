import * as cheerio from 'cheerio'
import { z } from 'zod'
import type { Scraper } from '../types/scraper.js'

const NettyProductSchema = z.object({
  '@type': z.literal('Product'),
  name: z.string().default(''),
  image: z.string().default(''),
  offers: z.object({
    url: z.string().default(''),
    price: z.number().default(0),
    itemOffered: z.object({
      numberOfRooms: z.number().default(0),
      floorSize: z.object({
        value: z.number().default(0),
      }).default({ value: 0 }),
    }).default({ numberOfRooms: 0, floorSize: { value: 0 } }),
  }),
})

const chevallierImmobilier: Scraper = {
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

    $('script[type="application/ld+json"]').each((_i, el) => {
      const raw = $(el).html()
      if (!raw) return

      let parsed: unknown
      try {
        parsed = JSON.parse(raw)
      } catch {
        return
      }

      const result = NettyProductSchema.safeParse(parsed)
      if (!result.success) return

      const product = result.data
      const offered = product.offers.itemOffered

      const rawUrl = product.offers.url
      const url = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`

      const refMatch = rawUrl.match(/,(\w+)$/)
      const ref = refMatch ? refMatch[1] : ''

      const price = product.offers.price > 0 ? String(product.offers.price) : ''
      const sqm = offered.floorSize.value > 0 ? String(offered.floorSize.value) : ''
      const rooms = offered.numberOfRooms > 0 ? String(offered.numberOfRooms) : ''

      results.push({
        ref,
        title: product.name.trim(),
        price,
        desc: product.name.trim(),
        sqm,
        rooms,
        url,
        img: product.image,
      })
    })

    return results
  },
}

export default chevallierImmobilier
