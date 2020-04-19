const { formatPrice, matchM2 } = require('../utils')

function grossetGrange ($) {
  const places = $('.u-soft > .o-layout.o-layout--space')
    .filter((i, el) => {
      const $el = $(el)
      const price = parseInt($el.find('span.u-float--right').text().replace(/ /g, ''))
      const place = $el.find('.o-layout__item > p.u-weight--bold.u-hN.u-text--medium').text()
      return place.includes('CHAMONIX MONT BLANC')
    })
    .map(function (i, el) {
      const $el = $(el)
      const $a = $el.find('.c-btn.c-btn--tertiary.u-caps.u-float--right')
      const title = $el.find('.u-hL').text().split('\n')[1]
      const desc = $el.find('.o-layout.o-layout--space > .o-layout__item > p:not(.u-weight--bold)').text()
      return {
        ref: $a.attr('title'),
        title,
        price: formatPrice($el.find('span.u-float--right').text()),
        desc,
        sqm: matchM2(title, desc),
        rooms: '',
        url: $a.attr('href'),
        img: $el.find('img.img--center').attr('src')
      }
    })
  return places.get()
}

module.exports = grossetGrange
