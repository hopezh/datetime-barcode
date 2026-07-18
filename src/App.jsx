import { useEffect, useState } from 'react'
import ThemeToggle from './components/ThemeToggle.jsx'
import GithubLink from './components/GithubLink.jsx'
import BarcodeBuilder from './components/BarcodeBuilder.jsx'
import ExampleSubtitle from './components/ExampleSubtitle.jsx'

const TABS = [
  { id: 'binary', label: 'Binary code', base: 2 },
  { id: 'ternary', label: 'Ternary code', base: 3 },
  { id: 'quaternary', label: 'Quaternary code', base: 4 },
  { id: 'quinary', label: 'Quinary code', base: 5 },
  { id: 'senary', label: 'Senary code', base: 6 },
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
          <ExampleSubtitle />
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
