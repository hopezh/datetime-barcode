import { useState } from 'react'

export default function NumberPaste({ onSend }) {
  const [value, setValue] = useState('')

  return (
    <div className="field">
      <span className="field-label">
        Or, paste any number below, including &quot;-&quot; and &quot;_&quot;
      </span>
      <div className="number-paste-row">
        <input
          type="text"
          value={value}
          aria-label="Number to use instead of the datetime"
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button" disabled={!value} onClick={() => onSend(value)}>
          -&gt;
        </button>
      </div>
    </div>
  )
}
