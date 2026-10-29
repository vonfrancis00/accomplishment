import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Bold, Italic, Plus, X } from 'lucide-react'
import { accomplishmentRuns } from '../utils/accomplishmentText.js'

export default function AccomplishmentEditor({ value, onChange, label, placeholder, isSubBullet = false }) {
  const editorRef = useRef(null)
  const savedRange = useRef(null)
  const renderedValue = useRef(null)
  const [active, setActive] = useState({ bold: false, italic: false })

  useLayoutEffect(() => {
    const editor = editorRef.current
    // Local edits already live in the DOM. Rebuilding on blur invalidates the
    // highlighted range before a toolbar button can use it.
    if (renderedValue.current === value) return
    renderedValue.current = value
    savedRange.current = null
    editor.replaceChildren(...accomplishmentRuns(value).map(run => {
      const span = document.createElement('span')
      span.textContent = run.text
      if (run.bold) span.style.fontWeight = 'bold'
      if (run.italic) span.style.fontStyle = 'italic'
      return span
    }))
  }, [value])

  const rememberSelection = () => {
    const selection = window.getSelection()
    if (selection.rangeCount && editorRef.current.contains(selection.anchorNode) && editorRef.current.contains(selection.focusNode)) {
      savedRange.current = selection.getRangeAt(0).cloneRange()
      setActive({ bold: document.queryCommandState('bold'), italic: document.queryCommandState('italic') })
    }
  }

  useEffect(() => {
    // Covers mouse drags, double clicks, keyboard selections, and touch handles.
    document.addEventListener('selectionchange', rememberSelection)
    return () => document.removeEventListener('selectionchange', rememberSelection)
  }, [])

  const save = () => {
    const runs = []
    const visit = (node, bold = false, italic = false) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent) runs.push({ text: node.textContent, bold, italic })
        return
      }
      if (node.nodeName === 'BR') {
        runs.push({ text: '\n', bold, italic })
        return
      }
      const weight = node.style?.fontWeight
      const nextBold = weight ? weight === 'bold' || Number(weight) >= 600 : bold || ['B', 'STRONG'].includes(node.nodeName)
      const nextItalic = node.style?.fontStyle ? node.style.fontStyle === 'italic' : italic || ['I', 'EM'].includes(node.nodeName)
      if (['DIV', 'P'].includes(node.nodeName) && runs.length && !runs.at(-1).text.endsWith('\n')) runs.push({ text: '\n', bold, italic })
      node.childNodes.forEach(child => visit(child, nextBold, nextItalic))
    }
    editorRef.current.childNodes.forEach(node => visit(node))
    const nextValue = { runs, subItems: value?.subItems || [] }
    renderedValue.current = nextValue
    onChange(nextValue)
    rememberSelection()
  }

  const format = command => {
    rememberSelection()
    const range = savedRange.current?.cloneRange()
    editorRef.current.focus()
    if (range && editorRef.current.contains(range.commonAncestorContainer)) {
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
    }
    document.execCommand(command)
    save()
  }

  return (
    <div className="min-w-0 flex-1 space-y-2">
    <div className="min-w-0 flex-1 overflow-hidden rounded-[7px] border border-[#d7dfe8] bg-[#fcfdfe] focus-within:border-navy-500 focus-within:shadow-[0_0_0_3px_#122a4a18]">
      <div role="group" aria-label={`Formatting for ${label}`} className="flex gap-1 border-b border-[#d7dfe8] bg-slate-50 px-2 py-1">
        {[['bold', Bold, 'Bold', 'B'], ['italic', Italic, 'Italic', 'I']].map(([command, Icon, title, shortcut]) => (
          <button key={command} type="button" title={`${title} (Ctrl+${shortcut})`} aria-label={title} aria-pressed={active[command]}
            onPointerDown={event => {
              rememberSelection()
              // Keep the highlighted text focused while pressing the toolbar.
              event.preventDefault()
            }} onClick={() => format(command)}
            className={`rounded p-1.5 text-[#294c73] hover:bg-slate-200 focus-visible:outline-2 ${active[command] ? 'bg-slate-200' : ''}`}>
            <Icon size={16} />
          </button>
        ))}
      </div>
      <div ref={editorRef} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label={label}
        data-placeholder={placeholder} className="accomplishment-editor min-h-[84px] resize-y overflow-auto whitespace-pre-wrap break-words px-3 py-[11px] text-[13px] leading-normal text-[#29394e] outline-none"
        onInput={save} onBlur={save} onMouseUp={rememberSelection} onKeyUp={rememberSelection}
        onPaste={event => {
          event.preventDefault()
          document.execCommand('insertText', false, event.clipboardData.getData('text/plain'))
          save()
        }}
        onKeyDown={event => {
          if ((event.ctrlKey || event.metaKey) && ['b', 'i'].includes(event.key.toLowerCase())) {
            event.preventDefault()
            format(event.key.toLowerCase() === 'b' ? 'bold' : 'italic')
          }
        }} />
    </div>
    {!isSubBullet && (
      <>
        {(value?.subItems || []).length > 0 && (
          <ul className="ml-6 list-[circle] space-y-2 pl-4 marker:text-[#294c73]">
            {value.subItems.map((subItem, subIndex) => (
              <li key={subIndex}>
                <div className="flex items-start gap-2">
                  <AccomplishmentEditor
                    isSubBullet
                    value={subItem}
                    label={`Sub-bullet ${subIndex + 1} for ${label}`}
                    placeholder={`Sub-bullet ${subIndex + 1}`}
                    onChange={next => onChange({
                      runs: accomplishmentRuns(value),
                      subItems: value.subItems.map((item, index) => index === subIndex ? next : item),
                    })}
                  />
                  <button type="button" aria-label={`Remove sub-bullet ${subIndex + 1} for ${label}`}
                    className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                    onClick={() => onChange({ runs: accomplishmentRuns(value), subItems: value.subItems.filter((_, index) => index !== subIndex) })}>
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-[#294c73] hover:text-navy-900"
          onClick={() => onChange({ runs: accomplishmentRuns(value), subItems: [...(value?.subItems || []), ''] })}>
          <Plus size={14} /> Add sub-bullet
        </button>
      </>
    )}
    </div>
  )
}
