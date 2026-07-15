export default function DatetimeInput({ value, error, onChange }) {
  return (
    <label className="field">
      <span className="field-label">Datetime (YYYY-MM-DD_hh:mm:ss)</span>
      <input
        type="text"
        value={value}
        placeholder="2026-07-14_23:12:00"
        spellCheck="false"
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}
