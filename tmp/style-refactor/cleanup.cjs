const fs = require('node:fs')
const postcss = require('postcss')
const prefixes = { 'font-size':'text', color:'text', 'font-weight':'font', width:'w', height:'h', gap:'gap', padding:'p', 'padding-top':'pt', 'padding-bottom':'pb', 'padding-left':'pl', 'padding-right':'pr', margin:'m', 'margin-top':'mt', 'margin-bottom':'mb', 'margin-left':'ml', 'margin-right':'mr', 'border-radius':'rounded', 'box-shadow':'shadow', 'line-height':'leading', 'letter-spacing':'tracking', 'max-width':'max-w', 'min-height':'min-h', 'max-height':'max-h' }
for (const file of ['src/pages/disbursement.css', 'src/pages/landing.css', 'src/index.css']) {
  const root = postcss.parse(fs.readFileSync(file, 'utf8'))
  root.walkAtRules('apply', rule => {
    rule.params = rule.params.replace(/\[([a-z-]+):([^\]]+)\]/g, (match, prop, value) => {
      if (!(prop in prefixes)) return match
      if (prop === 'font-size' && /^(?:\d|\.)/.test(value)) return `text-[length:${value}]`
      return `${prefixes[prop]}-[${value}]`
    })
    const previous = rule.prev()
    if (previous?.type === 'atrule' && previous.name === 'apply') {
      previous.params += ` ${rule.params}`
      rule.remove()
    }
  })
  fs.writeFileSync(file, root.toString())
}
const file = 'src/pages/DisbursementPage.jsx'
let text = fs.readFileSync(file, 'utf8')
text = text.replace(/Select a date to automatically[^<]+/, 'Select a date to automatically use the 1st-15th or the 16th-last day of that month.')
text = text.replace(/Appendix 32 [^<]+Disbursement Voucher/, 'Appendix 32 &middot; Disbursement Voucher')
text = text.replace("const page = document.querySelector('.dv-paper')", "const page = document.querySelector('.dv-paper')\n      if (!page) throw new Error('The voucher preview is not ready.')")
fs.writeFileSync(file, text)
