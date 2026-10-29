from pathlib import Path
p=Path('src/pages/DisbursementPage.jsx')
s=p.read_text(encoding='utf-8')
s=s.replace("  const date = (key, x, y, w) => text(key, x, y, w, 12, { fontSize: '9px' })\n",'')
s=s.replace('[258,300]','[253,292]')
s=s.replace("{fontWeight:700,textDecoration:'underline',color:'#00255b'}","{fontWeight:700,textDecoration:'underline',color:'#00255b',fontSize:'12px'}")
import re
s=re.sub(r"saving\?'Saving PDF[^']*'", "saving?'Saving PDF...'",s)
p.write_text(s,encoding='utf-8')
