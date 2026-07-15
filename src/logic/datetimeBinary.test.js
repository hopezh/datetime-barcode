import { describe, it, expect } from 'bun:test'
import { parseDatetime, datetimeToBinary, toBinary } from './datetimeBinary.js'

describe('toBinary', () => {
  it('pads to the requested width', () => {
    expect(toBinary(7, 4)).toBe('0111')
    expect(toBinary(0, 6)).toBe('000000')
  })

  it('encodes year 4095 as twelve 1s', () => {
    expect(toBinary(4095, 12)).toBe('111111111111')
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

describe('datetimeToBinary', () => {
  it('encodes the canonical example', () => {
    const result = datetimeToBinary('2026-07-14_23:12:00')
    expect(result.ok).toBe(true)
    expect(result.binary).toBe('011111101010-0111-01110_10111-001100-000000')
  })

  it('places separators at field boundaries', () => {
    const { binary } = datetimeToBinary('2026-07-14_23:12:00')
    expect(binary[12]).toBe('-')
    expect(binary[17]).toBe('-')
    expect(binary[23]).toBe('_')
    expect(binary[29]).toBe('-')
    expect(binary[36]).toBe('-')
  })

  it('propagates parse errors', () => {
    const result = datetimeToBinary('not-a-datetime')
    expect(result.ok).toBe(false)
    expect(result.error).toBeTruthy()
  })
})
