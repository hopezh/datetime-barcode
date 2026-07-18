const REFERENCE_ROWS = [
  {
    label: 'numeral systems',
    links: [
      ['binary', 'https://en.wikipedia.org/wiki/Binary_number'],
      ['ternary', 'https://en.wikipedia.org/wiki/Ternary_numeral_system'],
      ['quaternary', 'https://en.wikipedia.org/wiki/Quaternary_numeral_system'],
      ['quinary', 'https://en.wikipedia.org/wiki/Quinary'],
      ['senary', 'https://en.wikipedia.org/wiki/Senary'],
    ],
  },
  {
    label: 'symbol sets',
    links: [
      ['block elements', 'https://en.wikipedia.org/wiki/Block_Elements'],
      ['box drawing', 'https://en.wikipedia.org/wiki/Box_Drawing'],
      ['geometric shapes', 'https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)'],
      ['legacy computing', 'https://en.wikipedia.org/wiki/Symbols_for_Legacy_Computing'],
    ],
  },
  {
    label: 'built with',
    links: [
      ['vite', 'https://vite.dev/'],
      ['react', 'https://react.dev/'],
      ['bun', 'https://bun.sh/'],
    ],
  },
  {
    label: 'design',
    links: [['aihero.dev/ai-coding-dictionary', 'https://www.aihero.dev/ai-coding-dictionary']],
  },
]

export default function PageFooter() {
  return (
    <footer className="page-buffer">
      {REFERENCE_ROWS.map((row) => (
        <p key={row.label} className="footer-row">
          <span className="meta">{row.label}</span>
          {row.links.map(([name, href], i) => (
            <span key={name}>
              {i > 0 && <span className="footer-sep">· </span>}
              <a href={href} target="_blank" rel="noreferrer">
                {name}
              </a>
            </span>
          ))}
        </p>
      ))}
    </footer>
  )
}
