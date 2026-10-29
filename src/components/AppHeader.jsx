import { Layers, FileText } from 'lucide-react'

export default function AppHeader({ activePage, onNavigate }) {
  return (
    <header className="app-header print:hidden">
      <div className="header-inner">
        <a href="#home" onClick={event => { event.preventDefault(); onNavigate('home') }} className="brand" aria-label="Accomplishment Studio home">
          <span className="brand-icon">
            <Layers size={23} />
          </span>
          <span>
            Accomplishment<span className="brand-light">Studio</span>
            <small>ACCOMPLISHMENT WORKSPACE</small>
          </span>
        </a>
        <div className="header-divider" />
        <nav className="document-nav" aria-label="Document type">
          <button aria-current={activePage === 'accomplishment' ? 'page' : undefined} onClick={() => onNavigate('accomplishment')}><FileText size={15} /> Accomplishment</button>
          <button aria-current={activePage === 'ipcr' ? 'page' : undefined} onClick={() => onNavigate('ipcr')}>IPCR</button>
        <button aria-current={activePage === 'disbursement' ? 'page' : undefined} onClick={() => onNavigate('disbursement')}>Disbursement</button>
        </nav>
        <div className="header-right">
          <img
            className="office-logo"
            src={`${import.meta.env.BASE_URL}ocdra.png`}
            alt="Office of Commissioner Desiderio R. Apag III"
            width={2170}
            height={725}
          />
        </div>
      </div>
    </header>
  )
}
