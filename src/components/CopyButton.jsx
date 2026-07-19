import { useState } from 'react'
import { copyRichText } from '../logic/clipboard.js'

export default function CopyButton({ text, html }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (html) {
      await copyRichText(text, html)
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
