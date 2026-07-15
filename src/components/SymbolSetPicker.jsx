export default function SymbolSetPicker({ sets, selectedSetId, onSelect }) {
  return (
    <label className="field">
      <span className="field-label">Symbol set</span>
      <select value={selectedSetId} onChange={(e) => onSelect(e.target.value)}>
        {sets.map((set) => (
          <option key={set.id} value={set.id}>
            {set.name}
          </option>
        ))}
      </select>
    </label>
  )
}
