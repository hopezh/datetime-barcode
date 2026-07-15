import { describe, it, expect } from 'bun:test'
import { binaryToBarcode } from './barcode.js'

describe('binaryToBarcode', () => {
  it('substitutes 0 and 1 with the given symbols', () => {
    expect(binaryToBarcode('0110', '▖', '█')).toBe('▖██▖')
  })

  it('replaces separators with a single space', () => {
    expect(binaryToBarcode('01-10_1:0', '▖', '█')).toBe('▖█ █▖ █ ▖')
  })

  it('returns empty for empty input', () => {
    expect(binaryToBarcode('', '▖', '█')).toBe('')
  })
})
