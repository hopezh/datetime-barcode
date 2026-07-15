export default function SymbolGrid({ symbols, assigned, onPick }) {
  return (
    <div className="symbol-grid">
      {symbols.map((symbol) => {
        const digit = assigned.indexOf(symbol)
        const badge = digit === -1 ? null : String(digit)
        return (
          <button
            key={symbol}
            type="button"
            className={`symbol-cell${badge ? ' assigned' : ''}`}
            onClick={() => onPick(symbol)}
          >
            <span className="symbol-glyph">{symbol}</span>
            {badge && <span className="symbol-badge">{badge}</span>}
          </button>
        )
      })}
    </div>
  )
}
