import { pdfCaptureOptions } from '../utils/pdfCapture.js'
import { useState } from 'react'
import {
  Eye,
  ArrowLeft,
  Download,
  Printer,
  FileText,
  UserRound,
  CalendarDays,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import FormField from '../components/FormField.jsx'
import { servicePeriod, serviceDateToday } from '../utils/servicePeriod.js'

const accounts = [
  'Other Professional Services',
  'Cash-MDS, Regular',
  'Due to BIR',
  'Due to PagIBIG',
  'Due to Philhealth',
  'Other Payables',
]
export const createDisbursement = () => ({
  payee: 'VON FRANCIS A. LA VICTORIA',
  tin: '608-887-296',
  address: '',
  fund: '',
  date: '',
  number: '',
  obligation: '',
  mode: '',
  otherMode: '',
  particulars: 'Payment of services rendered for the period of',
  serviceDate: serviceDateToday(),
  period: servicePeriod(),
  responsibility: '',
  pap: '',
  amount: '',
  supervisor: 'DESIDERIO R. APAG III, PCpE, D.ENG., ASEAN Eng.',
  supervisorPosition: 'Commissioner',
  accountant: 'MARIA PAZ D. GALANG-BUSTOS',
  accountantPosition: 'Chief Accountant, AFMS',
  approver: 'ALMA SY- PATRON, Ph.D.',
  approverPosition: 'Director IV, AFMS',
  accountantDate: '',
  approvalDate: '',
  certifications: [false, false, false],
  check: '',
  paymentDate: '',
  bank: '',
  receivedDate: '',
  receivedName: '',
  jev: '',
  jevDate: '',
  receipt: '',
  entries: accounts.map(title => ({ title, debit: '', credit: '' })),
})
const money = value =>
  value === ''
    ? ''
    : Number(value).toLocaleString('en-PH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
const dateText = value =>
  value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-PH') : ''

function Voucher({ data }) {
  const text = (key, x, y, w, h = 14, extra = {}) => (
    <span
      key={key}
      className="dv-value absolute flex items-center justify-center overflow-hidden text-center [font-size:10px] [--tw-leading:1.1] [line-height:1.1] [overflow-wrap:anywhere] [white-space:pre-wrap]"
      style={{
        left: `${(x / 595) * 100}%`,
        top: `${(y / 842) * 100}%`,
        width: `${(w / 595) * 100}%`,
        height: `${(h / 842) * 100}%`,
        ...extra,
      }}
    >
      {data[key]}
    </span>
  )
  return (
    <article
      className="dv-paper relative [margin-top:0] [margin-right:auto] [margin-bottom:0] [margin-left:auto] [height:1122.667px] [width:793.333px] shrink-0 [font-family:Arial,sans-serif] [color:var(--color-black,_#000)] [box-shadow:0_4px_20px_#122a4a14] [background:white] [&_>_img]:absolute [&_>_img]:[inset:0] [&_>_img]:h-full [&_>_img]:w-full print:[margin-top:0px] print:[margin-right:0px] print:[margin-bottom:0px] print:[margin-left:0px] print:[height:297mm] print:[width:210mm] print:[break-inside:avoid] print:[box-shadow:none] print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]"
      aria-label="Disbursement voucher preview"
    >
      <img
        src={`${import.meta.env.BASE_URL}disbursement-template.png`}
        alt=""
      />
      <span
        className="dv-template-cleanup absolute [top:44.3%] [left:91.5%] [height:1.2%] [width:2%] [background:white]"
        aria-hidden="true"
      />
      <div className="dv-logo absolute [top:8.2%] [left:6.797398%] [height:4.279529%] [width:7.964149%] [background:transparent] [border-top:0] [border-right:0] [border-bottom:0] [border-left:0] [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:[object-fit:contain] [&_img]:[object-position:center] [&_img]:[background:transparent] [&_img]:[border-top:0] [&_img]:[border-right:0] [&_img]:[border-bottom:0] [&_img]:[border-left:0] [&_img]:[clip-path:circle(50%)] [&_img]:relative">
        <img
          src={`${import.meta.env.BASE_URL}ched.png`}
          alt="Commission on Higher Education"
        />
      </div>
      {text('fund', 455, 68, 82)}
      {text('number', 445, 124, 94, 9)}
      <span
        className="dv-value absolute flex items-center justify-center overflow-hidden text-center [font-size:10px] [--tw-leading:1.1] [line-height:1.1] [overflow-wrap:anywhere] [white-space:pre-wrap]"
        style={{ left: '75%', top: '13.4%', width: '15%', height: '1.3%' }}
      >
        {dateText(data.date)}
      </span>
      {text('payee', 76, 169, 238, 20, {
        fontWeight: 700,
        color: '#00255b',
        fontSize: '13px',
      })}
      {text('tin', 318, 176, 90, 14, { fontWeight: 700, color: '#00255b' })}
      {text('obligation', 412, 175, 128)}
      {text('address', 76, 196, 462)}
      {['MDS Check', 'Commercial Check', 'ADA', 'Others'].map(
        (mode, i) =>
          data.mode === mode && (
            <span
              key={mode}
              className="dv-tick absolute [font-size:17px] [--tw-leading:1] [line-height:1]"
              style={{
                left: `${([122, 228, 354, 412][i] / 595) * 100}%`,
                top: '16.45%',
              }}
            >
              &#10003;
            </span>
          ),
      )}
      {data.mode === 'Others' &&
        text('otherMode', 439, 148, 98, 9, { fontSize: '8px' })}
      {text('particulars', 35, 250, 263, 10)}
      {text('period', 35, 260, 263, 12, { fontWeight: 700, color: '#00255b' })}
      {text('responsibility', 301, 238, 49, 45)}
      {text('pap', 354, 238, 54, 45)}
      {[253, 292].map(y => (
        <span
          key={y}
          className="dv-value absolute flex items-center justify-center overflow-hidden text-center [font-size:10px] [--tw-leading:1.1] [line-height:1.1] [overflow-wrap:anywhere] [white-space:pre-wrap] dv-money [justify-content:flex-end] [padding-right:5px] [font-size:10px]"
          style={{
            left: '73%',
            top: `${(y / 842) * 100}%`,
            width: '17%',
            height: '1.8%',
          }}
        >
          {money(data.amount)}
        </span>
      ))}
      {text('supervisor', 52, 370, 469, 14, {
        fontWeight: 700,
        textDecoration: 'underline',
        color: '#00255b',
        fontSize: '12px',
      })}
      {text('supervisorPosition', 52, 384, 469, 12, {
        fontWeight: 700,
        fontSize: '9px',
      })}
      {data.entries.map((row, i) =>
        ['debit', 'credit'].map((key, j) => (
          <span
            key={`${i}-${key}`}
            className="dv-value absolute flex items-center justify-center overflow-hidden text-center [font-size:10px] [--tw-leading:1.1] [line-height:1.1] [overflow-wrap:anywhere] [white-space:pre-wrap] dv-money [justify-content:flex-end] [padding-right:5px] [font-size:10px]"
            style={{
              left: `${([353, 440][j] / 595) * 100}%`,
              top: `${((429 + i * 12.834) / 842) * 100}%`,
              width: `${([85, 100][j] / 595) * 100}%`,
              height: '1.1%',
            }}
          >
            {money(row[key])}
          </span>
        )),
      )}
      {data.certifications.map(
        (checked, i) =>
          checked && (
            <span
              key={i}
              className="dv-tick absolute [font-size:17px] [--tw-leading:1] [line-height:1]"
              style={{
                left: '8.15%',
                top: `${((549 + i * 15.7) / 842) * 100}%`,
              }}
            >
              &#10003;
            </span>
          ),
      )}
      {text('accountant', 88, 644, 193, 13, {
        fontWeight: 700,
        fontSize: '9px',
      })}
      {text('approver', 336, 644, 206, 13, {
        fontWeight: 700,
        fontSize: '9px',
      })}
      {text('accountantPosition', 88, 663, 193, 13, {
        fontWeight: 700,
        fontSize: '9px',
      })}
      {text('approverPosition', 336, 663, 206, 13, {
        fontWeight: 700,
        fontSize: '9px',
      })}
      <span
        className="dv-value absolute flex items-center justify-center overflow-hidden text-center [font-size:10px] [--tw-leading:1.1] [line-height:1.1] [overflow-wrap:anywhere] [white-space:pre-wrap]"
        style={{ left: '15%', top: '82.1%', width: '32%', height: '1.2%' }}
      >
        {dateText(data.accountantDate)}
      </span>
      <span
        className="dv-value absolute flex items-center justify-center overflow-hidden text-center [font-size:10px] [--tw-leading:1.1] [line-height:1.1] [overflow-wrap:anywhere] [white-space:pre-wrap]"
        style={{ left: '57%', top: '82.1%', width: '34%', height: '1.2%' }}
      >
        {dateText(data.approvalDate)}
      </span>
      {text('check', 88, 724, 166, 17)}
      {text('bank', 319, 730, 89, 13)}
      {text('receivedName', 319, 755, 89, 14)}
      {text('jev', 412, 718, 128, 20)}
      {['paymentDate', 'receivedDate', 'jevDate'].map((key, i) => (
        <span
          key={key}
          className="dv-value absolute flex items-center justify-center overflow-hidden text-center [font-size:10px] [--tw-leading:1.1] [line-height:1.1] [overflow-wrap:anywhere] [white-space:pre-wrap]"
          style={{
            left: `${([256, 256, 412][i] / 595) * 100}%`,
            top: `${([732, 757, 760][i] / 842) * 100}%`,
            width: `${([60, 60, 127][i] / 595) * 100}%`,
            height: '1.5%',
          }}
        >
          {dateText(data[key])}
        </span>
      ))}
      {text('receipt', 150, 779, 257, 10, { fontSize: '9px' })}
    </article>
  )
}

export default function DisbursementPage({ data, setData }) {
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const update = (key, value) => {
    if (!['payee', 'tin', 'serviceDate'].includes(key)) return
    setData(current => ({
      ...current,
      [key]: value,
      ...(key === 'serviceDate' ? { period: servicePeriod(value) } : {}),
    }))
  }
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
      const [{ toPng }, { jsPDF }] = await Promise.all([
        import('html-to-image'),
        import('jspdf'),
      ])
      await document.fonts.ready
      const page = document.querySelector('.dv-paper')
      if (!page) throw new Error('The voucher preview is not ready.')
      await Promise.all(
        [...page.querySelectorAll('img')].map(img => img.decode()),
      )
      const image = await toPng(page, pdfCaptureOptions())
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true })
      pdf.setProperties({ title: 'Disbursement Voucher', author: data.payee })
      pdf.addImage(image, 'PNG', 0, 0, 210, 297)
      await pdf.save(
        `Disbursement_Voucher_${(data.number || data.payee || 'Draft').replace(/[^a-z0-9_-]/gi, '_')}.pdf`,
        { returnPromise: true },
      )
    } catch {
      setError('The voucher could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  return (
    <main className="workspace dv-workspace [&_.export-actions]:flex-wrap print:[page:disbursement] [&_.dv-hero_.dv-draft]:inline-flex [&_.dv-hero_.dv-draft]:[height:auto] [&_.dv-hero_.dv-draft]:[width:auto] [&_.dv-hero_.dv-draft]:items-center [&_.dv-hero_.dv-draft]:[border-radius:20px] [&_.dv-hero_.dv-draft]:[padding-top:4px] [&_.dv-hero_.dv-draft]:[padding-right:8px] [&_.dv-hero_.dv-draft]:[padding-bottom:4px] [&_.dv-hero_.dv-draft]:[padding-left:8px] [&_.dv-hero_.dv-draft]:[background:#67e8f91a] [&_.dv-sidebar]:block max-[1000.02px]:[&_.dv-sidebar]:hidden">
      <div
        className={`dv-toolbar [margin-bottom:28px] flex items-center justify-between [gap:24px] [&_h1]:[margin-top:8px] [&_h1]:[margin-right:0] [&_h1]:[margin-bottom:8px] [&_h1]:[margin-left:0] [&_h1]:[font-size:30px] [&_h1]:[font-weight:700] [&_h1]:[color:#122a4a] [&_p]:[font-size:13px] [&_p]:[color:#64748b] max-[900.02px]:flex-col max-[900.02px]:items-start [&.dv-hero]:relative [&.dv-hero]:overflow-hidden [&.dv-hero]:[border-radius:24px] [&.dv-hero]:[padding-top:36px] [&.dv-hero]:[padding-right:40px] [&.dv-hero]:[padding-bottom:36px] [&.dv-hero]:[padding-left:40px] [&.dv-hero]:[box-shadow:0_12px_25px_#0f172a12] [&.dv-hero]:[background:radial-gradient(ellipse_at_85%_20%,#0891b238,transparent_55%),linear-gradient(120deg,#0b1d35,#101a35)] [&.dv-hero]:[border-top:1px_solid_#334155] [&.dv-hero]:[border-right:1px_solid_#334155] [&.dv-hero]:[border-bottom:1px_solid_#334155] [&.dv-hero]:[border-left:1px_solid_#334155] [&:not(.dv-hero)_.dv-draft]:hidden [&:not(.dv-hero)_.eyebrow]:flex [&:not(.dv-hero)_.eyebrow]:items-center [&:not(.dv-hero)_.eyebrow]:[gap:8px] max-[1000.02px]:[&.dv-hero]:[padding-top:30px] max-[1000.02px]:[&.dv-hero]:[padding-right:30px] max-[1000.02px]:[&.dv-hero]:[padding-bottom:30px] max-[1000.02px]:[&.dv-hero]:[padding-left:30px] max-[550.02px]:[&.dv-hero]:[padding-top:24px] max-[550.02px]:[&.dv-hero]:[padding-right:24px] max-[550.02px]:[&.dv-hero]:[padding-bottom:24px] max-[550.02px]:[&.dv-hero]:[padding-left:24px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation:studio-enter_450ms_cubic-bezier(.22,1,.36,1)_backwards] print:hidden ${preview ? '' : 'dv-hero [&_.eyebrow]:flex [&_.eyebrow]:items-center [&_.eyebrow]:[gap:8px] [&_.eyebrow]:[font-size:10px] [&_.eyebrow]:[--tw-tracking:1.8px] [&_.eyebrow]:[letter-spacing:1.8px] [&_.eyebrow]:[color:#67e8f9] [&_h1]:[margin-top:16px] [&_h1]:[margin-right:0] [&_h1]:[margin-bottom:16px] [&_h1]:[margin-left:0] [&_h1]:[font-size:36px] [&_h1]:[--tw-leading:1.2] [&_h1]:[line-height:1.2] [&_h1]:[font-weight:650] [&_h1]:[--tw-tracking:-1px] [&_h1]:[letter-spacing:-1px] [&_h1]:[color:var(--color-white,_#fff)] [&_p]:[max-width:550px] [&_p]:[font-size:14px] [&_p]:[--tw-leading:1.7] [&_p]:[line-height:1.7] [&_p]:[color:#cbd5e1] [&_.button.primary]:[border-color:#67e8f9] [&_.button.primary]:[color:#0f172a] [&_.button.primary]:[background:#67e8f9] max-[1000.02px]:[&_h1]:[font-size:30px] max-[550.02px]:[&_h1]:[font-size:28px]'}`}
      >
        <div>
          <span className="eyebrow">
            <FileText size={14} /> DISBURSEMENT WORKSPACE{' '}
            <span className="dv-draft [border-radius:20px] [padding-top:4px] [padding-right:8px] [padding-bottom:4px] [padding-left:8px] [font-size:9px] [color:#67e8f9] [background:#67e8f91a] [border-top:1px_solid_#67e8f940] [border-right:1px_solid_#67e8f940] [border-bottom:1px_solid_#67e8f940] [border-left:1px_solid_#67e8f940]">
              DRAFT
            </span>
          </span>
          <h1>
            {preview ? (
              'Disbursement Voucher'
            ) : (
              <>
                Your payment details.
                <br />
                Ready for review.
              </>
            )}
          </h1>
          <p>
            {preview
              ? 'Review your voucher before printing or downloading.'
              : 'Prepare your payee details and service period in a consistent, office-ready voucher.'}
          </p>
        </div>
        <div className="export-actions">
          <button
            className={`button ${preview ? 'secondary' : 'primary'}`}
            disabled={saving}
            onClick={() => setPreview(!preview)}
          >
            {preview ? <ArrowLeft size={16} /> : <Eye size={16} />}{' '}
            {preview ? 'Edit details' : 'Preview Voucher'}
          </button>
          {preview && (
            <>
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
          )}
        </div>
      </div>
      {error && (
        <p role="alert" className="print:hidden text-red-700">
          {error}
        </p>
      )}
      {!preview && (
        <div className="dv-builder grid [grid-template-columns:minmax(0,1fr)_300px] [align-items:start] [gap:28px] max-[1000.02px]:[grid-template-columns:minmax(0,1fr)] print:hidden">
          <div className="dv-editor [&_p]:[font-size:13px] [&_p]:[color:#64748b] grid [gap:22px] [min-width:0px] [&[hidden]]:hidden [&_section]:[border-radius:16px] [&_section]:[padding-top:28px] [&_section]:[padding-right:32px] [&_section]:[padding-bottom:28px] [&_section]:[padding-left:32px] [&_section]:[background:white] [&_section]:[border-top:1px_solid_#dbe3ec] [&_section]:[border-right:1px_solid_#dbe3ec] [&_section]:[border-bottom:1px_solid_#dbe3ec] [&_section]:[border-left:1px_solid_#dbe3ec] [&_section]:[border-color:#dfe5ec] [&_section]:[box-shadow:0_3px_12px_#122a4a03] [&_h2]:[margin-bottom:20px] [&_h2]:[font-size:18px] [&_h2]:[font-weight:650] [&_h2]:[color:#122a4a] [&_select]:w-full [&_select]:[border-radius:7px] [&_select]:[padding-top:11px] [&_select]:[padding-right:11px] [&_select]:[padding-bottom:11px] [&_select]:[padding-left:11px] [&_select]:[font-size:13px] [&_select]:[background:#fcfdfe] [&_select]:[border-top:1px_solid_#d7dfe8] [&_select]:[border-right:1px_solid_#d7dfe8] [&_select]:[border-bottom:1px_solid_#d7dfe8] [&_select]:[border-left:1px_solid_#d7dfe8] [&_select]:[margin-top:7px] [&_select]:block max-[550.02px]:[&_section]:[padding-top:22px] max-[550.02px]:[&_section]:[padding-right:18px] max-[550.02px]:[&_section]:[padding-bottom:22px] max-[550.02px]:[&_section]:[padding-left:18px] [&_.section-kicker]:[margin-top:0px] [&_.section-kicker]:[margin-right:0px] [&_.section-kicker]:[margin-bottom:0px] [&_.section-kicker]:[margin-left:0px] [&_.section-kicker_h2]:[margin-top:0px] [&_.section-kicker_h2]:[margin-right:0px] [&_.section-kicker_h2]:[margin-bottom:0px] [&_.section-kicker_h2]:[margin-left:0px] [&_.section-kicker_h2]:[font-size:14px] [&_.dv-section-heading_h2]:[margin-top:5px] [&_.dv-section-heading_h2]:[margin-right:0] [&_.dv-section-heading_h2]:[margin-bottom:6px] [&_.dv-section-heading_h2]:[margin-left:0] [&_.dv-section-heading_h2]:[font-size:20px] [&_.dv-section-heading_h2]:[--tw-tracking:-.4px] [&_.dv-section-heading_h2]:[letter-spacing:-.4px] [&_.session-note]:[margin-top:-9px] [&_.session-note]:text-center [&_.session-note]:[font-size:11px] max-[550.02px]:[&_.action-bar]:[align-items:stretch] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_.section-kicker]:[animation:studio-enter_450ms_cubic-bezier(.22,1,.36,1)_backwards] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_.section-kicker]:[animation-delay:60ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_section]:[animation:studio-enter_450ms_cubic-bezier(.22,1,.36,1)_backwards] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_.action-bar]:[animation:studio-enter_450ms_cubic-bezier(.22,1,.36,1)_backwards] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_.action-bar]:[animation-delay:240ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_section:nth-of-type(1)]:[animation-delay:120ms] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[&_>_section:nth-of-type(2)]:[animation-delay:180ms]">
            <div className="section-kicker">
              <h2>
                <span>01</span> Voucher Details
              </h2>
              <span>VOUCHER BUILDER</span>
            </div>
            <section>
              <div className="dv-section-heading [margin-bottom:25px] flex items-start [gap:14px] [&_p]:[margin-top:0px] [&_p]:[margin-right:0px] [&_p]:[margin-bottom:0px] [&_p]:[margin-left:0px] [&_p]:[font-size:12px] [&_p]:[--tw-leading:1.7] [&_p]:[line-height:1.7] max-[550.02px]:[gap:10px]">
                <span className="dv-section-icon grid [height:44px] [width:44px] shrink-0 [place-items:center] [border-radius:12px] [color:#243f60] [background:#eaf2fb]">
                  <UserRound size={20} />
                </span>
                <div>
                  <span className="dv-kicker [font-size:9px] [font-weight:700] [--tw-tracking:1.5px] [letter-spacing:1.5px] [color:#0e7490]">
                    01 / PAYEE INFORMATION
                  </span>
                  <h2>Make it yours.</h2>
                  <p>
                    Enter the name and identification number that will appear on
                    your voucher.
                  </p>
                </div>
              </div>
              <div className="dv-grid grid [grid-template-columns:repeat(2,minmax(0,1fr))] [gap:0_24px] [&_>_label]:[font-size:11px] [&_>_label]:[font-weight:600] [&_>_label]:[color:#526174] max-[900.02px]:[grid-template-columns:repeat(2,minmax(0,1fr))] max-[550.02px]:[grid-template-columns:1fr]">
                {field('Payee', 'payee')}
                {field('TIN/Employee No.', 'tin')}
              </div>
            </section>
            <section>
              <div className="dv-section-heading [margin-bottom:25px] flex items-start [gap:14px] [&_p]:[margin-top:0px] [&_p]:[margin-right:0px] [&_p]:[margin-bottom:0px] [&_p]:[margin-left:0px] [&_p]:[font-size:12px] [&_p]:[--tw-leading:1.7] [&_p]:[line-height:1.7] max-[550.02px]:[gap:10px]">
                <span className="dv-section-icon grid [height:44px] [width:44px] shrink-0 [place-items:center] [border-radius:12px] [color:#243f60] [background:#eaf2fb]">
                  <CalendarDays size={20} />
                </span>
                <div>
                  <span className="dv-kicker [font-size:9px] [font-weight:700] [--tw-tracking:1.5px] [letter-spacing:1.5px] [color:#0e7490]">
                    02 / SERVICE PERIOD
                  </span>
                  <h2>Set the payment period.</h2>
                  <p>
                    Select a date to automatically use the 1st-15th or the
                    16th-last day of that month.
                  </p>
                </div>
              </div>
              <div className="dv-particulars [border-radius:12px] [padding-top:20px] [padding-right:20px] [padding-bottom:20px] [padding-left:20px] [background:#f8fafc] [border-top:1px_solid_#e2e8f0] [border-right:1px_solid_#e2e8f0] [border-bottom:1px_solid_#e2e8f0] [border-left:1px_solid_#e2e8f0] [&_>_span]:[font-size:9px] [&_>_span]:[font-weight:700] [&_>_span]:[--tw-tracking:1.4px] [&_>_span]:[letter-spacing:1.4px] [&_>_span]:[color:#64748b] [&_>_p]:[margin-top:8px] [&_>_p]:[margin-right:0] [&_>_p]:[margin-bottom:18px] [&_>_p]:[margin-left:0] [&_>_p]:[font-size:13px] [&_>_p]:[color:#334155] [&_input]:[background:white] max-[550.02px]:[padding-top:16px] max-[550.02px]:[padding-right:16px] max-[550.02px]:[padding-bottom:16px] max-[550.02px]:[padding-left:16px]">
                <span>PARTICULARS</span>
                <p>Payment of services rendered for the period of</p>
                {field('Service date', 'serviceDate', 'date')}
                <FormField
                  label="Service Period"
                  value={data.period}
                  readOnly
                />
              </div>
            </section>
            <div className="action-bar">
              <span className="dv-action-hint flex items-center [gap:8px] [font-size:12px] [color:#64748b] max-[550.02px]:hidden">
                <ShieldCheck size={16} /> Ready for your final review
              </span>
              <button
                className="button primary"
                onClick={() => {
                  setPreview(true)
                  window.scrollTo({ top: 0, behavior: 'instant' })
                }}
              >
                Preview Voucher <ArrowRight size={16} />
              </button>
            </div>
            <p className="session-note">
              Changes are kept while switching workspaces. Download your voucher
              before closing.
            </p>
          </div>
          <aside className="report-sidebar dv-sidebar [padding-top:43px] [&_.summary-person_strong]:[overflow-wrap:anywhere] [&_.summary-period_strong]:[overflow-wrap:anywhere] max-[1000.02px]:hidden">
            <div className="summary-card">
              <div className="summary-heading">
                <span className="summary-icon">
                  <FileText size={20} />
                </span>
                <span className="draft-badge">In progress</span>
              </div>
              <h3>Your voucher at a glance</h3>
              <p>The details behind your next payment.</p>
              <div className="summary-person">
                <span>PREPARED FOR</span>
                <strong>{data.payee || 'Payee name'}</strong>
                <p>{data.tin || 'TIN / Employee number'}</p>
              </div>
              <div className="summary-period">
                <CalendarDays size={17} />
                <div>
                  <span>Service Period</span>
                  <strong>{data.period || 'Enter your service period'}</strong>
                </div>
              </div>
              <div className="summary-footer">
                <ShieldCheck size={14} /> Appendix 32 &middot; Disbursement
                Voucher
              </div>
            </div>
            <div className="tip-card">
              <span className="eyebrow">BEFORE YOU EXPORT</span>
              <h3>Check the essentials.</h3>
              <p>
                Verify the payee name, identification number, and service dates
                before downloading your voucher.
              </p>
            </div>
          </aside>
        </div>
      )}
      {preview && (
        <div className="dv-preview overflow-x-auto [border-radius:14px] [padding-top:25px] [padding-right:25px] [padding-bottom:25px] [padding-left:25px] [background:#e7edf6] print:[overflow:visible] print:[padding-top:0px] print:[padding-right:0px] print:[padding-bottom:0px] print:[padding-left:0px] print:[background:white] [@media_screen]:grid [@media_screen]:[justify-content:safe_center] [@media_screen]:[&_.dv-paper]:[margin-top:0px] [@media_screen]:[&_.dv-paper]:[margin-right:0px] [@media_screen]:[&_.dv-paper]:[margin-bottom:0px] [@media_screen]:[&_.dv-paper]:[margin-left:0px] [@media_screen_and_(prefers-reduced-motion:no-preference)]:[animation:studio-enter_450ms_cubic-bezier(.22,1,.36,1)_backwards]">
          <Voucher
            data={{
              ...createDisbursement(),
              payee: data.payee,
              tin: data.tin,
              period: data.period,
            }}
          />
        </div>
      )}
      <footer className="workspace-footer print:hidden">
        <span>
          DISBURSEMENT <b>/</b> VOUCHER STUDIO
        </span>
        <span>Thoughtful records. Meaningful progress.</span>
      </footer>
    </main>
  )
}
