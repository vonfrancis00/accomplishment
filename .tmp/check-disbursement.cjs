const { chromium } = require('C:/Users/Localuser/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
const browser=await chromium.launch({headless:true,channel:"chrome"});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.goto('http://localhost:5173');
await page.getByRole('button').filter({hasText:'Disbursement'}).click();
await page.getByLabel('Amount due (PHP)',{exact:true}).fill('12345.67');
await page.getByRole('button',{name:'Preview voucher',exact:true}).first().click();
await page.locator('.dv-paper img').evaluate(img=>img.decode());
await page.locator('.dv-paper').screenshot({path:'.tmp/dv-preview.png'});
const downloadPromise=page.waitForEvent('download');
await page.getByRole('button',{name:'Download PDF',exact:true}).click();
const download=await downloadPromise; await download.saveAs('.tmp/dv-test.pdf');
await page.emulateMedia({media:'print'}); await page.pdf({path:'.tmp/dv-print.pdf',preferCSSPageSize:true});
console.log('Preview and PDF download passed',download.suggestedFilename());
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

