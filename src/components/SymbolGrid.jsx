export default function SymbolGrid({ symbols, zeroSymbol, oneSymbol, onPick }) {
  return (
    <div className="symbol-grid">
      {symbols.map((symbol) => {
        const badge = symbol === zeroSymbol ? '0' : symbol === oneSymbol ? '1' : null
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
