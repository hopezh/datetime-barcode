import { Fragment, useState } from 'react'
import { COLOR_POOL } from '../data/colorPool.js'
import { codeToBarcodeSegments } from '../logic/barcode.js'
import { sampleWithoutReplacement } from '../logic/random.js'

// The time 18:35:49 (not a rounder value) makes every base's string use all of its digits.
const DATETIME_LINE = '           -> 2026-07-15_18:35:49'

const EXAMPLE_ROWS = [
  { name: 'binary', base: 2, code: '011111101010-0111-01111_10010-100011-110001', symbols: ['▒', '▚'] },
  { name: 'ternary', base: 3, code: '02210001-021-0120_200-1022-1211', symbols: ['▖', '▀', '█'] },
  { name: 'quaternary', base: 4, code: '133222-13-033_102-203-301', symbols: ['▁', '▄', '▐', '▟'] },
  { name: 'quinary', base: 5, code: '031101-12-030_33-120-144', symbols: ['▘', '▌', '░', '▓', '▇'] },
  { name: 'senary', base: 6, code: '13214-11-23_30-055-121', symbols: ['▂', '▝', '▐', '▛', '▙', '█'] },
  { name: 'septenary', base: 7, code: '05623-10-21_24-050-100', symbols: ['▁', '▂', '▃', '▄', '▅', '▆', '▇'] },
  { name: 'nonary', base: 9, code: '02701-07-16_20-38-54', symbols: ['▘', '▝', '▖', '▗', '▚', '▞', '▛', '▟', '█'] },
  { name: 'decimal', base: 10, code: '2026-07-15_18-35-49', symbols: ['▔', '▏', '▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'] },
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
