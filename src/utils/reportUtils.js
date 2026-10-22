export const todayISO = () => new Date().toISOString().slice(0, 10)

export const getReportingPeriod = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const secondHalf = date.getDate() >= 16
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
  const lastDay = new Date(year, month + 1, 0).getDate()

  return {
    periodStart: `${prefix}-${secondHalf ? '16' : '01'}`,
    periodEnd: `${prefix}-${secondHalf ? lastDay : '15'}`,
  }
}

export const makeEntry = (date = todayISO()) => ({
  id: crypto.randomUUID(),
  date,
  kind: 'work',
  note: '',
  items: [''],
})

export const createSampleEntries = () => [
  {
    ...makeEntry('2026-10-01'),
    items: [
      'Continued coding the CHED iCARE Monitoring Dashboard.',
      'Debugged the login flow backend.',
      'Debugged the sending credential thru email.',
      'Debugged the backend for the fetching of data.',
      'Performed other tasks given to me by the office.',
    ],
  },
  {
    ...makeEntry('2026-10-02'),
    kind: 'special',
    note: 'Compressed workweek schedule in compliance to MC No. 114, s. 2026 (NON-WORKING DAY)',
    items: [],
  },
  { ...makeEntry('2026-10-03'), kind: 'weekend', note: 'SATURDAY', items: [] },
  { ...makeEntry('2026-10-04'), kind: 'weekend', note: 'SUNDAY', items: [] },
]

export const formatReportDate = iso => {
  if (!iso) return ''
  const [year, month, day] = iso.split('-')
  return `${month}/${day}/${year}`
}
// UTC calendar arithmetic keeps dates stable across time zones and DST changes.
export const entriesForPeriod = (start, end, existing = []) => {
  const parseDate = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return null
    const date = new Date(`${value}T00:00:00Z`)
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null
  }
  const first = parseDate(start)
  const last = parseDate(end)
  if (!first || !last || first > last) return []

  const byDate = new Map(existing.map(entry => [entry.date, entry]))
  const result = []
  for (const date = new Date(first); date <= last; date.setUTCDate(date.getUTCDate() + 1)) {
    const iso = date.toISOString().slice(0, 10)
    const saved = byDate.get(iso)
    if (saved) {
      result.push(saved)
      continue
    }
    const day = date.getUTCDay()
    result.push(day === 0 || day === 6
      ? { ...makeEntry(iso), kind: 'weekend', note: day === 6 ? 'SATURDAY' : 'SUNDAY', items: [] }
      : day === 5
        ? { ...makeEntry(iso), kind: 'special', note: 'Compressed workweek schedule in compliance to MC No. 114, s. 2026 (NON-WORKING DAY)', items: [] }
        : makeEntry(iso))
  }
  return result
}
