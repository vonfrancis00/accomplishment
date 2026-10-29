import { useState } from 'react'
import { Eye, ArrowLeft, Download, Printer, FileText, UserRound, CalendarDays, ShieldCheck, ArrowRight } from 'lucide-react'
import FormField from '../components/FormField.jsx'
import './disbursement.css'

const accounts = ['Other Professional Services', 'Cash-MDS, Regular', 'Due to BIR', 'Due to PagIBIG', 'Due to Philhealth', 'Other Payables']
export const createDisbursement = () => ({
  payee: 'VON FRANCIS A. LA VICTORIA', tin: '608-887-296', address: '', fund: '', date: '', number: '', obligation: '', mode: '', otherMode: '',
  particulars: 'Payment of services rendered for the period of', period: 'October 16 - October 31, 2026', responsibility: '', pap: '', amount: '',
  supervisor: 'DESIDERIO R. APAG III, PCpE, D.ENG., ASEAN Eng.', supervisorPosition: 'Commissioner',
  accountant: 'MARIA PAZ D. GALANG-BUSTOS', accountantPosition: 'Chief Accountant, AFMS', approver: 'ALMA SY- PATRON, Ph.D.', approverPosition: 'Director IV, AFMS',
  accountantDate: '', approvalDate: '', certifications: [false, false, false],
  check: '', paymentDate: '', bank: '', receivedDate: '', receivedName: '', jev: '', jevDate: '', receipt: '',
  entries: accounts.map(title => ({ title, debit: '', credit: '' })),
})
const money = value => value === '' ? '' : Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const dateText = value => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-PH') : ''

