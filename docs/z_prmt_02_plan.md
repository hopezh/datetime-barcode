# Plan: Datetime → Binary → Unicode Barcode Web App

## Context

The `unicode-ui` repo is a playground for Unicode-based graphic UI (currently just a README and a CSS demo). Per `z_prmt_01_gen_plan.md`, build a minimalistic web app that converts a datetime string into fixed-width binary, then renders that binary as a "barcode" using user-selected Unicode block-element symbols for 0 and 1. The app lives in its own folder, `datetime-barcode/`, at the repo root — keeping the root clean for notes and future experiments.

Decisions confirmed with the user:
- **Binary rule:** fixed-width per component — year 12 bits, month 4, day 5, hour 5, minute 6, second 6; separators (`-` `_` `:`) preserved. Canonical example: `2026-07-14_23:12:00` → `011111101010-0111-01110_10111-001100-000000` (note: 2026 = `011111101010`, leading zero).
- **No three.js / R3F / drei in this iteration** — pure React DOM + CSS, plain JavaScript (JSX).
- **Symbol sets are curated static data** baked into a module — no runtime Wikipedia fetching.
- **Bun** as package manager, script runner, and test runner (no npm, no Vitest). Vite remains the build tool/dev server — Bun replaces Node/npm underneath it, which is the supported configuration.
- Dark/light toggle required; symbols must render with default system fonts on Windows/macOS/Linux.

## Scaffolding

Vite + React JS template (CRA is deprecated; Next.js is overkill), scaffolded and driven with Bun:

```
bun --version   # confirm Bun is installed before anything else
cd C:\Users\ZHANG_JI\Downloads\dev\unicode-ui
bun create vite datetime-barcode --template react
cd datetime-barcode
bun install
```

The Vite template ships its own `.gitignore` (node_modules, dist) inside `datetime-barcode/`, so the repo-root `.gitignore` needs no changes.

Prune boilerplate immediately after scaffolding — no smoke-test of the counter demo (the unit tests are the first meaningful signal): delete `src/assets/` and `src/App.css` (all styles in `src/index.css`), strip the counter demo. The dev server runs only once, at the end, for the real checklist.

## File layout

```
datetime-barcode/
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx             # Vite default bootstrap
    ├── App.jsx              # owns ALL app state; composes components; hosts Translate button
    ├── index.css            # theme tokens + all styles
    ├── logic/
    │   ├── datetimeBinary.js    # parse + encode — pure, zero React imports
    │   ├── datetimeBinary.test.js
    │   ├── barcode.js           # binary → barcode substitution — pure
    │   └── barcode.test.js
    ├── data/
    │   └── symbolSets.js        # curated static symbol sets
    └── components/
        ├── ThemeToggle.jsx
        ├── SymbolSetPicker.jsx  # native <select> dropdown
        ├── SymbolGrid.jsx       # grid of symbols in selected set
        ├── ZeroOneAssigner.jsx  # two slot buttons: assign symbol to 0 / 1
        ├── DatetimeInput.jsx    # input + validation message
        └── CodeDisplay.jsx      # labeled monospace display — reused for binary AND barcode
```

No context, no reducers, no custom hooks — the app is too small to warrant them.

## Pure-logic API

**`src/logic/datetimeBinary.js`**
- `FIELD_WIDTHS = { year: 12, month: 4, day: 5, hour: 5, minute: 6, second: 6 }`
- `parseDatetime(input)` → `{ ok: true, parts } | { ok: false, error }` — regex `/^(\d{4})-(\d{2})-(\d{2})_(\d{2}):(\d{2}):(\d{2})$/` plus range checks (month 1–12, day 1–31, hour 0–23, min/sec 0–59). Deliberately not leap-year/month-length aware — this is an encoder, not a calendar.
- `datetimeToBinary(input)` → `{ ok: true, binary } | { ok: false, error }` — separators preserved at original positions.
- `toBinary(value, width)` — `value.toString(2).padStart(width, '0')`.
- Result objects, not exceptions: malformed input is an expected state while typing; UI renders `error` text directly.

**`src/logic/barcode.js`**
- `binaryToBarcode(binary, zeroSymbol, oneSymbol)` — `'0'` → zeroSymbol, `'1'` → oneSymbol, separators → single space (reads as field gaps; avoids thin ASCII glyphs among wide blocks).

## State ownership (all in App.jsx, props down / callbacks up)

- `theme` ('light'|'dark'), `selectedSetId`, `zeroSymbol`, `oneSymbol`, `assignTarget` ('zero'|'one' — which slot the next grid click fills), `datetimeInput`, `barcode` (set only on Translate click).
- `binaryResult = datetimeToBinary(datetimeInput)` derived per render — binary display updates live as the user types; no useMemo needed.
- Changing symbol set **clears** zeroSymbol/oneSymbol (they may not exist in the new set).
- Grid click assigns to the armed slot, then auto-arms the other slot (two clicks = full 0/1 setup). Assigned symbols get a highlight ring + small 0/1 badge.
- Translate button (in App, not its own component): disabled unless `binaryResult.ok && zeroSymbol && oneSymbol`.
- Layout: single column — header + ThemeToggle, picker, grid, assigner, input, binary display, button, barcode display.

## Dark/light mode

CSS custom properties on `:root` (light) with `:root[data-theme="dark"]` override: `--bg --fg --surface --border --accent`. Initial theme from `matchMedia('(prefers-color-scheme: dark)')` in the useState initializer; a `useEffect` sets `document.documentElement.dataset.theme`. No persistence, no libraries in v1.

## Symbol set data (`src/data/symbolSets.js`)

`SYMBOL_SETS = [{ id, name, experimental, symbols }]`; symbols generated with a `codepointRange(start, end)` helper (the safe ranges are fully-assigned printable blocks).

| id | Range | Count | Notes |
|---|---|---|---|
| `blockElements` (default) | U+2580–259F | 32 | best barcode material; universal font coverage |
| `boxDrawing` | U+2500–257F | 128 | full coverage in default monospace fonts on all 3 OSes |
| `geometricShapes` | U+25A0–25FF | 96 | Segoe UI Symbol / Apple Symbols / DejaVu |
| `legacyComputing` | U+1FB00–1FB3B (sextants) | 60 | named "(experimental)"; one-line rendering warning shown above grid when selected — poor default-font coverage |

## Verification

**Unit tests (`bun test`, `src/logic/` only):** Bun's built-in Jest-compatible runner — no test dependency to install. Test files import `describe`/`it`/`expect` from `bun:test`; script `"test": "bun test"`.
- `datetimeBinary.test.js`: canonical example verbatim; padding (07→`0111`, 00→`000000`); year 4095 → twelve 1s; rejects wrong shape / month 13 / day 00 / hour 24 / empty; separators preserved.
- `barcode.test.js`: substitution, separators → space, empty → empty.

**UI checklist — one `bun run dev` session, one Chrome tab, walked in flow order** (screenshots in light and dark, not per item):
1. Default set renders 32 glyphs, no tofu.
2. Two-click assign works with auto-arm; badges/rings show.
3. Live binary for `2026-07-14_23:12:00`; error + disabled button on malformed input.
4. Translate produces barcode with spaced separators.
5. Theme toggle both ways. (Initial prefers-color-scheme default is one `matchMedia` line — verify by code review, not browser emulation.)
6. Switching sets clears 0/1 assignments; experimental warning appears for Legacy Computing set.

**Implementation order:** scaffold + prune → `bun install` → pure logic + `bun test` green → symbol data → theme tokens + App skeleton → picker/grid/assigner → input/displays/translate wiring → single-session UI checklist.
