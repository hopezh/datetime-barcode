import { useEffect, useState } from 'react'
import { SYMBOL_SETS } from './data/symbolSets.js'
import { datetimeToBinary } from './logic/datetimeBinary.js'
import { binaryToBarcode } from './logic/barcode.js'
import ThemeToggle from './components/ThemeToggle.jsx'
import SymbolSetPicker from './components/SymbolSetPicker.jsx'
import SymbolGrid from './components/SymbolGrid.jsx'
import ZeroOneAssigner from './components/ZeroOneAssigner.jsx'
import DatetimeInput from './components/DatetimeInput.jsx'
import CodeDisplay from './components/CodeDisplay.jsx'

export default function App() {
  const [theme, setTheme] = useState(() =>
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const [selectedSetId, setSelectedSetId] = useState(SYMBOL_SETS[0].id)
  const [zeroSymbol, setZeroSymbol] = useState(null)
  const [oneSymbol, setOneSymbol] = useState(null)
  const [assignTarget, setAssignTarget] = useState('zero')
  const [datetimeInput, setDatetimeInput] = useState('')
  const [binary, setBinary] = useState('')
  const [barcode, setBarcode] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const selectedSet = SYMBOL_SETS.find((set) => set.id === selectedSetId)
  const binaryResult = datetimeToBinary(datetimeInput)
  const canTranslate = Boolean(binary && zeroSymbol && oneSymbol)

  function selectSet(setId) {
    setSelectedSetId(setId)
    setZeroSymbol(null)
    setOneSymbol(null)
    setAssignTarget('zero')
  }

  function pickSymbol(symbol) {
    if (assignTarget === 'zero') {
      setZeroSymbol(symbol)
      setAssignTarget('one')
    } else {
      setOneSymbol(symbol)
      setAssignTarget('zero')
    }
  }

  function convert() {
    setBinary(binaryResult.ok ? binaryResult.binary : '')
  }

  function translate() {
    setBarcode(binaryToBarcode(binary, zeroSymbol, oneSymbol))
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Datetime Barcode</h1>
        <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      </header>

      <section className="step">
        <h2>Step 1. Select symbol set</h2>
        <SymbolSetPicker sets={SYMBOL_SETS} selectedSetId={selectedSetId} onSelect={selectSet} />
        {selectedSet.experimental && (
          <p className="warning">
            Experimental set: these glyphs may not render with default system fonts.
          </p>
        )}
        <SymbolGrid
          symbols={selectedSet.symbols}
          zeroSymbol={zeroSymbol}
          oneSymbol={oneSymbol}
          onPick={pickSymbol}
        />
      </section>

      <section className="step">
        <h2>Step 2. Pick the symbols for zero and one</h2>
        <ZeroOneAssigner
          zeroSymbol={zeroSymbol}
          oneSymbol={oneSymbol}
          assignTarget={assignTarget}
          onArm={setAssignTarget}
        />
      </section>

      <section className="step">
        <h2>Step 3. Specify the date and time</h2>
        <DatetimeInput
          value={datetimeInput}
          error={datetimeInput && !binaryResult.ok ? binaryResult.error : null}
          onChange={setDatetimeInput}
        />
      </section>

      <section className="step">
        <h2>Step 4. Convert date &amp; time to binary string</h2>
        <button type="button" className="action-button" disabled={!binaryResult.ok} onClick={convert}>
          Convert
        </button>
        <CodeDisplay label="Binary" value={binary} />
      </section>

      <section className="step">
        <h2>Step 5. Convert the binary string to barcode</h2>
        <button type="button" className="action-button" disabled={!canTranslate} onClick={translate}>
          Translate
        </button>
        <CodeDisplay label="Barcode" value={barcode} />
      </section>
    </main>
  )
}
