// Must match the largest .symbol-grid column count in index.css: blank cells
// pad the last row so the hairline grid never exposes its container color.
const GRID_COLUMNS = 16

export default function SymbolGrid({ symbols, assigned, onPick }) {
  const blanks = (GRID_COLUMNS - (symbols.length % GRID_COLUMNS)) % GRID_COLUMNS
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
      {Array.from({ length: blanks }, (_, i) => (
        <div key={`blank-${i}`} className="symbol-cell" aria-hidden="true" />
      ))}
    </div>
  )
}
