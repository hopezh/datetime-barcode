export function binaryToBarcode(binary, zeroSymbol, oneSymbol) {
  let barcode = ''
  for (const char of binary) {
    if (char === '0') barcode += zeroSymbol
    else if (char === '1') barcode += oneSymbol
    else barcode += ' '
  }
  return barcode
}
