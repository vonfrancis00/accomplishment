export const dimensions = ['Quality', 'Efficiency', 'Timeliness']
export const ratingScale = [
  ['5', 'Outstanding', 'Performance represents an extraordinary level of achievement and commitment in terms of quality and time, technical skills and knowledge, ingenuity, creativity, and initiative. Employees at this performance level should have demonstrated exceptional job mastery in all major areas of responsibility. Employee achievement and contributions to the organization are of marked excellence.'],
  ['4', 'Very Satisfactory', 'Performance exceeded expectations. All goals, objectives, and targets were achieved above the established standards.'],
  ['3', 'Satisfactory', 'Performance met expectations in terms of quality of work, efficiency, and timeliness. The most critical annual goals were met.'],
  ['2', 'Unsatisfactory', 'Performance failed to meet expectations, and/or one or more of the most critical goals were not met.'],
  ['1', 'Poor', 'Performance was consistently below expectations, and/or reasonable progress toward critical goals was not made. Significant improvement is needed in one or more important areas.'],
]
export function newOutput() {
  return { id: crypto.randomUUID(), output: '', weight: '', targets: ['', '', ''], actuals: ['', '', ''], ratings: ['', '', ''], remarks: '' }
}
export function createIpcr() {
  return {
    name: 'Von Francis A. La Victoria', agency: 'Commission on Higher Education', office: 'Office of Commissioner Desiderio R. Apag III', period: 'January to June 2026', employeeDate: '',
    reviewer: 'Marvin Harrould A. Kho', reviewerPosition: 'Executive Assistant III', reviewedDate: '', approver: 'DESIDERIO R. APAG III, PCpE, D.Eng., ASEAN Eng.', approverPosition: 'Commissioner', approvedDate: '',
    discussedDate: '', assessedDate: '', finalApprovedDate: '', category: 'Support Operation to Educational Supervisor at MIS', comments: '',
    outputs: [
      { ...newOutput(), output: 'Programming', weight: '50', targets: ['Consistent with CHED rules and regulations.', 'Develop software systems integral to the implementation of the Digitalization Project.', 'Takes approximately 5-8 weeks, from planning and design to development, testing, and deployment.'], actuals: ['Consistent with CHED rules and regulations.', 'Developed the Communication Monitoring System and Document Registry System.', 'Development took approximately 10 weeks, from planning and design to testing and deployment.'], ratings: ['5', '3', '4'] },
      { ...newOutput(), output: 'IT Support', weight: '25', targets: ['Consistent with CHED rules and regulations.', 'Provide IT support to the Office of Commissioner Apag III.', 'IT support should aim for timely issue resolution, typically responding within minutes to hours for urgent issues.'], actuals: ['Consistent with CHED rules and regulations.', 'Provided technical assistance and addressed IT-related inquiries about office systems.', 'Typically responded to IT-related inquiries and requests for technical assistance within minutes.'], ratings: ['5', '4', '5'] },
      { ...newOutput(), output: 'Picture and Video Editing', weight: '25', targets: ['Consistent with CHED rules and regulations.', 'Document official travel by taking photos and videos during events, meetings, engagements, and other activities requiring visual coverage.', 'Complete travel documentation, including photos and videos, within 1-3 days.'], actuals: ['Consistent with CHED rules and regulations.', 'Documented official travel, meetings, and events by taking photos and videos.', 'Provided photo and video documentation during events and official travel as needed.'], ratings: ['5', '5', '4'] },
    ],
  }
}
export const averageRating = row => row.ratings.every(value => value !== '' && Number(value) >= 1 && Number(value) <= 5) ? row.ratings.reduce((sum, value) => sum + Number(value), 0) / 3 : null
export const totalWeight = data => data.outputs.reduce((sum, row) => sum + Number(row.weight || 0), 0)
export function finalRating(data) {
  if (Math.abs(totalWeight(data) - 100) > 0.001 || data.outputs.some(row => averageRating(row) === null || row.weight === '')) return null
  return data.outputs.reduce((sum, row) => sum + averageRating(row) * Number(row.weight) / 100, 0)
}
export const adjectivalRating = value => value === null ? '' : value >= 4.5 ? 'Outstanding' : value >= 3.5 ? 'Very Satisfactory' : value >= 2.5 ? 'Satisfactory' : value >= 1.5 ? 'Unsatisfactory' : 'Poor'
