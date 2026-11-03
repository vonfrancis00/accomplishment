// Capture at 600 DPI using the physical A4 dimensions, independent of screen size.
export function pdfCaptureOptions(landscape = false) {
  const pixels = mm => Math.round(mm / 25.4 * 600)
  return {
    pixelRatio: 1,
    canvasWidth: pixels(landscape ? 297 : 210),
    canvasHeight: pixels(landscape ? 210 : 297),
    backgroundColor: '#ffffff',
    style: { margin: '0', boxShadow: 'none', transform: 'none' },
  }
}
