const fs=require('node:fs')
const postcss=require('postcss')
const file='src/pages/LandingPage.jsx'
let jsx=fs.readFileSync(file,'utf8')
const ipcr='[&:where(.ipcr)_.landing-card-number]:[color:#00a5bd] [&:where(.ipcr)_.landing-card-icon]:[background:#66e9f43b] [&:where(.ipcr)_.landing-card-icon]:[color:#009fb8] [&:where(.ipcr)_.landing-card-arrow]:[color:#009fb8] [&:where(.ipcr)_.landing-card-arrow]:[background:#8deef76b] [&:where(.ipcr)_.landing-card-details_i]:[background:#b1f1f899] [&:where(.ipcr)_.landing-card-details_i]:[color:#00a2bb]'
jsx=jsx.replace('className={`landing-workspace-card ', 'className={`landing-workspace-card '+ipcr+' ')
fs.writeFileSync(file,jsx)
const root=postcss.parse(fs.readFileSync('src/index.css','utf8'))
const layer=postcss.atRule({name:'layer',params:'components'})
for(const node of [...root.nodes]) {
 if(node.type==='rule'||node.type==='comment'||(node.type==='atrule'&&['media','supports'].includes(node.name))) {
  node.remove(); layer.append(node)
 }
}
root.append(layer)
fs.writeFileSync('src/index.css',root.toString())
