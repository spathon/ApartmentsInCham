'use strict'

const request = require('superagent')
const cheerio = require('cheerio')

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
    id: 'grossetgrange',
    title: 'Grosset GranGe',
    url: 'http://grossetgrange.com/fr/resultat/?lang=fr&location%5BCHAMONIX+MONT+BLANC%5D=CHAMONIX+MONT+BLANC&maxprix=300000&nbref=&search=ENVOYER&PHPSESSID=1e19c507d932c71bb6a457876bd0a90b&240planBAK=R2339304326&240plan=R3762709807'
  },
  {
    id: 'lafloriaImmobilier',
    title: 'lafloria-immobilier',
    url: 'http://www.lafloria-immobilier.com/real-estate/apartments/'
  }
]

const scrapers = {
  lafloriaImmobilier ($) {
    function getPrice ($el) {
      const text = $el.find('.Infos').text()
      const priceArr = text.match(/Price:(.*)\n/)
      if (!priceArr) return false
      return parseInt(priceArr[1].replace(/ /g, ''), 10)
    }

    const places = $('#ContainerColD .ContainerEncart')
      .filter((i, el) => {
        const $el = $(el)
        const price = getPrice($el)
        return price < 300000
      })
    .map(function (i, el) {
      const $el = $(el)
      return {
        // ref: $a.attr('title'),
        title: $el.find('.Titre').text(),
        price: getPrice($el),
        // desc: $el.find('.a-description-text').text(),
        // sqm: $el.find('.a-infos-surface').text(),
        // rooms: $el.find('.a-infos-room').text(),
        url: $el.find('.EnSavoirPlus').attr('href')
      }
    })
    return places.get()
  },

  arveImmobilier ($) {
    const places = $('.annonces-list > .annonce').map(function (i, el) {
      const $el = $(el)
      const $a = $el.find('> a')
      return {
        ref: $a.attr('title'),
        title: $a.attr('title'),
        price: $el.find('.a-infos-price').text(),
        desc: $el.find('.a-description-text').text(),
        sqm: $el.find('.a-infos-surface').text(),
        rooms: $el.find('.a-infos-room').text(),
        url: $a.attr('href')
      }
    })
    return places.get()
  },

  cosmiqueImmobilier ($) {
    const places = $('.properties-list > div').map(function (i, el) {
      const $el = $(el)
      return {
        ref: $el.find('.reference').text(),
        price: $el.find('.details-price-home').text(),
        sqm: $el.find('.details-surface').text(),
        rooms: $el.find('.details-beds').text(),
        url: $el.find('.btn').attr('href')
      }
    })
    return places.get()
  },

  grossetgrange ($) {
    const places = $('.u-soft > .o-layout.o-layout--space')
      .filter((i, el) => {
        const $el = $(el)
        const price = parseInt($el.find('span.u-float--right').text().replace(/ /g, ''))
        const place = $el.find('.o-layout__item > p.u-weight--bold.u-hN.u-text--medium').text()
        return price < 300000 && place.includes('CHAMONIX MONT BLANC')
      })
      .map(function (i, el) {
        const $el = $(el)
        const $a = $el.find('.c-btn.c-btn--tertiary.u-caps.u-float--right')
        return {
          ref: $a.attr('title'),
          title: $el.find('.u-hL').text().split('\n')[1],
          price: $el.find('span.u-float--right').text(),
          desc: $el.find('.o-layout.o-layout--space > .o-layout__item > p:not(.u-weight--bold)').text(),
          // sqm: $el.find('.details-surface').text(),
          // rooms: $el.find('.details-beds').text(),
          url: $a.attr('href')
        }
      })
    return places.get()
  }
}

async function init () {
  const promises = await sites.map(async site => {
    const response = await request.get(site.url)
    let $ = cheerio.load(response.text)
    return scrapers[site.id]($)
  })
  return Promise.all(promises)
}

init()
  .then((places) => {
    places.forEach(place => {
      console.log(place.length)
    })
    console.log('done')
  })
