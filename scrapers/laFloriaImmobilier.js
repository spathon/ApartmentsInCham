
const { formatPrice, matchM2 } = require('../utils')

function laFloriaImmobilier ($) {
  const places = $('.NewsContent > .col-md-4')
    .map(function (i, el) {
      const $el = $(el)
      const $link = $el.find('a.img-link')
      let img = $link.attr('style').match(/background-image: url\((.*)\);/)
      if (img) img = img[1]
      const desc = $el.find('> p').text()

      return {
        ref: $el.find('.Ref strong').text(),
        title: $el.find('h3').text(),
        price: formatPrice($el.find('.Prix strong').text()),
        desc,
        sqm: matchM2(desc),
        rooms: '',
        url: $link.attr('href'),
        img
      }
    })
  return places.get()
}

module.exports = laFloriaImmobilier
