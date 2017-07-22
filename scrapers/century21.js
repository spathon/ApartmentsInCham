const { formatPrice, matchM2 } = require('../utils')

function arveImmobilier ($) {
  const places = $('#blocANNONCES .annoncesListeBien').first().find('> .annonce').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('.zone-photo-exclu > a')
    const desc = $el.find('.detail_vignette').text()
    return {
      ref: $el.find('.contentAnnonce').attr('id'),
      title: 'Cham',
      price: formatPrice($el.find('.zone-photo-exclu h4').text()),
      desc,
      sqm: matchM2(desc),
      rooms: '',
      url: $a.attr('href'),
      img: $el.find('.photoAnnonce img').attr('src')
    }
  })
  return places.get()
}

module.exports = arveImmobilier
