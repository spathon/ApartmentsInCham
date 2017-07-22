const { formatPrice } = require('../utils')

function arveImmobilier ($) {
  const places = $('.aim-adm').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('.aim-adm-link > a')
    return {
      ref: $el.find('.aim-adm-ref').text(),
      title: $el.find('.aim-adm-cat.truncate').text(),
      price: formatPrice($el.find('.aim-adm-price').text()),
      desc: '',
      sqm: '',
      rooms: '',
      url: $a.attr('href'),
      img: $el.find('.aim-adm-image img').attr('src')
    }
  })
  return places.get()
}

module.exports = arveImmobilier
