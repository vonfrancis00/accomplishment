import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  CalendarDays,
  ListChecks,
  PenLine,
  Download,
  LoaderCircle,
  Printer,
  ShieldCheck,
} from 'lucide-react'
import AppHeader from './components/AppHeader.jsx'
import LandingPage from './pages/LandingPage.jsx'
import IpcrPage from './pages/IpcrPage.jsx'
import DisbursementPage, { createDisbursement } from './pages/DisbursementPage.jsx'
import { createIpcr } from './utils/ipcrUtils.js'
import ReportFormPage from './pages/ReportFormPage.jsx'
import ReportPreviewPage from './pages/ReportPreviewPage.jsx'
import { createSampleEntries, entriesForPeriod, getReportingPeriod } from './utils/reportUtils.js'
import { exportReportPdf } from './utils/exportPdf.js'
import { accomplishmentText } from './utils/accomplishmentText.js'

const initialProfile = {
  name: 'La Victoria, Von Francis A.',
  position: 'Project Technical Staff II',
  office: 'Office of the Commissioner Apag III',
  ...getReportingPeriod(),
  institution: 'COMMISSION ON HIGHER EDUCATION',
  headerLine1: 'Republic of the Philippines',
  headerLine2: 'OFFICE OF THE PRESIDENT',
  preparedBy: 'VON FRANCIS A. LA VICTORIA',
  preparedPosition: 'Project Technical Staff II',
  approvedBy: 'DESIDERIO R. APAG III, PCpE, D.Eng., ASEAN Eng.',
  approvedPosition: 'Commissioner',
}

