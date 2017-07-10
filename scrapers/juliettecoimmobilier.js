const { formatPrice, trimM2 } = require('../utils')

function cosmiqueImmobilier ($) {
  const places = $('.products-list > li').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('.pic-zone > a')
    return {
      ref: parseInt($el.find('.favorite.foff').text()) || '',
      title: $el.find('.ss-titre-bien').text(),
      price: formatPrice($el.find('.tarif').text()),
      desc: $el.find('.short-desc').text().trim(),
      sqm: trimM2($el.find('.ss-titre-bien').text()),
      rooms: '',
      url: $a.attr('href'),
      img: $a.find('img').attr('src')
    }
  })
  return places.get()
}

module.exports = cosmiqueImmobilier
