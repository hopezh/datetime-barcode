export default function ZeroOneAssigner({ zeroSymbol, oneSymbol, assignTarget, onArm }) {
  return (
    <div className="assigner">
      <SlotButton
        label="0"
        symbol={zeroSymbol}
        armed={assignTarget === 'zero'}
        onClick={() => onArm('zero')}
      />
      <SlotButton
        label="1"
        symbol={oneSymbol}
        armed={assignTarget === 'one'}
        onClick={() => onArm('one')}
      />
      <p className="assigner-hint">
        Click a slot, then click a symbol in the grid to assign it.
      </p>
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