export default function App() {
  const [documentType, setDocumentType] = useState('home')
  const [ipcr, setIpcr] = useState(createIpcr)
  const [disbursement, setDisbursement] = useState(createDisbursement)
  const [profile, setProfile] = useState(initialProfile)
  const [entries, setEntries] = useState(() =>
    entriesForPeriod(
      initialProfile.periodStart,
      initialProfile.periodEnd,
      createSampleEntries(),
    ),
  )
  const [step, setStep] = useState(0)
  const [savingPdf, setSavingPdf] = useState(false)
  const [pdfError, setPdfError] = useState('')
  const savePdf = async () => {
    if (savingPdf) return
    setSavingPdf(true)
    setPdfError('')
    try {
      await exportReportPdf(profile)
    } catch {
      setPdfError('The PDF could not be saved. Please try again.')
    } finally {
      setSavingPdf(false)
    }
  }
  const activePage = step === 3 ? 'preview' : 'form'
  const steps = [
    'Report Details',
    'Accomplishments',
    'Signatures',
    'Review & Export',
  ]
  const goToStep = next => {
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
    requestAnimationFrame(() =>
      document.getElementById('step-heading')?.focus(),
    )
  }
  const [includeWeekendRows, setIncludeWeekendRows] = useState(true)

  const sortedEntries = useMemo(
    () =>
      entries
        .filter(
          entry =>
            profile.periodStart &&
            profile.periodEnd &&
            entry.date >= profile.periodStart &&
            entry.date <= profile.periodEnd,
        )
        .sort((a, b) => a.date.localeCompare(b.date)),
    [entries, profile.periodStart, profile.periodEnd],
  )

  const updateProfile = (key, value) => {
    setProfile(current => ({ ...current, [key]: value }))
    if (key === 'periodStart' || key === 'periodEnd') {
      const start = key === 'periodStart' ? value : profile.periodStart
      const end = key === 'periodEnd' ? value : profile.periodEnd
      // Keep entries outside the period in memory so switching back restores edits.
      setEntries(current => {
        const dates = new Set(current.map(entry => entry.date))
        const added = entriesForPeriod(start, end, current).filter(
          entry => !dates.has(entry.date),
        )
        return [...current, ...added]
      })
    }
  }

  const updateEntry = (id, key, value) =>
    setEntries(current =>
      current.map(entry =>
        entry.id === id ? { ...entry, [key]: value } : entry,
      ),
    )

  const updateItem = (id, index, value) =>
    setEntries(current =>
      current.map(entry =>
        entry.id === id
          ? {
              ...entry,
              items: entry.items.map((item, itemIndex) =>
                itemIndex === index ? value : item,
              ),
            }
          : entry,
      ),
    )

  const addItem = id =>
    setEntries(current =>
      current.map(entry =>
        entry.id === id ? { ...entry, items: [...entry.items, ''] } : entry,
      ),
    )

  const removeItem = (id, index) =>
    setEntries(current =>
      current.map(entry =>
        entry.id === id
          ? { ...entry, items: entry.items.filter((_, itemIndex) => itemIndex !== index) }
          : entry,
      ),
    )

  const visibleEntries = sortedEntries.filter(
    entry => includeWeekendRows || entry.kind !== 'weekend',
  )

  const stepIcons = [FileText, ListChecks, PenLine, ShieldCheck]
  const descriptions = [
    'Set up your report',
    'Capture your daily work',
    'Confirm your signatories',
    'Make it official',
  ]
  const outputCount = visibleEntries.reduce(
    (total, entry) =>
      total +
      (entry.kind === 'work'
        ? entry.items.filter(item => accomplishmentText(item).trim()).length
        : 0),
    0,
  )
  const formatDate = value =>
    value
      ? new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Not selected'

  return (
    <div className="app-shell">
      {documentType === 'home' ? <LandingPage onNavigate={setDocumentType} /> : <AppHeader activePage={documentType} onNavigate={setDocumentType} />}
      {documentType === 'ipcr' && <IpcrPage data={ipcr} setData={setIpcr} />}
      {documentType === 'disbursement' && <DisbursementPage data={disbursement} setData={setDisbursement} />}
      <main className="workspace" hidden={documentType !== 'accomplishment'}>
        <nav aria-label="Report progress" className="stepper print:hidden">
          <div className="progress-caption">
            <span>CREATE YOUR REPORT</span>
            <span>
              Step {step + 1} <span className="muted">of 4</span>
            </span>
          </div>
          <ol>
            {steps.map((label, index) => {
              const Icon = stepIcons[index]
              return (
                <li
                  key={label}
                  className={
                    index === step ? 'active' : index < step ? 'complete' : ''
                  }
                >
                  <button
                    disabled={savingPdf}
                    onClick={() => goToStep(index)}
                    aria-current={step === index ? 'step' : undefined}
                  >
                    <span className="step-icon">
                      {index < step ? <Check size={19} /> : <Icon size={19} />}
                    </span>
                    <span className="step-label">
                      <strong>{label}</strong>
                      <small>{descriptions[index]}</small>
                    </span>
                    <span className="step-number">0{index + 1}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Report steps"
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuenow={step + 1}
            aria-valuetext={`Step ${step + 1}: ${steps[step]}`}
          >
            <div style={{ width: `${(step + 1) * 25}%` }} />
          </div>
        </nav>
        <div className={`workspace-grid ${step === 3 ? 'review-layout' : ''}`}>
          <div className="workspace-content">
            <div className="section-kicker print:hidden">
              <h2 id="step-heading" tabIndex={-1}>
                <span>0{step + 1}</span> {steps[step]}
              </h2>
              <span>{step === 3 ? 'FINAL REVIEW' : 'REPORT BUILDER'}</span>
            </div>
            <div
              key={step}
              className={`form-surface print:hidden ${activePage === 'form' ? 'block' : 'hidden'}`}
            >
              <ReportFormPage
                profile={profile}
                updateProfile={updateProfile}
                entries={sortedEntries}
                updateEntry={updateEntry}
                updateItem={updateItem}
                addItem={addItem}
                removeItem={removeItem}
                includeWeekendRows={includeWeekendRows}
                setIncludeWeekendRows={setIncludeWeekendRows}
                step={step}
              />
            </div>
            <div
              className={`${activePage === 'preview' ? 'block' : 'hidden'} print:block`}
            >
              <ReportPreviewPage profile={profile} entries={visibleEntries} />
            </div>
            <div className={`action-bar print:hidden ${step === 1 ? 'accomplishments-action-bar' : ''}`}>
              <button
                className="button secondary"
                disabled={step === 0 || savingPdf}
                onClick={() => goToStep(step - 1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <span className="step-hint">Step {step + 1} of 4</span>
              {step === 3 ? (
                <div className="export-actions">
                  <button
                    className="button secondary"
                    disabled={savingPdf}
                    onClick={() => window.print()}
                  >
                    <Printer size={16} /> Print
                  </button>
                  <button
                    className="button primary"
                    disabled={savingPdf}
                    aria-busy={savingPdf}
                    onClick={savePdf}
                  >
                    {savingPdf ? (
                      <LoaderCircle size={16} className="saving-spinner" />
                    ) : (
                      <Download size={16} />
                    )}
                    {savingPdf ? 'Saving PDF…' : 'Download PDF'}
                  </button>
                </div>
              ) : (
                <button
                  className="button primary"
                  onClick={() => goToStep(step + 1)}
                >
                  {step === 2 ? 'Review Report' : 'Continue'}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
            <p className="session-note print:hidden" role="status">
              {savingPdf
                ? 'Preparing your document…'
                : 'Changes are kept while you move between steps. Download your report before closing.'}
            </p>
            {pdfError && (
              <p
                role="alert"
                className="print:hidden mt-3 text-sm text-rose-700"
              >
                {pdfError}
              </p>
            )}
          </div>
          {step !== 3 && (
            <aside className="report-sidebar print:hidden">
              <div className="summary-card">
                <div className="summary-heading">
                  <span className="summary-icon">
                    <FileText size={20} />
                  </span>
                  <span className="draft-badge">In progress</span>
                </div>
                <h3>Your report at a glance</h3>
                <p>The details behind your next report.</p>
                <div className="summary-person">
                  <span>PREPARED FOR</span>
                  <strong>{profile.name || 'Your name'}</strong>
                  <p>{profile.position || 'Your position'}</p>
                  <p>{profile.office || 'Your office'}</p>
                </div>
                <div className="summary-period">
                  <CalendarDays size={17} />
                  <div>
                    <span>Reporting period</span>
                    <strong>
                      {formatDate(profile.periodStart)}
                      <br /> - {formatDate(profile.periodEnd)}
                    </strong>
                  </div>
                </div>
                <div className="summary-stats">
                  <div>
                    <strong>
                      {visibleEntries.length.toString().padStart(2, '0')}
                    </strong>
                    <span>Daily entries</span>
                  </div>
                  <div>
                    <strong>{outputCount.toString().padStart(2, '0')}</strong>
                    <span>Accomplishments</span>
                  </div>
                </div>
                <div className="summary-footer">
                  <ShieldCheck size={14} /> Formatted for a professional finish
                </div>
              </div>
              <div className="tip-card">
                <span className="eyebrow">A SMALL TIP</span>
                <h3>
                  {
                    [
                      'Start with the essentials.',
                      'Let your impact show.',
                      'Give credit, get approval.',
                    ][step]
                  }
                </h3>
                <p>
                  {
                    [
                      'Check your name and reporting period. These details will appear on your final document.',
                      'Use clear action verbs and include specific outputs or results for each workday.',
                      'Verify names and titles exactly as they should appear on the signed report.',
                    ][step]
                  }
                </p>
              </div>
            </aside>
          )}
        </div>
        <footer className="workspace-footer print:hidden">
          <span>
            ACCOMPLISHMENT <b>/</b> REPORT STUDIO
          </span>
          <span>Thoughtful records. Meaningful progress.</span>
        </footer>
      </main>
    </div>
  )
}
