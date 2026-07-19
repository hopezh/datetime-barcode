import { useState } from 'react'
import { SYMBOL_SETS } from '../data/symbolSets.js'
import { COLOR_POOL } from '../data/colorPool.js'
import { parseDatetime, stringToCode } from '../logic/datetimeCode.js'
import { codeToBarcodeSegments } from '../logic/barcode.js'
import { sampleWithoutReplacement } from '../logic/random.js'
import SymbolSetPicker from './SymbolSetPicker.jsx'
import SymbolGrid from './SymbolGrid.jsx'
import DigitAssigner from './DigitAssigner.jsx'
import DatetimeInput from './DatetimeInput.jsx'
import NumberPaste from './NumberPaste.jsx'
import CodeDisplay from './CodeDisplay.jsx'
import Step from './Step.jsx'

const RANDOM_POOL = SYMBOL_SETS.filter((set) => !set.experimental).flatMap((set) => set.symbols)

const CODE_NAMES = {
  2: 'binary',
  3: 'ternary',
  4: 'quaternary',
  5: 'quinary',
  6: 'senary',
  7: 'septenary',
  8: 'octal',
  9: 'nonary',
  10: 'decimal',
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
  const [source, setSource] = useState('')
  const [code, setCode] = useState('')
  const [barcodeSegments, setBarcodeSegments] = useState(null)

  const codeName = CODE_NAMES[base]
  const codeLabel = codeName[0].toUpperCase() + codeName.slice(1)
  const selectedSet = SYMBOL_SETS.find((set) => set.id === selectedSetId)
  const datetimeResult = parseDatetime(datetimeInput)
  const codeResult = stringToCode(source, base)
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

  function randomizeSymbolsInSet() {
    setSymbols(sampleWithoutReplacement(selectedSet.symbols, base))
    setAssignTarget(0)
  }

  function randomizeColors() {
    setColors(sampleWithoutReplacement(COLOR_POOL, base))
  }

  function applyOneRandomColor() {
    const [color] = sampleWithoutReplacement(COLOR_POOL, 1)
    setColors(Array(base).fill(color))
  }

  function convert() {
    setCode(codeResult.ok ? codeResult.code : '')
  }

  function translate() {
    setBarcodeSegments(codeToBarcodeSegments(code, symbols, colors))
  }

  return (
    <>
      <div className="step-row">
        <Step number="01" title="Specify date and time">
          <div className="step1-fields">
            <DatetimeInput
              value={datetimeInput}
              error={datetimeInput && !datetimeResult.ok ? datetimeResult.error : null}
              onChange={setDatetimeInput}
              onSend={setSource}
            />
            <NumberPaste onSend={setSource} />
          </div>
        </Step>

        <Step number="02" title="Convert date and time">
          <div className="field source-field">
            <span className="field-label">String to be converted</span>
            <input
              type="text"
              value={source}
              aria-label="String to be converted"
              onChange={(event) => setSource(event.target.value)}
            />
          </div>
          <button
            type="button"
            className="action-button filled"
            disabled={!codeResult.ok}
            onClick={convert}
          >
            Convert
          </button>
          <CodeDisplay label={codeLabel} value={code} copyable={false} />
        </Step>
      </div>

      <div className="step-row">
        <Step number="03" title="Pick symbols and colors">
          <DigitAssigner
            symbols={symbols}
            colors={colors}
            assignTarget={assignTarget}
            onArm={setAssignTarget}
            onPickColor={pickColor}
            onRandomizeSymbols={randomizeSymbols}
            onRandomizeSymbolsInSet={randomizeSymbolsInSet}
            onApplyOneRandomColor={applyOneRandomColor}
            onRandomizeColors={randomizeColors}
          />
        </Step>

        <Step number="04" title="Select symbol set">
          <SymbolSetPicker sets={SYMBOL_SETS} selectedSetId={selectedSetId} onSelect={setSelectedSetId} />
          {selectedSet.experimental && (
            <p className="warning">
              Experimental set: these glyphs may not render with default system fonts.
            </p>
          )}
          <SymbolGrid symbols={selectedSet.symbols} assigned={symbols} onPick={pickSymbol} />
        </Step>
      </div>

      <Step number="05" title={`Convert the ${codeName} string to barcode`}>
        <button
          type="button"
          className="action-button filled"
          disabled={!canTranslate}
          onClick={translate}
        >
          Translate
        </button>
        <CodeDisplay
          label="Barcode"
          value={barcodeSegments ? barcodeSegments.map((seg) => seg.symbol).join('') : ''}
          segments={barcodeSegments ?? []}
        />
        <p className="step-hint">
          When pasting in PowerPoint use the option &quot;keep source formatting&quot; to keep the
          colors.
        </p>
      </Step>
    </>
  )
}
