import CopyButton from './CopyButton.jsx'

// Native time pickers render AM/PM or 24-hour based on the OS locale and
// can't be forced to 24-hour, so the time uses three dropdowns instead.
export default function DatetimeInput({ value, error, onChange }) {
  const [datePart = '', timePart = ''] = value.split('_')
  const [hour = '00', minute = '00', second = '00'] = timePart.split(':')

  function update(date, h, m, s) {
    onChange(`${date}_${h}:${m}:${s}`)
  }

  return (
    <div className="field">
      <span className="field-label">Format: yyyy-mm-dd hh:mm:ss (24-hour)</span>
      <div className="datetime-row">
        <input
          type="date"
          value={datePart}
          onChange={(e) => update(e.target.value, hour, minute, second)}
        />
        <div className="time-selects">
          <TimeSelect value={hour} max={23} onChange={(h) => update(datePart, h, minute, second)} />
          <span>:</span>
          <TimeSelect value={minute} max={59} onChange={(m) => update(datePart, hour, m, second)} />
          <span>:</span>
          <TimeSelect value={second} max={59} onChange={(s) => update(datePart, hour, minute, s)} />
        </div>
        <CopyButton text={value} />
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

function TimeSelect({ value, max, onChange }) {
  const options = Array.from({ length: max + 1 }, (_, i) => String(i).padStart(2, '0'))
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}
