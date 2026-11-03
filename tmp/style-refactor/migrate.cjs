const fs = require('node:fs')
const postcss = require('postcss')
const utilities = {
  'display:flex': 'flex', 'display:grid': 'grid', 'display:block': 'block',
  'display:none': 'hidden', 'display:inline-flex': 'inline-flex',
  'position:relative': 'relative', 'position:absolute': 'absolute',
  'align-items:center': 'items-center', 'align-items:flex-start': 'items-start',
  'align-items:stretch': 'items-stretch', 'justify-content:center': 'justify-center',
  'justify-content:space-between': 'justify-between', 'flex-direction:column': 'flex-col',
  'flex-wrap:wrap': 'flex-wrap', 'flex-shrink:0': 'shrink-0',
  'overflow:hidden': 'overflow-hidden', 'overflow:visible': 'overflow-visible',
  'overflow-x:auto': 'overflow-x-auto', 'text-align:center': 'text-center',
  'white-space:nowrap': 'whitespace-nowrap', 'white-space:pre-wrap': 'whitespace-pre-wrap',
  'background:white': 'bg-white', 'background:transparent': 'bg-transparent',
  'color:white': 'text-white', 'color:black': 'text-black',
  'width:100%': 'w-full', 'height:100%': 'h-full', 'height:auto': 'h-auto',
  'min-width:0': 'min-w-0', 'border:0': 'border-0', 'margin:0': 'm-0',
  'padding:0': 'p-0', 'text-decoration:none': 'no-underline',
}
for (const file of ['src/pages/disbursement.css', 'src/pages/landing.css', 'src/index.css']) {
  const root = postcss.parse(fs.readFileSync(file, 'utf8'), { from: file })
  let converted = 0
  root.walkDecls(decl => {
    // Keep theme variables, font/keyframe definitions, and physical print rules native.
    let parent = decl.parent
    while (parent) {
      if (parent.type === 'atrule' && ['theme', 'page', 'keyframes', 'font-face', 'property'].includes(parent.name)) return
      parent = parent.parent
    }
    if (decl.prop.startsWith('--') || decl.important) return
    const key = `${decl.prop}:${decl.value}`
    const value = decl.value.replace(/_/g, '\\_').replace(/\s+/g, '_')
    const utility = utilities[key] || `[${decl.prop}:${value}]`
    decl.replaceWith(postcss.atRule({ name: 'apply', params: utility }))
    converted++
  })
  if (file !== 'src/index.css') root.prepend(postcss.atRule({ name: 'reference', params: '"../index.css"' }))
  fs.writeFileSync(file, root.toString())
  console.log(`${file}: migrated ${converted} declarations`)
}
