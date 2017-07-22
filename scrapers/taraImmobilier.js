const { formatPrice, trimM2, removeNoneDigit } = require('../utils')

function arveImmobilier ($) {
  const places = $('#recherche-resultats-listing .conteneur-annonce').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('a.recherche-annonces-lien')
    const desc = $el.find('.hidden-phone span[itemprop=description]').first().text()
    const parts = $el.find('.recherche-annonces-infos .span4')
    return {
      ref: '',
      title: $el.find('.ville-annonce').text(),
      price: formatPrice($el.find('.prix-annonce span').first().text()),
      desc,
      sqm: trimM2(parts.first().find('.pull-right').text()),
      rooms: removeNoneDigit(parts.eq(1).find('.pull-right').text()),
      url: $a.attr('href'),
      img: $a.find('img').attr('src')
    }
  })
  return places.get()
}

module.exports = arveImmobilier
