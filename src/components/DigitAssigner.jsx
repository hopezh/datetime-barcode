import { useRef } from 'react'
import { downloadConfig, readConfig } from '../logic/configFile.js'

export default function DigitAssigner({
  symbols,
  colors,
  assignTarget,
  onArm,
  onPickColor,
  onRandomizeSymbols,
  onRandomizeSymbolsInSet,
  onApplyOneRandomColor,
  onRandomizeColors,
  onImport,
  codeName,
}) {
  const fileInputRef = useRef(null)

  async function importConfig(event) {
    const [file] = event.target.files
    if (!file) return
    try {
      onImport(await readConfig(file, symbols.length))
    } catch {
      // Not a readable config file — leave the current assignment untouched.
    }
    event.target.value = ''
  }

  return (
    <div className="assigner">
      <p className="assigner-hint">
        Click a slot, pick a symbol from Step 4, and assign a color.
      </p>
      <div className="assigner-slots">
        {symbols.map((symbol, digit) => (
          <div key={digit} className="assigner-slot">
            <SlotButton
              label={String(digit)}
              symbol={symbol}
              color={colors[digit]}
              armed={assignTarget === digit}
              onClick={() => onArm(digit)}
            />
            <input
              type="color"
              className="slot-color"
              value={colors[digit] ?? '#808080'}
              aria-label={`Color for digit ${digit}`}
              onChange={(event) => onPickColor(digit, event.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="assigner-actions-stack">
        <div className="assigner-actions">
          <div className="assigner-actions-column">
            <button type="button" onClick={onRandomizeSymbolsInSet}>
              Assign random symbols in the selected set only
            </button>
            <button type="button" onClick={onRandomizeSymbols}>
              Assign random symbols across all sets
            </button>
          </div>
          <div className="assigner-actions-column">
            <button type="button" onClick={onApplyOneRandomColor}>
              Assign one random color
            </button>
            <button type="button" onClick={onRandomizeColors}>
              Assign unique random colors
            </button>
          </div>
        </div>
        <div className="assigner-actions">
          <button type="button" onClick={() => fileInputRef.current.click()}>
            Import number-symbol-color config
          </button>
          <button type="button" onClick={() => downloadConfig(symbols, colors, codeName)}>
            Export number-symbol-color config
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          hidden
          onChange={importConfig}
        />
      </div>
    </div>
  )
}

function SlotButton({ label, symbol, color, armed, onClick }) {
  return (
    <button
      type="button"
      className={`slot-button${armed ? ' armed' : ''}`}
      onClick={onClick}
    >
      <span className="slot-label">{label} =</span>
      <span className="slot-symbol" style={color ? { color } : undefined}>
        {symbol ?? '?'}
      </span>
    </button>
  )
}
