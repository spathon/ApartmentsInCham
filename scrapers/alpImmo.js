const { formatPrice, matchM2, removeNoneDigit } = require('../utils')

function arveImmobilier ($) {
  const places = $('.list > li.nature_1').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('h2 > a')
    const desc = $el.find('h2 + p').text()
    const parts = desc.split('•')
    let rooms = ''
    if (parts[0].includes('rooms')) rooms = removeNoneDigit(parts[0])
    return {
      ref: $el.find('.property-ref').text(),
      title: $a.text(),
      price: formatPrice($el.find('.price').text()),
      desc,
      sqm: matchM2(desc),
      rooms,
      url: $a.attr('href'),
      img: $el.find('.picture > img').attr('src')
    }
  })
  return places.get()
}

module.exports = arveImmobilier
