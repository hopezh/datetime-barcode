export function downloadConfig(symbols, colors, codeName) {
  const entries = symbols.map((symbol, number) => ({ number, symbol, color: colors[number] }))
  const json = JSON.stringify(entries, null, 2)
  const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${codeName}-number-symbol-color-config.json`
  link.click()
  URL.revokeObjectURL(url)
}

// Entries are matched by their number so a config saved under another
// base still loads: extra numbers are dropped, missing ones stay empty.
export async function readConfig(file, base) {
  const entries = JSON.parse(await file.text())
  const byNumber = new Map(entries.map((entry) => [entry.number, entry]))
  return {
    symbols: Array.from({ length: base }, (_, digit) => byNumber.get(digit)?.symbol ?? null),
    colors: Array.from({ length: base }, (_, digit) => byNumber.get(digit)?.color ?? null),
  }
}
