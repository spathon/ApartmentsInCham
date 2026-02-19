import type { AgencyConfig } from '../types/agency.js'

export const agencies: AgencyConfig[] = [
  {
    id: 'aim',
    title: 'AIM',
    baseUrl: 'http://www.agenceaim.com',
    url: 'http://www.agenceaim.com/summary.php?seltype=location&subtype=1',
    scrapeMethod: 'cheerio',
  },
  {
    id: 'antoineImmo',
    title: 'Antoine Immobilier',
    baseUrl: 'http://www.antoine-immo.com',
    url: 'http://www.antoine-immo.com/en/all-property-for-sale',
    scrapeMethod: 'cheerio',
  },
  {
    id: 'chamImmo',
    title: 'Cham Immo',
    baseUrl: 'http://www.cham-immo.com',
    url: 'http://www.cham-immo.com/en/sales',
    post: {
      'transaction_search[prix_max]': 270000,
      'transaction_search[commune]': 31891,
    },
    scrapeMethod: 'cheerio',
  },
  {
    id: 'lafloriaImmobilier',
    title: 'Lafloria Immobilier',
    baseUrl: 'http://www.lafloria-immobilier.com',
    url: 'http://www.lafloria-immobilier.com/en/search?type=2&city_id=2&price_range=0-350000&Trouver=Find#properties',
    scrapeMethod: 'cheerio',
  },
]
