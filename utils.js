
function removeNoneDigit (text) {
  return text.replace(/ /g, '').replace(/\D/g, '')
}

function formatPrice (priceText) {
  return removeNoneDigit(priceText)
}

function trimM2 (text) {
  return text.replace(',', '.').replace(/[Mm][2²]/, '').trim()
}

function matchM2 (text, altText = '') {
  const m2 = text.match(/([0-9,]+ ?m[2²])/)
  let m2alt
  let output = null
  if (m2) {
    output = m2[1]
  } else {
    m2alt = altText.match(/([0-9,]+ ?m[2²])/)
    if (m2alt) output = m2alt[1]
    else return ''
  }
  return parseInt(output, 10)
}

module.exports = {
  formatPrice,
  trimM2,
  matchM2,
  removeNoneDigit
}
