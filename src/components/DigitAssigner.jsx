export default function DigitAssigner({
  symbols,
  colors,
  assignTarget,
  onArm,
  onPickColor,
  onRandomizeSymbols,
  onRandomizeSymbolsInSet,
  onRandomizeColors,
}) {
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
      <div className="assigner-actions">
        <div className="assigner-actions-column">
          <button type="button" onClick={onRandomizeSymbolsInSet}>
            Randomize symbols in selected set only
          </button>
          <button type="button" onClick={onRandomizeSymbols}>
            Randomize symbols across all sets
          </button>
        </div>
        <button type="button" onClick={onRandomizeColors}>
          Randomize colors
        </button>
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