function Voucher({ data }) {
  const text = (key, x, y, w, h = 14, extra = {}) => <span key={key} className="dv-value" style={{ left: `${x / 595 * 100}%`, top: `${y / 842 * 100}%`, width: `${w / 595 * 100}%`, height: `${h / 842 * 100}%`, ...extra }}>{data[key]}</span>
  return <article className="dv-paper" aria-label="Disbursement voucher preview">
    <img src={`${import.meta.env.BASE_URL}disbursement-template.png`} alt="" />
    <span className="dv-template-cleanup" aria-hidden="true" />
    <div className="dv-logo"><img src={`${import.meta.env.BASE_URL}ched.png`} alt="Commission on Higher Education" /></div>
    {text('fund', 455, 68, 82)}{text('number', 445, 124, 94, 9)}
    <span className="dv-value" style={{ left:'75%',top:'13.4%',width:'15%',height:'1.3%' }}>{dateText(data.date)}</span>
    {text('payee', 76, 169, 238, 20, { fontWeight: 700, color: '#00255b', fontSize: '13px' })}
    {text('tin', 318, 176, 90, 14, { fontWeight:700, color:'#00255b' })}{text('obligation', 412, 175, 128)}{text('address', 76, 196, 462)}
    {['MDS Check', 'Commercial Check', 'ADA', 'Others'].map((mode,i) => data.mode === mode && <span key={mode} className="dv-tick" style={{ left: `${[122,228,354,412][i]/595*100}%`, top: '16.45%' }}>&#10003;</span>)}
    {data.mode === 'Others' && text('otherMode', 439, 148, 98, 9, {fontSize:'8px'})}
    {text('particulars', 35, 250, 263, 10)}{text('period', 35, 260, 263, 12, {fontWeight:700,color:'#00255b'})}
    {text('responsibility', 301, 238, 49, 45)}{text('pap', 354, 238, 54, 45)}
    {[253,292].map(y => <span key={y} className="dv-value dv-money" style={{left:'73%',top:`${y/842*100}%`,width:'17%',height:'1.8%'}}>{money(data.amount)}</span>)}
    {text('supervisor', 52, 370, 469, 14, {fontWeight:700,textDecoration:'underline',color:'#00255b',fontSize:'12px'})}{text('supervisorPosition', 52, 384, 469, 12, {fontWeight:700,fontSize:'9px'})}
    {data.entries.map((row,i) => ['debit','credit'].map((key,j) => <span key={`${i}-${key}`} className="dv-value dv-money" style={{left:`${[353,440][j]/595*100}%`,top:`${(429+i*12.834)/842*100}%`,width:`${[85,100][j]/595*100}%`,height:'1.1%'}}>{money(row[key])}</span>))}
    {data.certifications.map((checked,i) => checked && <span key={i} className="dv-tick" style={{left:'8.15%',top:`${(549+i*15.7)/842*100}%`}}>&#10003;</span>)}
    {text('accountant', 88, 644, 193, 13, {fontWeight:700,fontSize:'9px'})}{text('approver', 336, 644, 206, 13, {fontWeight:700,fontSize:'9px'})}
    {text('accountantPosition', 88, 663, 193, 13, {fontWeight:700,fontSize:'9px'})}{text('approverPosition', 336, 663, 206, 13, {fontWeight:700,fontSize:'9px'})}
    <span className="dv-value" style={{left:'15%',top:'82.1%',width:'32%',height:'1.2%'}}>{dateText(data.accountantDate)}</span>
    <span className="dv-value" style={{left:'57%',top:'82.1%',width:'34%',height:'1.2%'}}>{dateText(data.approvalDate)}</span>
    {text('check',88,724,166,17)}{text('bank',319,730,89,13)}{text('receivedName',319,755,89,14)}{text('jev',412,718,128,20)}
    {['paymentDate','receivedDate','jevDate'].map((key,i)=><span key={key} className="dv-value" style={{left:`${[256,256,412][i]/595*100}%`,top:`${[732,757,760][i]/842*100}%`,width:`${[60,60,127][i]/595*100}%`,height:'1.5%'}}>{dateText(data[key])}</span>)}
    {text('receipt',150,779,257,10,{fontSize:'9px'})}
  </article>
}

export default function DisbursementPage({ data, setData }) {
  const [preview,setPreview] = useState(false)
  const [saving,setSaving] = useState(false)
  const [error,setError] = useState('')
  const update = (key,value) => {
    if (!['payee', 'tin', 'period'].includes(key)) return
    setData(current => ({...current,[key]:value}))
  }
  const field = (label,key,type='text') => <FormField key={key} label={label} value={data[key]} type={type} onChange={value=>update(key,value)} />
  const download = async () => {
    setSaving(true); setError('')
    try {
      const [{toPng},{jsPDF}] = await Promise.all([import('html-to-image'),import('jspdf')])
      await document.fonts.ready
      const page = document.querySelector('.dv-paper')
      await Promise.all([...page.querySelectorAll('img')].map(img=>img.decode()))
      const image = await toPng(page,{pixelRatio:3,backgroundColor:'#fff',style:{margin:'0',boxShadow:'none'}})
      const pdf = new jsPDF({unit:'mm',format:'a4',compress:true})
      pdf.setProperties({title:'Disbursement Voucher',author:data.payee})
      pdf.addImage(image,'PNG',0,0,210,297)
      await pdf.save(`Disbursement_Voucher_${(data.number || data.payee || 'Draft').replace(/[^a-z0-9_-]/gi,'_')}.pdf`,{returnPromise:true})
    } catch {setError('The voucher could not be saved. Please try again.')} finally {setSaving(false)}
  }
  return <main className="workspace dv-workspace">
    <div className={`dv-toolbar print:hidden ${preview ? '' : 'dv-hero'}`}><div><span className="eyebrow"><FileText size={14}/> DISBURSEMENT WORKSPACE <span className="dv-draft">DRAFT</span></span><h1>{preview ? 'Disbursement Voucher' : <>Your payment details.<br/>Ready for review.</>}</h1><p>{preview ? 'Review your voucher before printing or downloading.' : 'Prepare your payee details and service period in a consistent, office-ready voucher.'}</p></div><div className="export-actions">
      <button className={`button ${preview ? 'secondary' : 'primary'}`} disabled={saving} onClick={()=>setPreview(!preview)}>{preview ? <ArrowLeft size={16}/> : <Eye size={16}/>} {preview?'Edit details':'Preview voucher'}</button>
      {preview && <><button className="button secondary" disabled={saving} onClick={()=>window.print()}><Printer size={16}/> Print</button><button className="button primary" disabled={saving} onClick={download}><Download size={16}/>{saving?'Saving PDF...':'Download PDF'}</button></>}
    </div></div>
    {error && <p role="alert" className="print:hidden text-red-700">{error}</p>}
    {!preview && <div className="dv-builder print:hidden">
      <div className="dv-editor">
        <div className="section-kicker"><h2><span>01</span> Voucher Details</h2><span>VOUCHER BUILDER</span></div>
        <section>
          <div className="dv-section-heading"><span className="dv-section-icon"><UserRound size={20}/></span><div><span className="dv-kicker">01 / PAYEE INFORMATION</span><h2>Make it yours.</h2><p>Enter the name and identification number that will appear on your voucher.</p></div></div>
          <div className="dv-grid">{field('Payee','payee')}{field('TIN/Employee No.','tin')}</div>
        </section>
        <section>
          <div className="dv-section-heading"><span className="dv-section-icon"><CalendarDays size={20}/></span><div><span className="dv-kicker">02 / SERVICE PERIOD</span><h2>Set the payment period.</h2><p>Add the dates covered by your services.</p></div></div>
          <div className="dv-particulars"><span>PARTICULARS</span><p>Payment of services rendered for the period of</p>{field('Service period (date only)','period')}</div>
        </section>
        <div className="action-bar"><span className="dv-action-hint"><ShieldCheck size={16}/> Ready for your final review</span><button className="button primary" onClick={()=>{setPreview(true);window.scrollTo({top:0,behavior:'instant'})}}>Preview voucher <ArrowRight size={16}/></button></div>
        <p className="session-note">Changes are kept while switching workspaces. Download your voucher before closing.</p>
      </div>
      <aside className="report-sidebar dv-sidebar">
        <div className="summary-card"><div className="summary-heading"><span className="summary-icon"><FileText size={20}/></span><span className="draft-badge">In progress</span></div><h3>Your voucher at a glance</h3><p>The details behind your next payment.</p><div className="summary-person"><span>PREPARED FOR</span><strong>{data.payee || 'Payee name'}</strong><p>{data.tin || 'TIN / Employee number'}</p></div><div className="summary-period"><CalendarDays size={17}/><div><span>Service period</span><strong>{data.period || 'Enter your service period'}</strong></div></div><div className="summary-footer"><ShieldCheck size={14}/> Appendix 32 · Disbursement Voucher</div></div>
        <div className="tip-card"><span className="eyebrow">BEFORE YOU EXPORT</span><h3>Check the essentials.</h3><p>Verify the payee name, identification number, and service dates before downloading your voucher.</p></div>
      </aside>
    </div>}
    {preview && <div className="dv-preview"><Voucher data={{...createDisbursement(), payee: data.payee, tin: data.tin, period: data.period}}/></div>}
    <footer className="workspace-footer print:hidden"><span>DISBURSEMENT <b>/</b> VOUCHER STUDIO</span><span>Thoughtful records. Meaningful progress.</span></footer>
  </main>
}

