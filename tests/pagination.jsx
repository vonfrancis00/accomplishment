import React from 'react'
import { createRoot } from 'react-dom/client'
import ReportDocument from '../src/components/ReportDocument.jsx'
import '../src/index.css'

const profile = {
  name: 'Pagination test', position: 'Staff', office: 'Office',
  periodStart: '2026-10-01', periodEnd: '2026-10-31',
  preparedBy: 'PREPARED NAME', preparedPosition: 'Staff',
  approvedBy: 'APPROVED NAME', approvedPosition: 'Director',
  footer: 'Report footer and contact information.',
}
const root = createRoot(document.getElementById('root'))
const results = []
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const previewOnly = new URLSearchParams(location.search).has('preview')
const cases = previewOnly ? [['preview', 35, false]] : [['short', 2, false], ['many rows', 85, false], ['empty rows', 35, false], ['oversized entry', 1, true]]
for (const [name, count, long] of cases) {
  const entries = Array.from({ length: count }, (_, i) => ({
    id: String(i), date: '2026-10-19', kind: 'work',
    items: name === 'empty rows' ? [] : [long ? 'Long accomplishment text. '.repeat(1400) : `Unique row ${i}. Completed daily work.`],
  }))
  root.render(<ReportDocument profile={profile} entries={entries} />)
  await delay(300)
  await document.fonts.ready
  const pages = [...document.querySelectorAll('#root .report-page')]
  const overflow = pages.some(page => {
    const content = page.firstElementChild
    return [...content.children].some(child => child.getBoundingClientRect().bottom > content.getBoundingClientRect().bottom + 1)
  })
  const headers = pages.map(page => page.querySelectorAll('.report-header').length)
  const sizeCorrect = pages.every(page => Math.abs(page.getBoundingClientRect().height / page.getBoundingClientRect().width - 297 / 210) < .001)
  const marginsCorrect = pages.every(page => {
    const sheet = page.getBoundingClientRect()
    const content = page.firstElementChild.getBoundingClientRect()
    const pxPerMm = sheet.width / 210
    return Math.abs((content.left - sheet.left) / pxPerMm - 25) < .1 &&
      Math.abs((sheet.right - content.right) / pxPerMm - 25) < .1 &&
      Math.abs((content.top - sheet.top) / pxPerMm - 12) < .1
  })
  const rowsPreserved = long || (name === 'empty rows' ? document.querySelectorAll('#root tbody tr').length === count : entries.every((_, i) => document.querySelector('#root').textContent.includes(`Unique row ${i}.`)))
  const outputText = [...document.querySelectorAll('#root tbody tr')].map(row => row.cells[1].textContent).join(' ').replace(/\s+/g, ' ').trim()
  const textPreserved = !long || outputText === entries[0].items[0].trim()
  const pass = pages.length >= (count > 20 || long ? 2 : 1) && !overflow && headers[0] === 1 && headers.slice(1).every(n => n === 0) && sizeCorrect && marginsCorrect && rowsPreserved && textPreserved
  results.push({ name, pass, pages: pages.length, headers, overflow, sizeCorrect, marginsCorrect, rowsPreserved, textPreserved })
}
document.getElementById('results').textContent = previewOnly ? '' : JSON.stringify(results)
document.title = results.every(result => result.pass) ? 'PASS' : 'FAIL'
