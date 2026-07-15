import { describe, it, expect } from 'bun:test'
import { parseDatetime, datetimeToCode, toDigits } from './datetimeCode.js'

describe('toDigits', () => {
  it('pads to the requested width', () => {
    expect(toDigits(7, 2, 4)).toBe('0111')
    expect(toDigits(0, 2, 6)).toBe('000000')
  })

  it('encodes year 4095 as twelve binary 1s', () => {
    expect(toDigits(4095, 2, 12)).toBe('111111111111')
  })

  it('encodes ternary digits', () => {
    expect(toDigits(7, 3, 3)).toBe('021')
    expect(toDigits(6560, 3, 8)).toBe('22222222')
  })

  it('encodes quaternary digits', () => {
    expect(toDigits(7, 4, 2)).toBe('13')
    expect(toDigits(4095, 4, 6)).toBe('333333')
  })

  it('encodes quinary digits', () => {
    expect(toDigits(7, 5, 2)).toBe('12')
    expect(toDigits(3124, 5, 5)).toBe('44444')
  })

  it('encodes senary digits', () => {
    expect(toDigits(7, 6, 2)).toBe('11')
    expect(toDigits(1295, 6, 4)).toBe('5555')
  })
})

describe('parseDatetime', () => {
  it('accepts a well-formed datetime', () => {
    const result = parseDatetime('2026-07-14_23:12:00')
    expect(result.ok).toBe(true)
    expect(result.parts).toEqual({
      year: 2026,
      month: 7,
      day: 14,
      hour: 23,
      minute: 12,
      second: 0,
    })
  })

  it('rejects wrong shape', () => {
    expect(parseDatetime('2026-07-14 23:12:00').ok).toBe(false)
    expect(parseDatetime('2026-7-14_23:12:00').ok).toBe(false)
  })

  it('rejects empty input', () => {
    expect(parseDatetime('').ok).toBe(false)
  })

  it('rejects out-of-range components', () => {
    expect(parseDatetime('2026-13-14_23:12:00').ok).toBe(false)
    expect(parseDatetime('2026-07-00_23:12:00').ok).toBe(false)
    expect(parseDatetime('2026-07-14_24:12:00').ok).toBe(false)
  })
})

describe('datetimeToCode base 2', () => {
  it('encodes the canonical example', () => {
    const result = datetimeToCode('2026-07-14_23:12:00', 2)
    expect(result.ok).toBe(true)
    expect(result.code).toBe('011111101010-0111-01110_10111-001100-000000')
  })

  it('places separators at field boundaries', () => {
    const { code } = datetimeToCode('2026-07-14_23:12:00', 2)
    expect(code[12]).toBe('-')
    expect(code[17]).toBe('-')
    expect(code[23]).toBe('_')
    expect(code[29]).toBe('-')
    expect(code[36]).toBe('-')
  })

  it('propagates parse errors', () => {
    const result = datetimeToCode('not-a-datetime', 2)
    expect(result.ok).toBe(false)
    expect(result.error).toBeTruthy()
  })
})

describe('datetimeToCode base 3', () => {
  it('encodes the canonical example', () => {
    const result = datetimeToCode('2026-07-14_23:12:00', 3)
    expect(result.ok).toBe(true)
    expect(result.code).toBe('02210001-021-0112_212-0110-0000')
  })

  it('places separators at field boundaries', () => {
    const { code } = datetimeToCode('2026-07-14_23:12:00', 3)
    expect(code[8]).toBe('-')
    expect(code[12]).toBe('-')
    expect(code[17]).toBe('_')
    expect(code[21]).toBe('-')
    expect(code[26]).toBe('-')
  })
})

describe('datetimeToCode base 4', () => {
  it('encodes the canonical example', () => {
    const result = datetimeToCode('2026-07-14_23:12:00', 4)
    expect(result.ok).toBe(true)
    expect(result.code).toBe('133222-13-032_113-030-000')
  })

  it('places separators at field boundaries', () => {
    const { code } = datetimeToCode('2026-07-14_23:12:00', 4)
    expect(code[6]).toBe('-')
    expect(code[9]).toBe('-')
    expect(code[13]).toBe('_')
    expect(code[17]).toBe('-')
    expect(code[21]).toBe('-')
  })
})

describe('datetimeToCode base 5', () => {
  it('encodes the canonical example', () => {
    const result = datetimeToCode('2026-07-14_23:12:00', 5)
    expect(result.ok).toBe(true)
    expect(result.code).toBe('031101-12-024_43-022-000')
  })

  it('places separators at field boundaries', () => {
    const { code } = datetimeToCode('2026-07-14_23:12:00', 5)
    expect(code[6]).toBe('-')
    expect(code[9]).toBe('-')
    expect(code[13]).toBe('_')
    expect(code[16]).toBe('-')
    expect(code[20]).toBe('-')
  })
})

describe('datetimeToCode base 6', () => {
  it('encodes the canonical example', () => {
    const result = datetimeToCode('2026-07-14_23:12:00', 6)
    expect(result.ok).toBe(true)
    expect(result.code).toBe('13214-11-22_35-020-000')
  })

  it('places separators at field boundaries', () => {
    const { code } = datetimeToCode('2026-07-14_23:12:00', 6)
    expect(code[5]).toBe('-')
    expect(code[8]).toBe('-')
    expect(code[11]).toBe('_')
    expect(code[14]).toBe('-')
    expect(code[18]).toBe('-')
  })
})
