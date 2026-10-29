from pathlib import Path
p=Path('src/pages/DisbursementPage.jsx');s=p.read_text(encoding='utf-8')
s=s.replace('Eye, ArrowLeft, Download, Printer','Eye, ArrowLeft, Download, Printer, FileText, UserRound, CalendarDays, ShieldCheck, ArrowRight')
s=s.replace('className="dv-toolbar print:hidden"','className={`dv-toolbar print:hidden ${preview ? \'\' : \'dv-hero\'}`}')
s=s.replace('<span className="eyebrow">DISBURSEMENT WORKSPACE</span><h1>Disbursement Voucher</h1><p>Prepare payment details and preview the Appendix 32 voucher.</p>', '<span className="eyebrow"><FileText size={14}/> DISBURSEMENT WORKSPACE <span className="dv-draft">DRAFT</span></span><h1>{preview ? \'Disbursement Voucher\' : <>Your payment details.<br/>Ready for review.</>}</h1><p>{preview ? \'Review your voucher before printing or downloading.\' : \'Prepare your payee details and service period in a consistent, office-ready voucher.\'}</p>')
s=s.replace('className="button secondary" disabled={saving} onClick={()=>setPreview(!preview)}','className={`button ${preview ? \'secondary\' : \'primary\'}`} disabled={saving} onClick={()=>setPreview(!preview)}')
a=s.index('    <div className="dv-editor print:hidden" hidden={preview}>');b=s.index('    {preview && <div className="dv-preview">',a)
s=s[:a]+'''    {!preview && <div className="dv-builder print:hidden">
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
'''+s[b:]
s=s.replace('    {preview && <div className="dv-preview">','    {preview && <div className="dv-preview">')
s=s.replace('  </main>','    <footer className="workspace-footer print:hidden"><span>DISBURSEMENT <b>/</b> VOUCHER STUDIO</span><span>Thoughtful records. Meaningful progress.</span></footer>\n  </main>')
p.write_text(s,encoding='utf-8')
p=Path('src/pages/disbursement.css');s=p.read_text(encoding='utf-8');s+='''
/* Match the shared workspace editor while keeping voucher geometry isolated. */
.dv-toolbar.dv-hero{position:relative;overflow:hidden;border:1px solid #334155;border-radius:24px;padding:36px 40px;background:radial-gradient(ellipse at 85% 20%,#0891b238,transparent 55%),linear-gradient(120deg,#0b1d35,#101a35);box-shadow:0 12px 25px #0f172a12}
.dv-hero .eyebrow{display:flex;align-items:center;gap:8px;color:#67e8f9;font-size:10px;letter-spacing:1.8px}.dv-draft{border:1px solid #67e8f940;border-radius:20px;padding:4px 8px;font-size:9px;color:#67e8f9;background:#67e8f91a}
.dv-hero h1{font-size:36px;line-height:1.2;letter-spacing:-1px;color:white;font-weight:650;margin:16px 0}.dv-hero p{max-width:550px;color:#cbd5e1;font-size:14px;line-height:1.7}.dv-hero .button.primary{background:#67e8f9;border-color:#67e8f9;color:#0f172a}.dv-builder{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:28px;align-items:start}.dv-editor{gap:22px;min-width:0}.dv-editor .section-kicker{margin:0}.dv-editor .section-kicker h2{margin:0;font-size:14px}.dv-editor section{padding:28px 32px;border-color:#dfe5ec;box-shadow:0 3px 12px #122a4a03}.dv-section-heading{display:flex;gap:14px;align-items:flex-start;margin-bottom:25px}.dv-section-icon{display:grid;place-items:center;flex-shrink:0;width:44px;height:44px;background:#eaf2fb;color:#243f60;border-radius:12px}.dv-kicker{font-size:9px;letter-spacing:1.5px;font-weight:700;color:#0e7490}.dv-editor .dv-section-heading h2{font-size:20px;letter-spacing:-.4px;margin:5px 0 6px}.dv-section-heading p{font-size:12px;line-height:1.7;margin:0}.dv-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px}.dv-particulars{padding:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px}.dv-particulars>span{font-size:9px;letter-spacing:1.4px;font-weight:700;color:#64748b}.dv-particulars>p{margin:8px 0 18px;color:#334155;font-size:13px}.dv-particulars input{background:white}.dv-action-hint{display:flex;align-items:center;gap:8px;font-size:12px;color:#64748b}.dv-editor .session-note{font-size:11px;text-align:center;margin-top:-9px}.dv-sidebar{padding-top:43px}.dv-sidebar .summary-person strong,.dv-sidebar .summary-period strong{overflow-wrap:anywhere}.dv-toolbar:not(.dv-hero) .dv-draft{display:none}.dv-toolbar:not(.dv-hero) .eyebrow{display:flex;align-items:center;gap:8px}
@media(max-width:1000px){.dv-builder{grid-template-columns:minmax(0,1fr)}.dv-sidebar{display:none}.dv-toolbar.dv-hero{padding:30px}.dv-hero h1{font-size:30px}}@media(max-width:550px){.dv-toolbar.dv-hero{padding:24px}.dv-editor section{padding:22px 18px}.dv-grid{grid-template-columns:1fr}.dv-section-heading{gap:10px}.dv-action-hint{display:none}.dv-editor .action-bar{align-items:stretch}.dv-hero h1{font-size:28px}.dv-particulars{padding:16px}}
''';p.write_text(s,encoding='utf-8')
