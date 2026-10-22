import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { formatReportDate } from '../utils/reportUtils.js'

// The fixed contact footer is embedded in every report.
const reportDefaults = {
  footer:
    'Higher Education Development Center Building, 55 C.P Garcia Avenue, UP Campus Diliman, Quezon City, Philippines | Tel. No. (02) 8441 117 | Email: commissionerapag@ched.gov.ph | Website: www.ocdra.vercel.app | FB: www.facebook.com/ocdra3',
}

// Shared by the source document and each generated A4 page.
// Edit these utilities to change both the preview and printed report.
const paperClasses =
  'mx-auto w-[210mm] min-h-[297mm] bg-white px-[15mm] pt-[12mm] pb-[15mm] font-[Arial,Helvetica,sans-serif] text-[11pt] leading-[1.5] text-[#111] [page:report] screen:shadow-[0_10px_35px_rgba(15,23,42,0.14)] print:block print:shadow-none print:[print-color-adjust:exact] print:[-webkit-print-color-adjust:exact]'
const pageClasses = `${paperClasses} relative h-[297mm] flex-none print:break-inside-avoid print:break-after-page print:last:break-after-auto`
const cellClasses =
  'border border-[#333] px-[7px] py-[5px] align-middle [overflow-wrap:anywhere]'
const dateClasses = `${cellClasses} w-[18%] whitespace-pre-line text-center`

