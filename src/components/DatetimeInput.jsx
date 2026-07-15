// <input type="datetime-local"> uses 'T' between date and time and may omit
// ':00' seconds; the app's canonical format is 'YYYY-MM-DD_hh:mm:ss'.
function toPickerValue(canonical) {
  return canonical.replace('_', 'T')
}

function toCanonical(pickerValue) {
  if (!pickerValue) return ''
  const withSeconds = pickerValue.length === 16 ? `${pickerValue}:00` : pickerValue
  return withSeconds.replace('T', '_')
}

export default function DatetimeInput({ value, error, onChange }) {
  return (
    <label className="field">
      <span className="field-label">Format: yyyy-mm-dd hh:mm:ss</span>
      <input
        type="datetime-local"
        step="1"
        value={toPickerValue(value)}
        onChange={(e) => onChange(toCanonical(e.target.value))}
      />
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}
