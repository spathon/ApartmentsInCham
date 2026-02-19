export function removeNoneDigit(text: string): string {
  return text.replace(/ /g, '').replace(/\D/g, '')
}

export function formatPrice(priceText: string): string {
  return removeNoneDigit(priceText)
}

export function trimM2(text: string): string {
  return text.replace(',', '.').replace(/[Mm][2²]/, '').trim()
}

export function matchM2(text: string, altText = ''): string {
  const m2 = text.match(/([0-9,]+ ?m[2²])/)
  if (m2) {
    return String(parseInt(m2[1], 10))
  }
  const m2alt = altText.match(/([0-9,]+ ?m[2²])/)
  if (m2alt) {
    return String(parseInt(m2alt[1], 10))
  }
  return ''
}
