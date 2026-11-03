const fs=require('node:fs')
for(const file of ['src/pages/LandingPage.jsx','src/pages/DisbursementPage.jsx']) {
 let jsx=fs.readFileSync(file,'utf8')
 jsx=jsx.replace(/\[@media\(screen\)\]/g,'[@media_screen]')
 jsx=jsx.replace(/\[@media\(screen_and_\(hover:_hover\)_and_\(prefers-reduced-motion:_no-preference\)\)\]/g,'[@media_screen_and_(hover:hover)_and_(prefers-reduced-motion:no-preference)]')
 jsx=jsx.replace(/\[@media\(screen_and_\(prefers-reduced-motion:_no-preference\)\)\]/g,'[@media_screen_and_(prefers-reduced-motion:no-preference)]')
 fs.writeFileSync(file,jsx)
}
