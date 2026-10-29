from pathlib import Path
p=Path('src/pages/DisbursementPage.jsx')
s=p.read_text(encoding='utf-8')
needle='    <img src={`${import.meta.env.BASE_URL}disbursement-template.png`} alt="" />'
s=s.replace(needle,needle+'''
    <div className="dv-logo"><img src={`${import.meta.env.BASE_URL}ched.png`} alt="Commission on Higher Education" /></div>''')
p.write_text(s,encoding='utf-8')
p=Path('src/pages/disbursement.css')
s=p.read_text(encoding='utf-8')
s+='\n.dv-logo{position:absolute;left:6.797398%;top:7.937517%;width:7.964149%;height:4.279529%;background:white}.dv-logo img{display:block;width:100%;height:100%;object-fit:fill}\n'
p.write_text(s,encoding='utf-8')
