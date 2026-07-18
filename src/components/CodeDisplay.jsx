import CopyButton from './CopyButton.jsx'

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
        <CopyButton text={value} />
      </div>
    </div>
  )
}
