export default function CodeDisplay({ label, value }) {
  return (
    <div className="code-display">
      <span className="field-label">{label}</span>
      <output className="code-value">{value || ' '}</output>
    </div>
  )
}
