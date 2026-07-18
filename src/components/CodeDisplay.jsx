import CopyButton from './CopyButton.jsx'

function segmentsToHtml(segments) {
  const spans = segments
    .map(({ symbol, color }) =>
      color ? `<span style="color:${color}">${symbol}</span>` : symbol,
    )
    .join('')
  return `<span style="font-family:monospace">${spans}</span>`
}

export default function CodeDisplay({ label, value, segments }) {
  return (
    <div className="code-display">
      <span className="field-label">{label}</span>
      <div className="code-row">
        <output className={`code-value${segments ? ' symbols' : ''}`}>
          {segments
            ? segments.map((segment, i) => (
                <span key={i} style={segment.color ? { color: segment.color } : undefined}>
                  {segment.symbol}
                </span>
              ))
            : value || ' '}
        </output>
        <CopyButton text={value} html={segments ? segmentsToHtml(segments) : null} />
      </div>
    </div>
  )
}
