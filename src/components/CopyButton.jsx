import { useState } from 'react'

// When html is provided, rich-text targets (PowerPoint, Word) paste it
// with colors; plain-text targets fall back to text.
export default function CopyButton({ text, html }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (html) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([text], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' }),
        }),
      ])
    } else {
      await navigator.clipboard.writeText(text)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button type="button" className="copy-button" disabled={!text} onClick={copy}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
