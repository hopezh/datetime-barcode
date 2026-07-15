export const FIELD_WIDTHS = {
  year: 12,
  month: 4,
  day: 5,
  hour: 5,
  minute: 6,
  second: 6,
}

const DATETIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})_(\d{2}):(\d{2}):(\d{2})$/

export function toBinary(value, width) {
  return value.toString(2).padStart(width, '0')
}

export function parseDatetime(input) {
  const match = DATETIME_PATTERN.exec(input)
  if (!match) {
    return { ok: false, error: 'Expected format YYYY-MM-DD_hh:mm:ss' }
  }
  const [, year, month, day, hour, minute, second] = match.map(Number)
  // Deliberately not leap-year/month-length aware — this is an encoder, not a calendar.
  if (month < 1 || month > 12) return { ok: false, error: 'Month must be 01–12' }
  if (day < 1 || day > 31) return { ok: false, error: 'Day must be 01–31' }
  if (hour > 23) return { ok: false, error: 'Hour must be 00–23' }
  if (minute > 59) return { ok: false, error: 'Minute must be 00–59' }
  if (second > 59) return { ok: false, error: 'Second must be 00–59' }
  return { ok: true, parts: { year, month, day, hour, minute, second } }
}

export function datetimeToBinary(input) {
  const parsed = parseDatetime(input)
  if (!parsed.ok) return parsed
  const { year, month, day, hour, minute, second } = parsed.parts
  // Per the confirmed canonical example, time-field separators render as '-',
  // not the input's ':' — only the date/time '_' divider is kept as-is.
  const date = [
    toBinary(year, FIELD_WIDTHS.year),
    toBinary(month, FIELD_WIDTHS.month),
    toBinary(day, FIELD_WIDTHS.day),
  ].join('-')
  const time = [
    toBinary(hour, FIELD_WIDTHS.hour),
    toBinary(minute, FIELD_WIDTHS.minute),
    toBinary(second, FIELD_WIDTHS.second),
  ].join('-')
  return { ok: true, binary: `${date}_${time}` }
}
