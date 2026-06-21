export function parseEventDate(dateString: string): Date {
  // Handles "June 14, 2026" and "2026-06-14" formats
  const d = new Date(dateString)
  if (!Number.isNaN(d.getTime())) return d
  // Fallback: "Month DD, YYYY"
  const m = dateString.match(/(\w+)\s+(\d{1,2}),?\s*(\d{4})/)
  if (m) return new Date(`${m[1]} ${parseInt(m[2])}, ${m[3]}`)
  return d
}
