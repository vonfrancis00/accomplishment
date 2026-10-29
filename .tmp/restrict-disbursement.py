from pathlib import Path
p=Path('src/pages/DisbursementPage.jsx')
s=p.read_text(encoding='utf-8')
s=s.replace("  const update = (key,value) => setData(current => ({...current,[key]:value}))", "  const update = (key,value) => {\n    if (!['payee', 'tin', 'period'].includes(key)) return\n    setData(current => ({...current,[key]:value}))\n  }")
start=s.index('      <section><h2>Voucher & payee details')
end=s.index('      <p>Details are kept',start)
s=s[:start]+'''      <section><h2>Payee details</h2><div className="dv-grid">{field('Payee','payee')}{field('TIN/Employee No.','tin')}</div></section>
      <section><h2>Particulars</h2><p className="mb-4">Payment of services rendered for the period of</p><div className="dv-grid">{field('Service period (date only)','period')}</div></section>
'''+s[end:]
s=s.replace('<Voucher data={data}/>','<Voucher data={{...createDisbursement(), payee: data.payee, tin: data.tin, period: data.period}}/>')
p.write_text(s,encoding='utf-8')
