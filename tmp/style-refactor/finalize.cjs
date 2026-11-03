const fs=require('node:fs')
for(const file of ['src/index.css','src/pages/landing.css','src/pages/disbursement.css']) {
 let css=fs.readFileSync(file,'utf8').replace(/font-\[bold\]/g,'font-bold').replace(/font-\[normal\]/g,'font-normal').replace(/\[background:white\]\/60/g,'bg-white/60')
 // Keep the bottom border after the border shorthand; utility sorting would reset it.
 css=css.replace(/ \[border-bottom:4px_solid_#2e8aff\]/g,'').replace(/(\.landing-workspace-card\s*\{\s*@apply[^;]+;)/, '$1\n  border-bottom: 4px solid #2e8aff;')
 fs.writeFileSync(file,css)
}
