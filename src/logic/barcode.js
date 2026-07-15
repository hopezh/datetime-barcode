export function codeToBarcode(code, symbols) {
  let barcode = ''
  for (const char of code) {
    barcode += symbols[Number(char)] ?? ' '
  }
  return barcode
}
