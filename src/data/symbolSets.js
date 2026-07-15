function codepointRange(start, end) {
  const symbols = []
  for (let cp = start; cp <= end; cp++) {
    symbols.push(String.fromCodePoint(cp))
  }
  return symbols
}

export const SYMBOL_SETS = [
  {
    id: 'blockElements',
    name: 'Block Elements',
    experimental: false,
    symbols: codepointRange(0x2580, 0x259f),
  },
  {
    id: 'boxDrawing',
    name: 'Box Drawing',
    experimental: false,
    symbols: codepointRange(0x2500, 0x257f),
  },
  {
    id: 'geometricShapes',
    name: 'Geometric Shapes',
    experimental: false,
    symbols: codepointRange(0x25a0, 0x25ff),
  },
  {
    id: 'legacyComputing',
    name: 'Legacy Computing — Sextants (experimental)',
    experimental: true,
    symbols: codepointRange(0x1fb00, 0x1fb3b),
  },
]
