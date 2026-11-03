export function servicePeriod(value = new Date()) {
  if (!value) return ''
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()
  const firstHalf = date.getDate() <= 15
  const start = firstHalf ? 1 : 16
  const end = firstHalf ? 15 : new Date(year, date.getMonth() + 1, 0).getDate()
  return `${month} ${start} - ${month} ${end}, ${year}`
}

export function serviceDateToday() {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}
