const fs = require('node:fs')
const postcss = require('postcss')
function declarations(file) {
  const result = new Map()
  postcss.parse(fs.readFileSync(file, 'utf8')).walkRules(rule => {
    let context = ''
    for (let parent = rule.parent; parent; parent = parent.parent) {
      if (parent.type === 'atrule') context += `@${parent.name} ${parent.params}|`
    }
    for (const selector of rule.selector.split(/,(?![^()]*\))/)) {
      if (!/\.(dv-|landing|ipcr-|workspace|report|app-)/.test(selector)) continue
      const key = context + selector
      const values = result.get(key) || new Map()
      rule.walkDecls(decl => values.set(decl.prop, decl.value))
      result.set(key, values)
    }
  })
  return result
}
const before = declarations('tmp/style-refactor/before.css')
const afterFile = fs.readdirSync('dist/assets').find(name => /^index-.*\.css$/.test(name))
const after = declarations(`dist/assets/${afterFile}`)
const differences = []
for (const [selector, values] of before) {
  for (const [prop, value] of values) {
    const actual = after.get(selector)?.get(prop)
    if (actual !== value) differences.push({ selector, prop, before: value, after: actual })
  }
}
console.log(JSON.stringify({ comparedRules: before.size, differences }, null, 2))
