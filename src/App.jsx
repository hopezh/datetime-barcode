import { useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle.jsx'
import GithubLink from './components/GithubLink.jsx'
import BarcodeBuilder from './components/BarcodeBuilder.jsx'
import ExampleSubtitle from './components/ExampleSubtitle.jsx'
import PageFooter from './components/PageFooter.jsx'

const TABS = [
  { id: 'binary', label: 'Binary', base: 2 },
  { id: 'ternary', label: 'Ternary', base: 3 },
  { id: 'quaternary', label: 'Quaternary', base: 4 },
  { id: 'quinary', label: 'Quinary', base: 5 },
  { id: 'senary', label: 'Senary', base: 6 },
  { id: 'septenary', label: 'Septenary', base: 7 },
  { id: 'nonary', label: 'Nonary', base: 9 },
  { id: 'decimal', label: 'Decimal', base: 10 },
]

export default function App() {
  const [theme, setTheme] = useState(() =>
    matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const [activeTabId, setActiveTabId] = useState(TABS[0].id)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <main className="frame">
      <nav>
        <span className="wordmark">Datetime Barcode</span>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </div>
      </nav>

      <header className="hero">
        <div>
          <p className="meta">datetime · base 2–10 · unicode symbols</p>
          <h1>
            A date and time,
            <br />
            written in eight bases,
            <br />
            <span className="accent">drawn as a barcode</span>.
          </h1>
          <p className="lede">
            Convert any moment into a fixed-width digit string in base 2 to 10, assign each digit a
            Unicode symbol and a color — and read the result as a barcode.
          </p>
          <GithubLink />
        </div>
        <aside>
          <ExampleSubtitle />
        </aside>
      </header>

      <div className="tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTabId === tab.id}
            className={`tab${activeTabId === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            {/* Masked span (not <img>) so the icon follows the tab's text color in both themes. */}
            <span className="tab-icon" style={{ maskImage: `url(dice-${tab.base}.svg)` }} />
            {tab.label}
          </button>
        ))}
      </div>

      {TABS.map((tab) => (
        <div key={tab.id} className="tab-panel" role="tabpanel" hidden={activeTabId !== tab.id}>
          <BarcodeBuilder base={tab.base} />
        </div>
      ))}

      <PageFooter />
    </main>
  )
}
