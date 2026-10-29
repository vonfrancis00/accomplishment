import { useState } from 'react'
import { FileText } from 'lucide-react'
import FormField from '../components/FormField.jsx'
import ReportEntryEditor from '../components/ReportEntryEditor.jsx'

export default function ReportFormPage({
  profile,
  updateProfile,
  entries,
  updateEntry,
  updateItem,
  addItem,
  removeItem,
  includeWeekendRows,
  setIncludeWeekendRows,
  step,
}) {
  const [expandedEntryId, setExpandedEntryId] = useState(() => entries[0]?.id ?? null)
  const activeEntryId = entries.some(entry => entry.id === expandedEntryId)
    ? expandedEntryId
    : expandedEntryId === null ? null : entries[0]?.id

  return (
    <div className="mx-auto grid gap-6">
      <section
        hidden={step !== 0}
        className="rounded-xl border border-[#dfe5ec] bg-white px-4 py-5 shadow-[0_3px_12px_#122a4a03] sm:px-8 sm:py-7 [&_h2]:text-base [&_h2]:font-[650] [&_h2]:tracking-[-.25px] [&_h2]:text-[#122a4a] [&_h2+p]:mt-1 [&_h2+p]:leading-[1.6]"
      >
        <div className="mb-6 flex items-center gap-2">
          <div className="rounded-lg bg-navy-100 p-[11px] text-[#243f60]">
            <FileText size={18} />
          </div>
          <div>
            <h2 className="font-bold">Make it yours.</h2>
            <p className="text-xs text-slate-500">
              Add your employee details and choose the period this report
              covers.
            </p>
          </div>
        </div>
        <div className="grid gap-x-6 sm:grid-cols-2">
          <FormField
            label="Name"
            value={profile.name}
            onChange={value => updateProfile('name', value)}
          />
          <FormField
            label="Position"
            value={profile.position}
            onChange={value => updateProfile('position', value)}
          />
          <FormField
            label="Office / Division"
            value={profile.office}
            onChange={value => updateProfile('office', value)}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField
              label="Period Start"
              type="date"
              value={profile.periodStart}
              onChange={value => updateProfile('periodStart', value)}
            />
            <FormField
              label="Period End"
              type="date"
              value={profile.periodEnd}
              onChange={value => updateProfile('periodEnd', value)}
            />
          </div>
        </div>
        <label className="mt-1 flex items-center gap-2 border-t border-[#edf0f4] pt-[18px] text-xs text-slate-600">
          <input
            type="checkbox"
            checked={includeWeekendRows}
            onChange={event => setIncludeWeekendRows(event.target.checked)}
            className="size-[15px] rounded border-slate-300 accent-[#122a4a]"
          />
          Include weekends in the final report
        </label>
      </section>

      <section
        hidden={step !== 1}
        className="rounded-xl border border-[#dfe5ec] bg-white px-4 py-5 shadow-[0_3px_12px_#122a4a03] sm:px-8 sm:py-7 [&_h2]:text-base [&_h2]:font-[650] [&_h2]:tracking-[-.25px] [&_h2]:text-[#122a4a] [&_h2+p]:mt-1 [&_h2+p]:leading-[1.6]"
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold">Small steps. Real accomplishments.</h2>
            <p className="text-xs text-slate-500">
              Entries follow the selected period. Existing accomplishments are
              kept when you change dates. Select an entry to edit it.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <ReportEntryEditor
              key={entry.id}
              entry={entry}
              index={index}
              expanded={activeEntryId === entry.id}
              onToggle={() => setExpandedEntryId(activeEntryId === entry.id ? null : entry.id)}
              updateEntry={updateEntry}
              updateItem={updateItem}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
          {entries.length === 0 && (
            <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
              No entries yet. Select a reporting period in Report Details to
              generate daily entries.
            </p>
          )}
        </div>
      </section>

      <section
        hidden={step !== 2}
        className="rounded-xl border border-[#dfe5ec] bg-white px-4 py-5 shadow-[0_3px_12px_#122a4a03] sm:px-8 sm:py-7 [&_h2]:text-base [&_h2]:font-[650] [&_h2]:tracking-[-.25px] [&_h2]:text-[#122a4a] [&_h2+p]:mt-1 [&_h2+p]:leading-[1.6]"
      >
        <h2 className="mb-1 font-bold">Signatures</h2>
        <p className="mb-5 text-xs text-slate-500">
          Add the people who prepare and approve this report.
        </p>
        <div className="grid gap-x-6 sm:grid-cols-2">
          <FormField
            label="Prepared By"
            value={profile.preparedBy}
            onChange={value => updateProfile('preparedBy', value)}
          />
          <FormField
            label="Approved By"
            value={profile.approvedBy}
            onChange={value => updateProfile('approvedBy', value)}
          />
          <FormField
            label="Preparer’s Position"
            value={profile.preparedPosition}
            onChange={value => updateProfile('preparedPosition', value)}
          />
          <FormField
            label="Approver’s Position"
            value={profile.approvedPosition}
            onChange={value => updateProfile('approvedPosition', value)}
          />
        </div>
      </section>
    </div>
  )
}
