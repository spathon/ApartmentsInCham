const { formatPrice, trimM2 } = require('../utils')

function arveImmobilier ($) {
  const places = $('.annonces-list > .annonce').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('> a')
    const linkText = $a.attr('title')
    const ref = linkText.match(/[0-9]{2}\/[0-9]{5}/)
    return {
      ref: ref ? ref[0] : linkText,
      title: linkText,
      price: formatPrice($el.find('.a-infos-price').text()),
      desc: $el.find('.a-description-text').text(),
      sqm: trimM2($el.find('.a-infos-surface').text()),
      rooms: $el.find('.a-infos-room').text(),
      url: $a.attr('href'),
      img: $a.find('img').attr('src')
    }
  })
  return places.get()
}

module.exports = arveImmobilier
