import { ChevronDown, Plus } from 'lucide-react'
import { accomplishmentText } from '../utils/accomplishmentText.js'
import FormField from './FormField.jsx'
import AccomplishmentEditor from './AccomplishmentEditor.jsx'

export default function ReportEntryEditor({
  entry,
  index,
  expanded,
  onToggle,
  updateEntry,
  updateItem,
  addItem,
  removeItem,
}) {
  const items = entry.items.map(accomplishmentText)
  const needsAttention = entry.kind === 'work'
    ? !items.length || items.some(item => !item.trim())
    : !entry.note?.trim()
  const summary = entry.kind === 'work'
    ? items.find(item => item.trim()) || 'Add your accomplishments for this day'
    : entry.note || 'Add a description for this day'
  const dateLabel = new Date(`${entry.date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', weekday: 'short',
  })

  return (
    <div
      className={`entry-card rounded-[9px] border border-[#e0e6ed] border-l-[3px] px-3 py-[15px] sm:p-5 ${entry.kind === 'work' ? 'border-l-navy-400 bg-white' : 'border-l-navy-200 bg-slate-50'}`}
    >
      <button type="button" onClick={onToggle}
        aria-expanded={expanded} aria-controls={`entry-panel-${entry.id}`}
        id={`entry-toggle-${entry.id}`}
        className="flex w-full items-center justify-between gap-3 rounded text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-500">
        <span className="min-w-0 flex-1">
        <span className="flex items-center gap-3 text-[10px] font-bold tracking-wide text-[#65758a] uppercase">
          Entry {String(index + 1).padStart(2, '0')}{' '}
          <span className="rounded bg-navy-50 px-[7px] py-1 text-[10px] font-medium tracking-normal text-[#7c8998] normal-case">
            {entry.kind === 'work'
              ? new Date(`${entry.date}T00:00:00`).toLocaleDateString('en-US', { weekday: 'long' })
              : entry.kind === 'weekend'
                ? 'Weekend'
                : 'Special Day'}
          </span>
        </span>
        <span className="mt-2 block text-sm font-semibold text-[#19375e]">{dateLabel}</span>
        <span className="mt-1 block truncate text-xs text-slate-500">{summary.replace(/\s+/g, ' ')}</span>
        {needsAttention && <span className="mt-2 inline-block rounded bg-amber-50 px-2 py-1 text-[10px] font-medium text-amber-800">Needs attention</span>}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#294c73]">
          {expanded ? 'Close' : 'Edit'}
          <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {expanded && <div id={`entry-panel-${entry.id}`} role="region" aria-labelledby={`entry-toggle-${entry.id}`} className="mt-4 border-t border-slate-200 pt-4">

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <FormField label="Date" type="date" value={entry.date} readOnly />
        <label className="block">
          <span className="mb-[7px] block text-[11px] font-semibold text-[#526174]">
            Entry Type
          </span>
          <select
            value={entry.kind}
            onChange={event =>
              updateEntry(entry.id, 'kind', event.target.value)
            }
            className="w-full rounded-[7px] border border-[#d7dfe8] bg-[#fcfdfe] px-3 py-[11px] text-[13px] leading-normal text-[#29394e] outline-none transition-[border-color,box-shadow] duration-180 focus:border-navy-500 focus:shadow-[0_0_0_3px_#122a4a18]"
          >
            <option value="work">Workday</option>
            <option value="special">Non-working / Special Day</option>
            <option value="weekend">Weekend</option>
          </select>
        </label>
      </div>

      {entry.kind !== 'work' ? (
        <div className="mt-3">
          <FormField
            label={
              entry.kind === 'weekend' ? 'Day Label' : 'Special Day Description'
            }
            value={entry.note}
            onChange={value => updateEntry(entry.id, 'note', value)}
            placeholder={
              entry.kind === 'weekend'
                ? 'e.g. SATURDAY'
                : 'e.g. NON-WORKING DAY'
            }
          />
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-semibold text-slate-600">
            Accomplishments / Outputs / Evidence
          </p>
          {entry.items.map((item, itemIndex) => (
            <div key={itemIndex} className="accomplishment-row flex items-start gap-2">
              <AccomplishmentEditor
                label={`Accomplishment ${itemIndex + 1} for entry ${index + 1}`}
                value={item}
                onRemove={() => removeItem(entry.id, itemIndex)}
                onChange={value =>
                  updateItem(entry.id, itemIndex, value)
                }
                placeholder={`Accomplishment ${itemIndex + 1}`}
              />
            </div>
          ))}
          <button
            onClick={() => addItem(entry.id)}
            className="inline-flex items-center gap-1 pt-[7px] text-xs font-semibold text-[#294c73] hover:text-navy-900"
          >
            <Plus size={15} /> Add Accomplishment
          </button>
        </div>
      )}
      </div>}
    </div>
  )
}
