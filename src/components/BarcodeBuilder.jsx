import { useState } from 'react'
import { SYMBOL_SETS } from '../data/symbolSets.js'
import { COLOR_POOL } from '../data/colorPool.js'
import { datetimeToCode } from '../logic/datetimeCode.js'
import { codeToBarcodeSegments } from '../logic/barcode.js'
import { sampleWithoutReplacement } from '../logic/random.js'
import SymbolSetPicker from './SymbolSetPicker.jsx'
import SymbolGrid from './SymbolGrid.jsx'
import DigitAssigner from './DigitAssigner.jsx'
import DatetimeInput from './DatetimeInput.jsx'
import CodeDisplay from './CodeDisplay.jsx'

const RANDOM_POOL = SYMBOL_SETS.filter((set) => !set.experimental).flatMap((set) => set.symbols)

const CODE_NAMES = { 2: 'binary', 3: 'ternary', 4: 'quaternary', 5: 'quinary', 6: 'senary' }
const DIGIT_LISTS = {
  2: '0 and 1',
  3: '0, 1, and 2',
  4: '0, 1, 2, and 3',
  5: '0, 1, 2, 3, and 4',
  6: '0, 1, 2, 3, 4, and 5',
}

function nowAsDatetimeInput() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  return `${date}_${time}`
}

export default function BarcodeBuilder({ base }) {
  const [selectedSetId, setSelectedSetId] = useState(SYMBOL_SETS[0].id)
  const [symbols, setSymbols] = useState(() => Array(base).fill(null))
  const [colors, setColors] = useState(() => Array(base).fill(null))
  const [assignTarget, setAssignTarget] = useState(0)
  const [datetimeInput, setDatetimeInput] = useState(nowAsDatetimeInput)
  const [code, setCode] = useState('')
  const [barcodeSegments, setBarcodeSegments] = useState(null)

  const codeName = CODE_NAMES[base]
  const codeLabel = codeName[0].toUpperCase() + codeName.slice(1)
  const selectedSet = SYMBOL_SETS.find((set) => set.id === selectedSetId)
  const codeResult = datetimeToCode(datetimeInput, base)
  const canTranslate = Boolean(code) && symbols.every(Boolean)

  function pickSymbol(symbol) {
    setSymbols(symbols.map((s, digit) => (digit === assignTarget ? symbol : s)))
    setAssignTarget((assignTarget + 1) % base)
  }

  function pickColor(digit, color) {
    setColors(colors.map((c, i) => (i === digit ? color : c)))
  }

  function randomizeSymbols() {
    setSymbols(sampleWithoutReplacement(RANDOM_POOL, base))
    setAssignTarget(0)
  }

  function randomizeColors() {
    setColors(sampleWithoutReplacement(COLOR_POOL, base))
  }

  function convert() {
    setCode(codeResult.ok ? codeResult.code : '')
  }

  function translate() {
    setBarcodeSegments(codeToBarcodeSegments(code, symbols, colors))
  }

  return (
    <>
      <section className="step">
        <h2>Step 1. Specify the date and time</h2>
        <DatetimeInput
          value={datetimeInput}
          error={datetimeInput && !codeResult.ok ? codeResult.error : null}
          onChange={setDatetimeInput}
        />
      </section>

      <section className="step">
        <h2>Step 2. Convert date &amp; time to {codeName} string</h2>
        <button type="button" className="action-button" disabled={!codeResult.ok} onClick={convert}>
          Convert
        </button>
        <CodeDisplay label={codeLabel} value={code} />
      </section>

      <section className="step">
        <h2>Step 3. Pick Symbols and Colors for {DIGIT_LISTS[base]}</h2>
        <DigitAssigner
          symbols={symbols}
          colors={colors}
          assignTarget={assignTarget}
          onArm={setAssignTarget}
          onPickColor={pickColor}
          onRandomizeSymbols={randomizeSymbols}
          onRandomizeColors={randomizeColors}
        />
      </section>

      <section className="step">
        <h2>Step 4. Select symbol set</h2>
        <SymbolSetPicker sets={SYMBOL_SETS} selectedSetId={selectedSetId} onSelect={setSelectedSetId} />
        {selectedSet.experimental && (
          <p className="warning">
            Experimental set: these glyphs may not render with default system fonts.
          </p>
        )}
        <SymbolGrid symbols={selectedSet.symbols} assigned={symbols} onPick={pickSymbol} />
      </section>

      <section className="step">
        <h2>Step 5. Convert the {codeName} string to barcode</h2>
        <button type="button" className="action-button" disabled={!canTranslate} onClick={translate}>
          Translate
        </button>
        <CodeDisplay
          label="Barcode"
          value={barcodeSegments ? barcodeSegments.map((seg) => seg.symbol).join('') : ''}
          segments={barcodeSegments}
        />
      </section>
    </>
  )
}
