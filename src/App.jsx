import { useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle.jsx'
import GithubLink from './components/GithubLink.jsx'
import BarcodeBuilder from './components/BarcodeBuilder.jsx'

const TABS = [
  { id: 'binary', label: 'Binary code', base: 2 },
  { id: 'ternary', label: 'Ternary code', base: 3 },
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
    <main className="app">
      <header className="app-header">
        <div>
          <h1>Datetime Barcode</h1>
          <p className="subtitle">
            -&gt; 2026-07-15_21:08:56
            <br />
            -&gt; 011111101010-0111-01111_10101-001000-111000
            <br />
            -&gt; ▒▚▚▚▚▚▚▒▚▒▚▒ ▒▚▚▚ ▒▚▚▚▚ ▚▒▚▒▚ ▒▒▚▒▒▒ ▚▚▚▒▒▒
          </p>
        </div>
        <div className="header-actions">
          <GithubLink />
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </div>
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
            {tab.label}
          </button>
        ))}
      </div>

      {TABS.map((tab) => (
        <div key={tab.id} className="tab-panel" role="tabpanel" hidden={activeTabId !== tab.id}>
          <BarcodeBuilder base={tab.base} />
        </div>
      ))}
    </main>
  )
}
