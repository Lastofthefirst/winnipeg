const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  janvier: 1, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, aout: 8, septembre: 9, octobre: 10, novembre: 11, decembre: 12,
}

function monthByName(name: string): number | undefined {
  const key = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace('.', '')
  return MONTHS[key]
}

export function parseEventDate(dateString: string): Date {
  const parsed = new Date(dateString)
  if (!Number.isNaN(parsed.getTime())) return parsed
  // "July 12, 2026"
  const monthDayYear = dateString.match(/(\w+)\s+(\d{1,2}),?\s+(\d{4})/)
  if (monthDayYear) {
    const month = monthByName(monthDayYear[1])
    if (month) return new Date(Number(monthDayYear[3]), month - 1, Number(monthDayYear[2]))
  }
  // "14 juin 2026"
  const dayMonthYear = dateString.match(/(\d{1,2})\s+(\w+)\s+(\d{4})/)
  if (dayMonthYear) {
    const month = monthByName(dayMonthYear[2])
    if (month) return new Date(Number(dayMonthYear[3]), month - 1, Number(dayMonthYear[1]))
  }
  return parsed
}
