import { ArrowRight, BarChart3, CheckCircle2, ClipboardCheck, FileText, ShieldCheck, Sparkles, Star, Users, Zap } from 'lucide-react'
import './landing.css'

const logo = `${import.meta.env.BASE_URL}ocdra.png`

function scrollToSection(event) {
  event.preventDefault()
  const target = document.getElementById(event.currentTarget.hash.slice(1))
  target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}

function Brand() {
  return <a className="landing-brand" href="#home" onClick={scrollToSection}><span className="landing-brand-icon"><img src={`${import.meta.env.BASE_URL}ched.png`} alt="CHED logo" /></span><span>OCDRA <span className="landing-brand-light">OFFICE</span><small>WORKSPACE</small></span></a>
}

function WorkspacePreview() {
  return <div className="landing-previews" aria-hidden="true">
    <div className="preview-window report-window">
      <div className="preview-top"><img src={`${import.meta.env.BASE_URL}ched.png`} alt="" /><b>OCDRA <span>Office</span></b><small>WORKSPACE</small></div>
      <div className="preview-body"><div className="preview-caption">CREATE YOUR REPORT</div><div className="preview-steps"><span><FileText size={15} /> Report Details</span><span>Accomplishments</span><span>Signatures</span></div><div className="preview-section">01 &nbsp; Report Builder</div><div className="preview-form"><FileText size={24} /><h3>Make it yours.</h3><p>Add your employee details and choose the reporting period.</p><div className="preview-fields">{[['Name', 'La Victoria, Von Francis A.'], ['Position', 'Project Technical Staff II'], ['Office / Division', 'Office of the Commissioner Apag III'], ['Reporting Period', '10/16/2026 — 10/31/2026']].map(([label, value]) => <div key={label}><label>{label}</label><span>{value}</span></div>)}</div><div className="preview-checkbox">☑ &nbsp; Include weekends in the final report</div></div></div>
    </div>
    <div className="preview-window ipcr-window"><div className="preview-top"><img src={`${import.meta.env.BASE_URL}ched.png`} alt="" /><b>OCDRA <span>Office</span></b><small>IPCR</small></div><div className="preview-body"><div className="preview-banner"><small>↗ PERFORMANCE WORKSPACE</small><h3>Your performance.<br />A clearer perspective.</h3><p>Set targets, track achievements, and grow.</p><span>◎ Preview IPCR</span></div><div className="preview-metrics">{[['Form Completion', '81', '%'], ['Weight Allocation', '100', '/100%'], ['Weighted Rating', '4.33', '/5.00']].map(([label, value, unit]) => <div key={label}><small>{label}</small><strong>{value}<em>{unit}</em></strong><i /><small>Very Satisfactory</small></div>)}</div><div className="preview-bottom"><span>♙ Employee Details</span><span>✓ Outputs & Targets</span><span>♧ Review & Approval</span></div></div></div>
    <div className="preview-window disbursement-window">
      <div className="preview-top"><img src={`${import.meta.env.BASE_URL}ched.png`} alt="" /><b>OCDRA <span>Office</span></b><small>DISBURSEMENT</small></div>
      <div className="preview-body">
        <div className="preview-caption">PREPARE YOUR PAYMENT</div>
        <div className="voucher-preview-heading"><FileText size={19} /><div><h3>Disbursement Voucher</h3><p>Appendix 32 ? Payment documentation</p></div><span>DV</span></div>
        <div className="preview-fields">{[['Payee', 'Employee / Supplier'], ['Payment Method', 'Bank transfer'], ['Particulars', 'Payment details'], ['Amount', '? 12,500.00']].map(([label, value]) => <div key={label}><label>{label}</label><span>{value}</span></div>)}</div>
        <div className="voucher-preview-footer"><span>? Accounting entries</span><span>? Approval details</span><span>PDF preview ?</span></div>
      </div>
    </div>
  </div>
}

