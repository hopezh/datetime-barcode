export const FIELD_WIDTHS = {
  2: { year: 12, month: 4, day: 5, hour: 5, minute: 6, second: 6 },
  3: { year: 8, month: 3, day: 4, hour: 3, minute: 4, second: 4 },
}

const DATETIME_PATTERN = /^(\d{4})-(\d{2})-(\d{2})_(\d{2}):(\d{2}):(\d{2})$/

export function toDigits(value, base, width) {
  return value.toString(base).padStart(width, '0')
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

export function datetimeToCode(input, base) {
  const parsed = parseDatetime(input)
  if (!parsed.ok) return parsed
  const { year, month, day, hour, minute, second } = parsed.parts
  const widths = FIELD_WIDTHS[base]
  // Per the confirmed canonical example, time-field separators render as '-',
  // not the input's ':' — only the date/time '_' divider is kept as-is.
  const date = [
    toDigits(year, base, widths.year),
    toDigits(month, base, widths.month),
    toDigits(day, base, widths.day),
  ].join('-')
  const time = [
    toDigits(hour, base, widths.hour),
    toDigits(minute, base, widths.minute),
    toDigits(second, base, widths.second),
  ].join('-')
  return { ok: true, code: `${date}_${time}` }
}
