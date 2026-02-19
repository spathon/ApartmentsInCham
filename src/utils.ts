export function removeNoneDigit(text: string): string {
  return text.replace(/ /g, '').replace(/\D/g, '')
}

export function formatPrice(priceText: string): string {
  return removeNoneDigit(priceText)
}

export function trimM2(text: string): string {
  return text.replace(',', '.').replace(/[Mm][2²]/, '').trim()
}

export function matchPrice(text: string): string {
  // Match "480 000 €" or "€ 480 000" or "€480,000"
  const trailing = text.match(/([\d\s.,]+)\s*€/)
  if (trailing) {
    return removeNoneDigit(trailing[1])
  }
  const leading = text.match(/€\s*([\d\s.,]+)/)
  if (leading) {
    return removeNoneDigit(leading[1])
  }
  return ''
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