export default function LandingPage({ onNavigate }) {
  const open = page => { onNavigate(page); window.scrollTo({ top: 0, behavior: 'instant' }) }
  return <div className="landing" id="home">
    <header className="landing-header"><div className="landing-container landing-header-inner"><Brand /><img src={logo} alt="Office of Commissioner Desiderio R. Apag III" /></div></header>
    <main><section className="landing-hero"><div className="landing-container landing-hero-inner"><div className="landing-hero-copy"><div className="landing-eyebrow"><Sparkles size={17} /> YOUR OFFICE PRODUCTIVITY SUITE</div><h1>Your work.<br />Your progress.<br /><span>Your impact.</span></h1><p>A centralized workspace for accomplishment reports,<br className="desktop-break" /> performance commitments, and disbursement vouchers.</p><div className="landing-actions"><a className="landing-primary" href="#workspaces" onClick={scrollToSection}>Get Started <ArrowRight size={22} /></a></div><div className="landing-benefits">{['Organized workflows', 'Professional documents', 'Built for productivity'].map(text => <span key={text}><CheckCircle2 size={21} />{text}</span>)}</div></div><WorkspacePreview /></div></section>
    <section className="landing-workspaces landing-container" id="workspaces"><div className="landing-section-label"><h2>CHOOSE YOUR WORKSPACE</h2><span>Select a workspace to get started.</span></div><div className="landing-workspace-grid">{[{number: '01', title: <>Accomplishment<br />Report Maker</>, description: 'Create, format, preview, and export accomplishment reports as PDFs.', Icon: FileText, page: 'accomplishment', items: [[FileText, 'Report builder'], [FileText, 'PDF preview'], [ClipboardCheck, 'Export-ready layouts']]}, {number: '02', title: <>IPCR Performance<br />Workspace</>, description: 'Set targets, monitor accomplishments, and review performance ratings.', Icon: BarChart3, page: 'ipcr', items: [[BarChart3, 'Targets and outputs'], [Star, 'Performance ratings'], [ClipboardCheck, 'Review and approval']]}, {number: '03', title: <>Disbursement<br />Voucher</>, description: 'Prepare payment details, accounting entries, and an Appendix 32 disbursement voucher.', Icon: FileText, page: 'disbursement', items: [[FileText, 'Voucher builder'], [FileText, 'PDF preview'], [ClipboardCheck, 'Payment approval']]}].map(({ number, title, description, Icon, page, items }) => <button className={`landing-workspace-card ${page}`} key={page} onClick={() => open(page)}><span className="landing-card-number">{number}</span><div className="landing-card-main"><span className="landing-card-icon"><Icon size={47} strokeWidth={2.6} /></span><div><h3>{title}</h3><p>{description}</p></div><span className="landing-card-arrow"><ArrowRight size={27} /></span></div><div className="landing-card-details">{items.map(([ItemIcon, text]) => <span key={text}><i><ItemIcon size={17} /></i>{text}</span>)}</div></button>)}</div></section>
    <section className="landing-features landing-container" id="features"><div className="landing-section-label"><h2>KEY FEATURES</h2><span>Designed to support your productivity.</span></div><div className="landing-feature-grid">{[[Zap, 'A simpler workflow', 'Keep your reporting tasks organized in one workspace.'], [FileText, 'Professional Documents', 'Create consistent and well-formatted reports.'], [ShieldCheck, 'Performance Tracking', 'Monitor commitments and measure progress.'], [Users, 'Built for the office', 'Designed for the needs of OCDRA III personnel.']].map(([Icon, title, description]) => <div className="landing-feature" key={title}><span><Icon size={31} /></span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></section></main>
    <footer className="landing-footer" id="about"><div className="landing-container landing-footer-inner"><div className="landing-office"><img src={logo} alt="OCDRA" /><span>OFFICE OF COMMISSIONER DESIDERIO R. APAG III</span></div><nav aria-label="Footer navigation"><a href="#home" onClick={scrollToSection}>Home</a><a href="#workspaces" onClick={scrollToSection}>Workspaces</a><a href="#features" onClick={scrollToSection}>Features</a><a href="#about" onClick={scrollToSection}>About</a></nav><p> OCDRA OFFICE SYSTEM &nbsp; v1.0<br />All rights reserved.</p></div></footer>
  </div>
}


