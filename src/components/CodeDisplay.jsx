import CopyButton from './CopyButton.jsx'

export default function CodeDisplay({ label, value }) {
  return (
    <div className="code-display">
      <span className="field-label">{label}</span>
      <div className="code-row">
        <output className="code-value">{value || ' '}</output>
        <CopyButton text={value} />
      </div>
    </div>
  )
}
