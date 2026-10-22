import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Fragment } from 'react'
import { dimensions, averageRating, totalWeight, finalRating, adjectivalRating, ratingScale } from '../utils/ipcrUtils.js'

const dateText = value => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
function Signatures({ data, final = false }) {
  const cells = final ? [
    ['Discussed with', data.name.toUpperCase(), 'Employee', data.discussedDate],
    ['Assessed by', data.reviewer, data.reviewerPosition, data.assessedDate],
    ['Final Rating Approved By', data.approver, data.approverPosition, data.finalApprovedDate],
  ] : [
    ['Reviewed by', data.reviewer, data.reviewerPosition, data.reviewedDate],
    ['Approved by', data.approver, data.approverPosition, data.approvedDate],
  ]
  return (
    <table className="ipcr-signatures">
      <colgroup>{cells.map(([label], index) => (
        <Fragment key={label}>
          <col style={{ width: `${final ? [22, 24, 33][index] : 72 / cells.length}%` }} />
          <col style={{ width: `${final ? 7 : 28 / cells.length}%` }} />
        </Fragment>
      ))}</colgroup>
      <tbody>
        <tr>{cells.map(([label]) => (
          <Fragment key={label}><th scope="col">{label}</th><th scope="col">Date</th></Fragment>
        ))}</tr>
        <tr>{cells.map(([label, name, position, date]) => (
          <Fragment key={label}>
            <td className="ipcr-signatory">
              {final && label === 'Assessed by' && <p className="ipcr-certification">I certify that I discussed my assessment of the performance with the employee.</p>}
              <strong className="ipcr-signature-name">{name || '\u00a0'}</strong>
              <p>{position}</p>
            </td>
            <td className="ipcr-signature-date">{dateText(date)}</td>
          </Fragment>
        ))}</tr>
      </tbody>
    </table>
  )
}
function TableHead() {
  return <><colgroup>{[31,16.2,5,16.2,3.3,3.3,11.4,6.3,7.3].map((width, i) => <col key={i} style={{ width: `${width}%` }} />)}</colgroup><thead><tr><th rowSpan={2}>Output</th><th rowSpan={2}>Success Indicator<br />(Target + Measure)</th><th rowSpan={2}>Weight</th><th rowSpan={2}>Actual Accomplishment</th><th colSpan={4}>Rating</th><th rowSpan={2}>Remarks</th></tr><tr>{['Q1', 'E2', 'T3', 'AVERAGE'].map(label => <th key={label}>{label}</th>)}</tr></thead></>
}
function Source({ data }) {
  const final = finalRating(data)
  return <article className="ipcr-paper">
    <header className="ipcr-intro">
      <h1>INDIVIDUAL PERFORMANCE COMMITMENT AND REVIEW (IPCR) FORM</h1><h2>For Staff</h2>
      <p>I, <b><u>{data.name}</u></b>, of the <u>{data.agency}</u> of the <b><u>{data.office}</u></b> commit to deliver and agree to be rated on the attainment of the following targets in accordance with the indicated measures for the period <b>{data.period}</b>.</p>
      <div className="ipcr-ratee"><strong>{data.name.toUpperCase()}</strong><b>Ratee</b><p>Date: {dateText(data.employeeDate)}</p></div>
      <Signatures data={data} />
    </header>
    <table className="ipcr-target-table"><TableHead />
      <tbody className="ipcr-category"><tr><th>{data.category}</th><td /><th>{totalWeight(data)}%</th>{Array.from({length:6}, (_, i) => <td key={i} />)}</tr></tbody>
      {data.outputs.map((row, index) => <tbody key={row.id} className="ipcr-output-group">{dimensions.map((dimension, i) => <FragmentRows key={dimension} row={row} index={index} dimension={dimension} i={i} />)}</tbody>)}
    </table>
    <section className="ipcr-summary">
      <div className="ipcr-review">
      <table className="ipcr-rating-summary"><tbody><tr><th>FINAL AVERAGE RATING</th><td>{final === null ? '' : final.toFixed(2)}</td></tr><tr><th>ADJECTIVAL RATING</th><td>{adjectivalRating(final)}</td></tr></tbody></table>
      <div className="ipcr-comments"><strong>Comments and Recommendations for Development Purposes</strong><p>{data.comments}</p></div>
      </div>
      <Signatures data={data} final />
      <div className="ipcr-legend"><p><b>Legend:</b></p><p>1 - Effectiveness/Quality: The extent to which actual performance compares with targeted performance (can be measured by quantity). The degree to which objectives are achieved and the extent to which targeted problems are solved. In management, effectiveness relates to getting the right things done.</p><p>2 - Efficiency: The extent to which time or resources are used for the intended task or purpose. Measures whether targets are accomplished with a minimum amount or quantity of waste, expense, or unnecessary effort.</p><p>3 - Timeliness: Measures whether the deliverable was done on time based on the requirements of the law and/or clients/stakeholders. Time-related performance indicators evaluate such things as project completion deadlines, time management skills, and other time-sensitive expectations.</p></div>
    </section>
    <section className="ipcr-scale"><h2>Rating Scale:</h2><table><tbody>{ratingScale.map(([score, label, description]) => <tr key={score}><td>{score}</td><td>{label}</td><td>{description}</td></tr>)}</tbody></table></section>
  </article>
}
function FragmentRows({ row, index, dimension, i }) {
  const avg = averageRating(row)
  return <><tr className="ipcr-dimension">{i === 0 && <td rowSpan={6} className="ipcr-output">{index + 1}. {row.output}</td>}<th>{dimension}:</th><td>{i === 0 && `${row.weight || 0}%`}</td><td />{Array.from({length:5}, (_, n) => <td key={n} />)}</tr><tr><td className="ipcr-text">{row.targets[i] || '\u00a0'}</td><td /><td className="ipcr-text">{row.actuals[i] || '\u00a0'}</td>{row.ratings.map((rating, n) => <td key={n} className="ipcr-number">{n === i ? rating : ''}</td>)}<td className="ipcr-number">{i === 2 && avg !== null ? avg.toFixed(2) : ''}</td><td className="ipcr-number">{i === 2 && (row.remarks || (avg !== null && row.weight !== '' ? (avg * Number(row.weight) / 100).toFixed(2) : ''))}</td></tr></>
}
export default function IpcrDocument({ data }) {
  const sourceRef = useRef(null)
  const outputRef = useRef(null)
  const measureRef = useRef(null)
  useLayoutEffect(() => {
    let cancelled = false
    const paginate = () => {
      if (cancelled) return
      const source = sourceRef.current.firstElementChild
      const workspace = measureRef.current
      workspace.replaceChildren()
      const pages = []
      let page, table
      const newPage = () => {
        page = document.createElement('article')
        page.className = 'ipcr-paper'
        workspace.append(page)
        pages.push(page)
        table = null
      }
      const overflows = () => {
        const bottom = page.getBoundingClientRect().bottom - parseFloat(getComputedStyle(page).paddingBottom)
        return [...page.children].some(child => child.getBoundingClientRect().bottom > bottom)
      }
      const newTable = () => {
        table = source.querySelector('.ipcr-target-table').cloneNode(false)
        table.append(source.querySelector('colgroup').cloneNode(true))
        // Use the target table's columns, rather than the signature table's.
        table.replaceChildren(source.querySelector('.ipcr-target-table colgroup').cloneNode(true), source.querySelector('.ipcr-target-table thead').cloneNode(true))
        page.append(table)
      }
      newPage()
      page.append(source.querySelector('.ipcr-intro').cloneNode(true))
      newTable()
      for (const group of source.querySelectorAll('.ipcr-target-table > tbody')) {
        const clone = group.cloneNode(true)
        table.append(clone)
        if (overflows()) {
          clone.remove()
          if (!table.querySelector('tbody')) table.remove()
          newPage()
          newTable()
          table.append(clone)
        }
      }
      let summary = source.querySelector('.ipcr-summary').cloneNode(false)
      page.append(summary)
      // Keep ratings and comments together, but allow signatures and the legend
      // to continue on another page instead of moving the entire summary.
      for (const block of source.querySelector('.ipcr-summary').children) {
        const clone = block.cloneNode(true)
        summary.append(clone)
        if (overflows()) {
          clone.remove()
          if (!summary.children.length) summary.remove()
          newPage()
          summary = source.querySelector('.ipcr-summary').cloneNode(false)
          page.append(summary)
          summary.append(clone)
        }
      }
      const scale = source.querySelector('.ipcr-scale').cloneNode(true)
      page.append(scale)
      if (overflows()) {
        scale.remove()
        newPage()
        page.append(scale)
      }
      outputRef.current.replaceChildren(...pages)
    }
    paginate()
    document.fonts.ready.then(paginate)
    return () => { cancelled = true }
  }, [data])
  return <><div className="ipcr-pages" ref={outputRef} />{createPortal(<div aria-hidden="true" className="ipcr-measure"><div ref={sourceRef}><Source data={data} /></div><div ref={measureRef} /></div>, document.body)}</>
}
