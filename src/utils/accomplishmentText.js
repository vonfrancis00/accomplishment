// Plain strings remain supported for existing entries.
export const accomplishmentRuns = item => typeof item === 'string'
  ? [{ text: item }]
  : (item?.runs || [])

export const accomplishmentText = item => [
  accomplishmentRuns(item).map(run => run.text).join(''),
  ...(item?.subItems || []).map(accomplishmentText),
].join('\n')
