const { formatPrice, trimM2 } = require('../utils')

function cosmiqueImmobilier ($) {
  const places = $('.properties-list > div').map(function (i, el) {
    const $el = $(el)
    return {
      ref: $el.find('.reference').text().replace(/\D/g, ''),
      title: $el.find('> h2 > a').text(),
      price: formatPrice($el.find('.details-price-home').text()),
      desc: $el.find('.property-comments > p').text().trim(),
      sqm: trimM2($el.find('.details-surface').text()),
      rooms: $el.find('.details-beds').text(),
      url: $el.find('.btn').attr('href'),
      img: $el.find('.wrapper-img img').attr('src')
    }
  })
  return places.get()
}

module.exports = cosmiqueImmobilier
