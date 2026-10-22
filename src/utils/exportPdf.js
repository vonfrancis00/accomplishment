// Export the already-paginated preview so the PDF uses the same A4 page breaks.
export async function exportReportPdf(profile) {
  const [{ toPng }, { jsPDF }] = await Promise.all([
    import('html-to-image'),
    import('jspdf'),
  ])
  await document.fonts.ready
  await Promise.all([...document.querySelectorAll('.report-pages img')].map(image => image.decode()))
  // Allow image/font load handlers to finish repaginating before capturing pages.
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  const pages = [...document.querySelectorAll('.report-pages > article')]
  if (!pages.length) throw new Error('The report preview is not ready. Please try again.')

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true })
  pdf.setProperties({ title: 'Accomplishment Report', author: profile.name })
  for (const [index, page] of pages.entries()) {
    const image = await toPng(page, {
      // CSS uses 96 DPI; 6.25x captures at 600 DPI. PNG stays lossless.
      pixelRatio: 600 / 96,
      backgroundColor: '#ffffff',
      style: { margin: '0', boxShadow: 'none' },
    })
    if (index > 0) pdf.addPage('a4', 'portrait')
    pdf.addImage(image, 'PNG', 0, 0, 210, 297, undefined, 'FAST')
  }
  const name = (profile.name || 'Employee').replace(/[^a-zA-Z0-9_-]+/g, '_')
  await pdf.save(`Accomplishment_Report_${name}_${profile.periodStart}_${profile.periodEnd}.pdf`, { returnPromise: true })
}
