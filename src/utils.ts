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
  const pattern = /([0-9,.]+)\s*(?:m[2²]|sq\.?\s*m)/i
  const m2 = text.match(pattern)
  if (m2) {
    return String(parseInt(m2[1], 10))
  }
  const m2alt = altText.match(pattern)
  if (m2alt) {
    return String(parseInt(m2alt[1], 10))
  }
  return ''
}
