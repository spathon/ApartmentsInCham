const { formatPrice, matchM2 } = require('../utils')

function arveImmobilier ($) {
  const places = $('#contentarea-lower .promo-property').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('.property-title > a')
    const desc = $el.find('.property-row-cta').text()
    return {
      ref: $el.find('.property-ref').text(),
      title: $a.text(),
      price: formatPrice($el.find('.price').text()),
      desc,
      sqm: matchM2(desc),
      rooms: '',
      url: $a.attr('href'),
      img: $el.find('img.promo-photo').attr('src')
    }
  })
  return places.get()
}

module.exports = arveImmobilier
