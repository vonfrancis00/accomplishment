import { useState } from 'react'
import { Plus, Trash2, Eye, ArrowLeft, Download, Printer, ArrowRight, Check, UserRound, Target, ShieldCheck, Sparkles, Activity } from 'lucide-react'
import FormField from '../components/FormField.jsx'
import IpcrDocument from '../components/IpcrDocument.jsx'
import {
  dimensions,
  newOutput,
  totalWeight,
  finalRating,
  adjectivalRating,
} from '../utils/ipcrUtils.js'
import { exportIpcrPdf } from '../utils/exportIpcrPdf.js'

export default function IpcrPage({ data, setData }) {
  const [step, setStep] = useState(0)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const update = (key, value) =>
    setData(current => ({ ...current, [key]: value }))

  const updateRow = (id, key, value, index) =>
    setData(current => ({
      ...current,
      outputs: current.outputs.map(row =>
        row.id !== id
          ? row
          : {
              ...row,
              [key]:
                index === undefined
                  ? value
                  : row[key].map((item, i) => (i === index ? value : item)),
            },
      ),
    }))

  const field = (label, key, type = 'text') => (
    <FormField
      key={key}
      label={label}
      value={data[key]}
      type={type}
      onChange={value => update(key, value)}
    />
  )

  const download = async () => {
    setSaving(true)
    setError('')
    try {
      await exportIpcrPdf(data)
    } catch {
      setError('The IPCR PDF could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const rating = finalRating(data)
  const filled = value => String(value ?? '').trim() !== ''
  const employeeFields = ['name', 'period', 'agency', 'office', 'employeeDate', 'category']
  const approvalFields = ['reviewer', 'reviewerPosition', 'approver', 'approverPosition', 'reviewedDate', 'approvedDate', 'discussedDate', 'assessedDate', 'finalApprovedDate']
  const weight = totalWeight(data)
  const weightReady = Math.abs(weight - 100) <= 0.001
  const groups = [
    employeeFields.map(key => filled(data[key])),
    [...data.outputs.flatMap(row => [filled(row.output), filled(row.weight), ...row.targets.map(filled)]), weightReady],
    approvalFields.map(key => filled(data[key])),
  ]
  const completion = Math.round(groups.flat().filter(Boolean).length / groups.flat().length * 100)
  const steps = [
    { title: 'Employee Details', description: 'Profile & Reporting Period', icon: UserRound },
    { title: 'Outputs & Targets', description: 'Measures & Accomplishments', icon: Target },
    { title: 'Review & Approval', description: 'Signatories & Assessment', icon: ShieldCheck },
  ]
  const goToStep = next => {
    setStep(next)
    document.getElementById('ipcr-stepper')?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }

  return (
    <main className="workspace ipcr-workspace">
      <div className={`ipcr-toolbar print:hidden ${preview ? '' : 'ipcr-hero'}`}>
        <div>
          <span className="eyebrow"><Sparkles size={14} /> PERFORMANCE WORKSPACE <span className="ipcr-draft">DRAFT</span></span>
          <h1>Your performance.<br className="hidden sm:block" /> A clearer perspective.</h1>
          <p>
            Individual Performance Commitment and Review (IPCR). Set targets, track results, and make every contribution count.
          </p>
        </div>
        <div className="export-actions">
          {preview ? (
            <>
              <button
                className="button secondary"
                disabled={saving}
                onClick={() => setPreview(false)}
              >
                <ArrowLeft size={16} /> Edit Inputs
              </button>
              <button
                className="button secondary"
                disabled={saving}
                onClick={() => window.print()}
              >
                <Printer size={16} /> Print
              </button>
              <button
                className="button primary"
                disabled={saving}
                onClick={download}
              >
                <Download size={16} />
                {saving ? 'Saving PDF...' : 'Download PDF'}
              </button>
            </>
          ) : (
            <button
              className="button primary"
              onClick={() => setPreview(true)}
            >
              <Eye size={16} /> Preview IPCR
            </button>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="ipcr-error print:hidden">
          {error}
        </p>
      )}

      {!preview ? (
        <div className="ipcr-editor form-surface print:hidden">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="ipcr-stat"><span><Activity size={16} /> Form Completion</span><strong>{completion}<small>%</small></strong><progress aria-label="Form completion" max="100" value={completion} /><p>Profile, targets, and approval fields</p></div>
            <div className="ipcr-stat"><span><Target size={16} /> Weight Allocation</span><strong>{Number(weight.toFixed(2))}<small> / 100%</small></strong><progress aria-label="Weight allocation" max="100" value={Math.min(weight, 100)} /><p className={weightReady ? 'text-teal-700' : 'text-amber-700'}>{weightReady ? 'Balanced across all outputs' : weight > 100 ? 'Overallocated. Reduce output weights.' : 'Allocate the remaining output weights'}</p></div>
            <div className="ipcr-stat"><span><ShieldCheck size={16} /> Weighted Rating</span><strong>{rating === null ? '?' : rating.toFixed(2)}<small> / 5.00</small></strong><p>{rating === null ? 'Complete weights and ratings to calculate' : adjectivalRating(rating)}</p><p>{data.outputs.length} {data.outputs.length === 1 ? 'output' : 'outputs'}. Quality, efficiency, and timeliness</p></div>
          </div>
          <nav id="ipcr-stepper" aria-label="IPCR form steps" className="ipcr-stepper">
            {steps.map(({ title, description, icon: Icon }, index) => {
              const complete = groups[index].every(Boolean)
              return <button key={title} type="button" aria-current={step === index ? 'step' : undefined} aria-controls={`ipcr-step-${index}`} onClick={() => setStep(index)} className={`ipcr-step ${step === index ? 'is-active' : ''}`}>
                <span className="ipcr-step-icon">{complete ? <Check size={19} /> : <Icon size={19} />}</span>
                <span className="min-w-0"><small>STEP 0{index + 1}{complete ? '' : ''}</small><b>{title}</b><span className="hidden lg:block">{description}</span></span>
                <ArrowRight size={16} className="ml-auto hidden shrink-0 xl:block" />
              </button>
            })}
          </nav>
          <section id="ipcr-step-0" hidden={step !== 0}>
            <span className="ipcr-section-kicker">01 / THE FOUNDATION</span>
            <h2>Employee & Reporting Period</h2>
            <p>These details appear in the commitment statement.</p>
            <div className="ipcr-field-grid">
              {field('Employee Name', 'name')}
              {field('Reporting Period', 'period')}
              {field('Agency', 'agency')}
              {field('Office / Division', 'office')}
              {field('Employee Signing Date', 'employeeDate', 'date')}
              {field('Output Category', 'category')}
            </div>
          </section>

          <section id="ipcr-step-1" hidden={step !== 1}>
            <span className="ipcr-section-kicker">02 / YOUR CONTRIBUTIONS</span>
            <h2>Outputs & Success Indicators</h2>
            <p>
              Weights should total 100%. Leave ratings blank when preparing
              targets only.
            </p>
            <div className="ipcr-weight-status" role="status">
              Total weight: <b>{totalWeight(data)}%</b>
              {Math.abs(totalWeight(data) - 100) > 0.001 && (
                <span>
                  Adjust output weights to total 100% before calculating the
                  final rating.
                </span>
              )}
            </div>

            {data.outputs.map((row, index) => (
              <div className="ipcr-entry" key={row.id}>
                <div className="ipcr-entry-heading">
                  <h3>
                    <span className="ipcr-output-number">{String(index + 1).padStart(2, '0')}</span>
                    <input
                      className="ipcr-output-title"
                      aria-label={`Output ${index + 1} title`}
                      placeholder="Untitled output"
                      maxLength={100}
                      value={row.output}
                      onChange={event => updateRow(row.id, 'output', event.target.value)}
                    />
                  </h3>
                  <button
                    className="button secondary"
                    disabled={data.outputs.length === 1}
                    aria-label={`Remove output ${index + 1}`}
                    onClick={() =>
                      update(
                        'outputs',
                        data.outputs.filter(item => item.id !== row.id),
                      )
                    }
                  >
                    <Trash2 size={15} /> Remove
                  </button>
                </div>
                <div className="ipcr-output-fields">
                  <label>
                    Output
                    <input
                      maxLength={100}
                      value={row.output}
                      onChange={event =>
                        updateRow(row.id, 'output', event.target.value)
                      }
                    />
                  </label>
                  <label>
                    Weight (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={row.weight}
                      onChange={event => {
                        const value = event.target.value
                        if (
                          value === '' ||
                          (Number(value) >= 0 && Number(value) <= 100)
                        ) {
                          updateRow(row.id, 'weight', value)
                        }
                      }}
                    />
                  </label>
                </div>

                {dimensions.map((dimension, i) => (
                  <fieldset key={dimension} className="ipcr-criterion">
                    <legend>{dimension}</legend>
                    <div>
                      <label>
                        Success Indicator (Target + Measure)
                        <textarea
                          rows={3}
                          maxLength={350}
                          value={row.targets[i]}
                          onChange={event =>
                            updateRow(row.id, 'targets', event.target.value, i)
                          }
                        />
                      </label>
                      <label>
                        Actual Accomplishment
                        <textarea
                          rows={3}
                          maxLength={350}
                          value={row.actuals[i]}
                          onChange={event =>
                            updateRow(row.id, 'actuals', event.target.value, i)
                          }
                        />
                      </label>
                      <label>
                        Rating
                        <select
                          value={row.ratings[i]}
                          onChange={event =>
                            updateRow(row.id, 'ratings', event.target.value, i)
                          }
                        >
                          <option value="">Unrated</option>
                          {[5, 4, 3, 2, 1].map(value => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </fieldset>
                ))}

                <label className="ipcr-remarks-input">
                  Remarks (Optional; Defaults to the Weighted Score)
                  <input
                    maxLength={100}
                    value={row.remarks}
                    onChange={event =>
                      updateRow(row.id, 'remarks', event.target.value)
                    }
                  />
                </label>
              </div>
            ))}

            <button
              className="button secondary"
              onClick={() => update('outputs', [...data.outputs, newOutput()])}
            >
              <Plus size={16} /> Add Output
            </button>
          </section>

          <section id="ipcr-step-2" hidden={step !== 2}>
            <span className="ipcr-section-kicker">03 / THE FINAL DETAILS</span>
            <h2>Review & Approval</h2>
            <p>
              Signatories are shared by the commitment and final assessment
              sections.
            </p>
            <div className="ipcr-field-grid">
              {field('Reviewed / Assessed By', 'reviewer')}
              {field('Reviewer’s Position', 'reviewerPosition')}
              {field('Approved By', 'approver')}
              {field('Approver’s Position', 'approverPosition')}
              {field('Review Date', 'reviewedDate', 'date')}
              {field('Approval Date', 'approvedDate', 'date')}
              {field('Date Discussed with Employee', 'discussedDate', 'date')}
              {field('Assessment Date', 'assessedDate', 'date')}
              {field('Final Approval Date', 'finalApprovedDate', 'date')}
            </div>
            <label className="ipcr-comments-input">
              Comments and Recommendations for Development Purposes
              <textarea
                rows={3}
                maxLength={600}
                value={data.comments}
                onChange={event => update('comments', event.target.value)}
              />
            </label>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4">
            <button type="button" className="button secondary disabled:cursor-not-allowed disabled:opacity-40" disabled={step === 0} onClick={() => goToStep(step - 1)}><ArrowLeft size={16} /> Back</button>
            <span className="text-xs font-medium text-slate-500">Step {step + 1} of 3 - {steps[step].title}</span>
            <button type="button" className="button primary" onClick={() => step < 2 ? goToStep(step + 1) : (setPreview(true), window.scrollTo({ top: 0 }))}>{step < 2 ? 'Continue' : 'Preview IPCR'}<ArrowRight size={16} /></button>
          </div>
          <div className="ipcr-review-bar">
            <p>
              Final weighted rating:{' '}
              <strong>
                {rating === null
                  ? 'Pending weights and ratings'
                  : `${rating.toFixed(2)} - ${adjectivalRating(rating)}`}
              </strong>
              <small>
                Each output’s score is the average of Q, E, and T, multiplied by its weight.
                Rating labels use cutoffs of 4.50, 3.50, 2.50, and 1.50.
              </small>
            </p>
          </div>
        </div>
      ) : (
        <section>
          <p className="ipcr-preview-note print:hidden">
            A4 landscape (297 × 210 mm) · Based on your supplied IPCR template.
            Additional outputs continue on new pages.
          </p>
          <div className="preview-canvas ipcr-preview">
            <IpcrDocument data={data} />
          </div>
        </section>
      )}

      <p className="session-note print:hidden">
        Changes stay available when switching document tabs. Download your PDF
        before closing this page.
      </p>
    </main>
  )
}
