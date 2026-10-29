import { Eye } from 'lucide-react'
import ReportDocument from '../components/ReportDocument.jsx'

export default function ReportPreviewPage({ profile, entries }) {
  return (
    <section className="min-w-0">
      <div className="print:hidden mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-bold text-[#122a4a]">
            Your Finished Document
          </h2>
          <p className="text-xs text-slate-500">
            A4 pages (210 × 297 mm). Overflow continues on a new page;
            letterhead appears on page 1 only.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold text-navy-700 uppercase">
          <Eye size={14} /> Live preview
        </span>
      </div>
      <div className="preview-canvas overflow-x-auto rounded-xl border border-[#d9e0e8] bg-navy-100 px-3 py-5 sm:px-5 sm:py-8 [&_article]:shadow-[0_4px_20px_#122a4a14] print:overflow-visible print:rounded-none print:border-0 print:bg-white print:p-0 print:[&_article]:shadow-none">
        <ReportDocument profile={profile} entries={entries} />
      </div>
    </section>
  )
}
