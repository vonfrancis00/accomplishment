import { pdfCaptureOptions } from './pdfCapture.js'

export async function exportIpcrPdf(data) {
  const [{ toPng }, { jsPDF }] = await Promise.all([import('html-to-image'), import('jspdf')])
  await document.fonts.ready
  await Promise.all([...document.querySelectorAll('.ipcr-pages img')].map(image => image.decode()))
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  const pages = [...document.querySelectorAll('.ipcr-pages > article')]
  if (!pages.length) throw new Error('The IPCR preview is not ready.')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true })
  pdf.setProperties({ title: 'Individual Performance Commitment and Review', author: data.name })
  for (const [index, page] of pages.entries()) {
    const image = await toPng(page, pdfCaptureOptions(true))
    if (index) pdf.addPage('a4', 'landscape')
    pdf.addImage(image, 'PNG', 0, 0, 297, 210, undefined, 'FAST')
  }
  const name = (data.name || 'Employee').replace(/[^a-zA-Z0-9_-]+/g, '_')
  await pdf.save(`IPCR_${name}.pdf`, { returnPromise: true })
}

