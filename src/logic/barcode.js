export function codeToBarcodeSegments(code, symbols, colors) {
  return [...code].map((char) => ({
    symbol: symbols[Number(char)] ?? ' ',
    color: colors[Number(char)] ?? null,
  }))
}

export function codeToBarcode(code, symbols) {
  return codeToBarcodeSegments(code, symbols, [])
    .map((segment) => segment.symbol)
    .join('')
}
