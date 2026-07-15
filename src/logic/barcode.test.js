import { describe, it, expect } from 'bun:test'
import { codeToBarcode } from './barcode.js'

describe('codeToBarcode', () => {
  it('substitutes binary digits with the given symbols', () => {
    expect(codeToBarcode('0110', ['▖', '█'])).toBe('▖██▖')
  })

  it('substitutes ternary digits with the given symbols', () => {
    expect(codeToBarcode('0120', ['▖', '▚', '█'])).toBe('▖▚█▖')
  })

  it('replaces separators with a single space', () => {
    expect(codeToBarcode('01-10_1:0', ['▖', '█'])).toBe('▖█ █▖ █ ▖')
  })

  it('returns empty for empty input', () => {
    expect(codeToBarcode('', ['▖', '█'])).toBe('')
  })
})
