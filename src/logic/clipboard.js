// Rich-text targets (PowerPoint, Word) paste the HTML with colors;
// plain-text targets fall back to text.
export function copyRichText(text, html) {
  return navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
      'text/html': new Blob([html], { type: 'text/html' }),
    }),
  ])
}
