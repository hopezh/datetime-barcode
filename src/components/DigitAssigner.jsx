export default function DigitAssigner({ symbols, assignTarget, onArm, onRandomize }) {
  return (
    <div className="assigner">
      <div className="assigner-slots">
        {symbols.map((symbol, digit) => (
          <SlotButton
            key={digit}
            label={String(digit)}
            symbol={symbol}
            armed={assignTarget === digit}
            onClick={() => onArm(digit)}
          />
        ))}
      </div>
      <p className="assigner-hint">
        Click a slot, then click a symbol in the grid to assign it.
      </p>
      <button type="button" onClick={onRandomize}>
        Randomize
      </button>
    </div>
  )
}

function SlotButton({ label, symbol, armed, onClick }) {
  return (
    <button
      type="button"
      className={`slot-button${armed ? ' armed' : ''}`}
      onClick={onClick}
    >
      <span className="slot-label">{label} =</span>
      <span className="slot-symbol">{symbol ?? '?'}</span>
    </button>
  )
}
