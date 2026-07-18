import { Fragment, useState } from 'react'
import { COLOR_POOL } from '../data/colorPool.js'
import { codeToBarcodeSegments } from '../logic/barcode.js'
import { sampleWithoutReplacement } from '../logic/random.js'

// Seconds are 59 (not a rounder value) so every base's string uses all of its digits.
const DATETIME_LINE = '------------> 2026-07-15_21:08:59'

const EXAMPLE_ROWS = [
  { name: 'binary', base: 2, code: '011111101010-0111-01111_10101-001000-111011', symbols: ['▒', '▚'] },
  { name: 'ternary', base: 3, code: '02210001-021-0120_210-0022-2012', symbols: ['▖', '▀', '█'] },
  { name: 'quaternary', base: 4, code: '133222-13-033_111-020-323', symbols: ['▁', '▄', '▐', '▟'] },
  { name: 'quinary', base: 5, code: '031101-12-030_41-013-214', symbols: ['▘', '▌', '░', '▓', '▇'] },
  { name: 'senary', base: 6, code: '13214-11-23_33-012-135', symbols: ['▂', '▝', '▐', '▛', '▙', '█'] },
]

export default function ExampleSubtitle() {
  const [rowColors] = useState(() =>
    EXAMPLE_ROWS.map((row) => sampleWithoutReplacement(COLOR_POOL, row.base)),
  )

  return (
    <pre className="subtitle">
      {DATETIME_LINE}
      {EXAMPLE_ROWS.map((row, rowIndex) => (
        <Fragment key={row.name}>
          {'\n\n' + row.name.padEnd(10) + ' -> ' + row.code + '\n           -> '}
          {codeToBarcodeSegments(row.code, row.symbols, rowColors[rowIndex]).map((segment, i) => (
            <span key={i} style={segment.color ? { color: segment.color } : undefined}>
              {segment.symbol}
            </span>
          ))}
        </Fragment>
      ))}
    </pre>
  )
}
