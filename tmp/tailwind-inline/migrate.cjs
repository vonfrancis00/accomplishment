const fs = require('node:fs')
const path = require('node:path')
const postcss = require('postcss')
const { compile } = require('@tailwindcss/node')
const simple = {
  'display:flex':'flex', 'display:grid':'grid', 'display:block':'block', 'display:none':'hidden',
  'display:inline-flex':'inline-flex', 'position:absolute':'absolute', 'position:relative':'relative',
  'align-items:center':'items-center', 'align-items:flex-start':'items-start',
  'justify-content:center':'justify-center', 'justify-content:space-between':'justify-between',
  'flex-direction:column':'flex-col', 'flex-wrap:wrap':'flex-wrap', 'flex-shrink:0':'shrink-0',
  'overflow:hidden':'overflow-hidden', 'overflow-x:auto':'overflow-x-auto',
  'text-align:center':'text-center', 'white-space:nowrap':'whitespace-nowrap',
  'width:100%':'w-full', 'height:100%':'h-full', 'min-width:0':'min-w-0',
}
const encode = text => text.replace(/_/g, '\\_').replace(/\s+/g, '_')
function mediaVariant(value) {
  const max = value.match(/^\(max-width:\s*(\d+)px\)$/)
  const min = value.match(/^\(min-width:\s*(\d+)px\)$/)
  if (max) return `max-[${Number(max[1]) + 0.02}px]:`
  if (min) return `min-[${min[1]}px]:`
  if (value === 'print') return 'print:'
  return `[@media(${encode(value)})]:`
}
async function migrate(cssFile, jsxFile) {
  const css = fs.readFileSync(cssFile, 'utf8')
  const compiled = await compile(css, { base: path.resolve('src/pages'), onDependency() {} })
  const root = postcss.parse(compiled.build([]))
  const groups = new Map()
  const native = []
  root.walkAtRules(rule => {
    if (['page', 'keyframes'].includes(rule.name)) { native.push(rule.toString()); rule.remove() }
  })
  root.walkRules(rule => {
    if (!rule.selector.startsWith('.')) return
    const media = []
    for (let parent = rule.parent; parent; parent = parent.parent) {
      if (parent.type === 'atrule' && parent.name === 'media') media.unshift(mediaVariant(parent.params))
    }
    for (const selector of rule.selector.split(/,(?![^()]*\))/)) {
      const match = selector.trim().match(/^\.([\w-]+)(.*)$/)
      if (!match) continue
      const [, anchor, tail] = match
      if (anchor === 'app-shell') continue // Shared print shell is handled in the Tailwind entry.
      const key = `${media.join('')}|${selector.trim()}`
      const group = groups.get(key) || { anchor, tail, media: media.join(''), values: new Map() }
      rule.walkDecls(decl => {
        // Expand spacing shorthands so utility sorting cannot reset a side override.
        if (['padding','margin'].includes(decl.prop) && !decl.value.includes('(')) {
          const parts = decl.value.split(/\s+/)
          const sides = [parts[0],parts[1]||parts[0],parts[2]||parts[0],parts[3]||parts[1]||parts[0]]
          ;['top','right','bottom','left'].forEach((side,i)=>group.values.set(`${decl.prop}-${side}`,sides[i]))
        } else if (decl.prop === 'border') {
          for (const side of ['top','right','bottom','left']) group.values.set(`border-${side}`, decl.value)
        } else group.values.set(decl.prop, decl.value)
      })
      groups.set(key, group)
    }
  })
  const styles = new Map()
  for (const {anchor,tail,media,values} of groups.values()) {
    const prefix = media + (tail ? `[&${encode(tail)}]:` : '')
    const tokens = styles.get(anchor) || []
    for (const [property,value] of values) {
      const utility = simple[`${property}:${value}`] || `[${property}:${encode(value)}]`
      tokens.push(prefix + utility)
    }
    styles.set(anchor,tokens)
  }
  let jsx = fs.readFileSync(jsxFile,'utf8').replace(/^import ['"]\.\/[^'"]+\.css['"]\r?\n/m,'')
  const used = new Set()
  // Static class strings and the literal portion of template class strings.
  jsx = jsx.replace(/className=(?:\{`([\s\S]*?)`\}|"([^"]*)")/g, (match,template,literal) => {
    const source = template ?? literal
    const expanded = source.replace(/(?<![\w-])[a-z][\w-]*(?![\w-])/g, token => {
      if (!styles.has(token)) return token
      used.add(token)
      return `${token} ${styles.get(token).join(' ')}`
    })
    return template === undefined ? `className="${expanded}"` : 'className={`' + expanded + '`}'
  })
  fs.writeFileSync(jsxFile,jsx)
  fs.appendFileSync('src/index.css','\n'+native.join('\n')+'\n')
  console.log(jsxFile, 'inlined anchors:',used.size,'unused:',[...styles.keys()].filter(key=>!used.has(key)).join(', '))
}
(async()=>{
 await migrate('src/pages/landing.css','src/pages/LandingPage.jsx')
 await migrate('src/pages/disbursement.css','src/pages/DisbursementPage.jsx')
})().catch(error=>{console.error(error);process.exitCode=1})
