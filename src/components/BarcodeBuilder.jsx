import { useState } from 'react'
import { SYMBOL_SETS } from '../data/symbolSets.js'
import { datetimeToCode } from '../logic/datetimeCode.js'
import { codeToBarcode } from '../logic/barcode.js'
import SymbolSetPicker from './SymbolSetPicker.jsx'
import SymbolGrid from './SymbolGrid.jsx'
import DigitAssigner from './DigitAssigner.jsx'
import DatetimeInput from './DatetimeInput.jsx'
import CodeDisplay from './CodeDisplay.jsx'

const CODE_NAMES = { 2: 'binary', 3: 'ternary' }
const DIGIT_WORDS = { 2: 'zero and one', 3: 'zero, one and two' }

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
  const [assignTarget, setAssignTarget] = useState(0)
  const [datetimeInput, setDatetimeInput] = useState(nowAsDatetimeInput)
  const [code, setCode] = useState('')
  const [barcode, setBarcode] = useState('')

  const codeName = CODE_NAMES[base]
  const codeLabel = codeName[0].toUpperCase() + codeName.slice(1)
  const selectedSet = SYMBOL_SETS.find((set) => set.id === selectedSetId)
  const codeResult = datetimeToCode(datetimeInput, base)
  const canTranslate = Boolean(code) && symbols.every(Boolean)

  function pickSymbol(symbol) {
    setSymbols(symbols.map((s, digit) => (digit === assignTarget ? symbol : s)))
    setAssignTarget((assignTarget + 1) % base)
  }

  function convert() {
    setCode(codeResult.ok ? codeResult.code : '')
  }

  function translate() {
    setBarcode(codeToBarcode(code, symbols))
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
        <h2>Step 3. Pick the symbols for {DIGIT_WORDS[base]}</h2>
        <DigitAssigner symbols={symbols} assignTarget={assignTarget} onArm={setAssignTarget} />
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
        <CodeDisplay label="Barcode" value={barcode} />
      </section>
    </>
  )
}