function ReportContent({ profile, entries }) {
  return (
    <article className={paperClasses}>
      <img
        className="mx-auto block h-auto w-[90%] print:static print:break-inside-avoid print:break-after-avoid"
        src={`${import.meta.env.BASE_URL}Header.png`}
        alt="Agency letterhead"
        width="31901"
        height="5000"
      />

      <h2 className="mt-8 text-center text-[11pt] font-bold leading-tight print:break-after-avoid">
        DAILY ATTENDANCE LOG AND ACCOMPLISHMENT REPORT
      </h2>

      <div className="my-8 space-y-0.5 text-[12pt]">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Position:</strong> {profile.position}
        </p>
        <p>
          <strong>Office/Division:</strong> {profile.office}
        </p>
        <p>
          <strong>Period:</strong> {formatReportDate(profile.periodStart)} –{' '}
          {formatReportDate(profile.periodEnd)}
        </p>
      </div>

      <table className="w-full table-fixed border-collapse print:break-inside-auto">
        <thead className="print:table-header-group">
          <tr className="print:break-inside-avoid">
            <th className={`${dateClasses} bg-[#bdbdbd] font-bold`}>Date</th>
            <th className={`${cellClasses} bg-[#bdbdbd] text-center font-bold`}>
              Actual Accomplishments / Outputs / Evidence
            </th>
          </tr>
        </thead>
        <tbody className="print:break-inside-auto">
          {entries.map(entry => (
            <tr key={entry.id} className="print:break-inside-avoid">
              <td className={dateClasses}>{formatReportDate(entry.date)}</td>
              <td className={`${cellClasses} w-[82%]`}>
                {entry.kind === 'work' ? (
                  <ul className="m-0 list-disc pl-[19px]">
                    {entry.items
                      .filter(item => item.trim())
                      .map((item, index) => (
                        <li
                          key={index}
                          className="mb-px pl-px leading-[1.23] print:break-inside-avoid"
                        >
                          {item}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div
                    className={`text-center font-bold ${entry.kind === 'weekend' ? 'not-italic' : 'italic'}`}
                  >
                    {entry.note ||
                      (entry.kind === 'weekend'
                        ? 'WEEKEND'
                        : 'NON-WORKING DAY')}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-[17mm] grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-[5mm] text-[10pt] print:break-inside-avoid">
        <div>
          <div>Prepared by:</div>
          <div className="mt-[10mm] text-center font-bold">
            {profile.preparedBy}
          </div>
          <div className="text-center">{profile.preparedPosition}</div>
        </div>
        <div>
          <div>Approved by:</div>
          <div className="mt-[10mm] whitespace-nowrap text-center font-bold">
            {profile.approvedBy}
          </div>
          <div className="text-center">{profile.approvedPosition}</div>
        </div>
      </div>

      <footer className="absolute right-[15mm] bottom-[15mm] left-[15mm] border-t border-[#444] pt-[3mm] text-center font-[Georgia,serif] text-[7.2pt] print:break-inside-avoid">
        {reportDefaults.footer}
      </footer>
    </article>
  )
}

export default function ReportDocument({ profile, entries }) {
  const sourceRef = useRef(null)
  const workspaceRef = useRef(null)
  const outputRef = useRef(null)

  useLayoutEffect(() => {
    const source = sourceRef.current.querySelector('article')
    const workspace = workspaceRef.current
    let cancelled = false

    const paginate = () => {
      if (cancelled) return
      workspace.replaceChildren()
      const pages = []
      let content
      let table
      let body
      const newPage = () => {
        const page = document.createElement('article')
        page.className = pageClasses
        content = document.createElement('div')
        content.className = 'flow-root'
        page.append(content)
        const footer = source.querySelector('footer').cloneNode(true)
        page.append(footer)
        workspace.append(page)
        // Reserve the footer and a 6 mm gap before measuring report content.
        // Each sheet owns its footer so preview, PDF, and print agree.
        content.style.height = `${footer.getBoundingClientRect().top - content.getBoundingClientRect().top - (6 * 96) / 25.4}px`
        pages.push(page)
        table = null
        body = null
      }
      // Measure the actual block edges. scrollHeight can miss overflow in an
      // off-screen measurement tree, especially at browser zoom levels.
      const overflows = () => {
        const limit = content.getBoundingClientRect().bottom - 2
        return [...content.children].some(child => {
          const margin = parseFloat(getComputedStyle(child).marginBottom) || 0
          return child.getBoundingClientRect().bottom + margin > limit
        })
      }
      const startTable = original => {
        table = original.cloneNode(false)
        table.append(original.querySelector('thead').cloneNode(true))
        body = original.querySelector('tbody').cloneNode(false)
        table.append(body)
        content.append(table)
      }
      newPage()
      for (const original of source.children) {
        if (original.tagName === 'FOOTER') continue
        if (original.tagName !== 'TABLE') {
          const block = original.cloneNode(true)
          content.append(block)
          if (overflows() && content.children.length > 1) {
            block.remove()
            newPage()
            content.append(block)
          }
          continue
        }
        startTable(original)
        for (const originalRow of original.querySelectorAll('tbody > tr')) {
          const row = originalRow.cloneNode(true)
          body.append(row)
          if (!overflows()) continue
          row.remove()
          if (!body.children.length) table.remove()
          newPage()
          startTable(original)
          body.append(row)
          if (!overflows()) continue

          // An exceptionally long entry can span pages instead of extending a sheet.
          let cell = row.cells[1]
          const words = cell.textContent.trim().split(/\s+/)
          let offset = 0
          while (offset < words.length) {
            let low = 1
            let high = words.length - offset
            let fit = 0
            while (low <= high) {
              const count = Math.floor((low + high) / 2)
              cell.textContent = words.slice(offset, offset + count).join(' ')
              if (overflows()) high = count - 1
              else {
                fit = count
                low = count + 1
              }
            }
            const count = Math.max(1, fit)
            cell.textContent = words.slice(offset, offset + count).join(' ')
            offset += count
            if (offset < words.length) {
              newPage()
              startTable(original)
              const continuation = originalRow.cloneNode(true)
              continuation.cells[0].textContent += ' (continued)'
              body.append(continuation)
              cell = continuation.cells[1]
            }
          }
        }
      }
      outputRef.current.replaceChildren(
        ...pages.map(page => page.cloneNode(true)),
      )
      workspace.replaceChildren()
    }

    paginate()
    const image = source.querySelector('img')
    image.addEventListener('load', paginate)
    document.fonts.ready.then(paginate)
    return () => {
      cancelled = true
      image.removeEventListener('load', paginate)
    }
  }, [profile, entries])

  return (
    <>
      <div
        className="report-pages flex flex-col gap-6 print:block"
        ref={outputRef}
      />
      {createPortal(
        <div
          className="pointer-events-none invisible fixed top-0 left-0 -z-10 w-[210mm] print:hidden"
          aria-hidden="true"
        >
          <div ref={sourceRef}>
            <ReportContent profile={profile} entries={entries} />
          </div>
          <div ref={workspaceRef} />
        </div>,
        document.body,
      )}
    </>
  )
}
