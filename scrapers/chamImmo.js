const { formatPrice, removeNoneDigit } = require('../utils')

function chamImmo ($) {
  const places = $('.fiches_liste-immo > .fiches-immo').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('> a')
    return {
      ref: removeNoneDigit($el.find('.reference').text()),
      title: $el.find('.accroche').text(),
      price: formatPrice($el.find('.prix').text()),
      desc: $el.find('.description > h2').text(),
      sqm: '',
      rooms: removeNoneDigit($el.find('.description > h2').text()),
      url: $a.attr('href'),
      img: $a.find('> img').attr('src')
    }
  })
  return places.get()
}

module.exports = chamImmo
