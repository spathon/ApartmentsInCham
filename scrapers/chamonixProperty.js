const cheerio = require('cheerio')
const { formatPrice, trimM2 } = require('../utils')

function cosmiqueImmobilier (_, response) {
  const text = JSON.parse(response.text).content
  let $ = cheerio.load(text)
  const places = $('.result-body').map(function (i, el) {
    const $el = $(el)
    const $a = $el.find('.img-placer > a')
    return {
      ref: $a.find('img').attr('alt') || '',
      title: $a.find('img').attr('alt'),
      price: formatPrice($el.find('.info-panel > b').text()),
      desc: $el.find('.desc-panel').text().trim(),
      sqm: trimM2($el.find('.info-panel').text()),
      rooms: '',
      url: $a.attr('href'),
      img: $a.find('img').attr('src')
    }
  })
  return places.get()
}

module.exports = cosmiqueImmobilier
