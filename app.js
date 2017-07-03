const path = require('path')
const request = require('superagent')
const cheerio = require('cheerio')
const crypto = require('crypto')

const { Apartment } = require('./models')
Apartment.sync()

const sites = [
  {
    id: 'cosmiqueImmobilier',
    title: 'Cosmique Immobilier',
    url: 'http://cosmique-immobilier.com/en/search?city_id=2&type=1&price_range=0-350000'
  },
  {
    id: 'arveImmobilier',
    title: 'Arve Immobilier',
    url: 'http://www.arve-immobilier.com/en/purchase/ville-CHAMONIX+MONT+BLANC/cp-74400/max-290000/'
  },
  {
    id: 'grossetGrange',
    title: 'Grosset GranGe',
    url: 'http://grossetgrange.com/fr/resultat/?lang=fr&location%5BCHAMONIX+MONT+BLANC%5D=CHAMONIX+MONT+BLANC&maxprix=300000&nbref=&search=ENVOYER&PHPSESSID=1e19c507d932c71bb6a457876bd0a90b&240planBAK=R2339304326&240plan=R3762709807'
  },
  {
    id: 'lafloriaImmobilier',
    title: 'lafloria-immobilier',
    url: 'http://www.lafloria-immobilier.com/en/search?type=2&city_id=2&price_range=0-300000&Trouver=Find#properties'
  }
]

function init () {
  const promises = sites.map(async site => {
    console.log('Start', site.title)
    let response
    try {
      response = await request.get(site.url)
    } catch (e) {
      console.error('Fetch error:', e)
      return null
    }
    let $ = cheerio.load(response.text)
    const result = require(path.join(__dirname, './scrapers/', site.id))($)

    const data = result.map(apartment => {
      const hash = crypto.createHash('sha256')
      hash.update(apartment.url)
      apartment.hash = hash.digest('hex')
      return apartment
    })

    console.log('Finish', site.title)
    return {
      name: site.title,
      data,
      count: data.length
    }
  })
  return Promise.all(promises)
}

init()
  .then((places) => {
    places.forEach(place => {
      if (!place) return
      console.log(place.name, place.count)
    })
    console.log('done')
  })
  .catch(e => {
    console.log(e)
  })
