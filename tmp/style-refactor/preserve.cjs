const fs = require('node:fs')
for (const file of ['src/pages/disbursement.css','src/pages/landing.css','src/index.css']) {
 let css = fs.readFileSync(file,'utf8')
 css = css.replace(/font-\[(\d+)\]/g,'[font-weight:$1]')
 css = css.replace(/shadow-\[([^\]]+)\]/g,'[box-shadow:$1]')
 css = css.replace(/\bbg-white\b/g,'[background:white]').replace(/\bbg-transparent\b/g,'[background:transparent]')
 css = css.replace(/(?<![\w-])border-0\b/g,'[border:0]')
 fs.writeFileSync(file,css)
}
