# Datetime Barcode

A minimalistic web app that converts a datetime string into fixed-width binary, then renders that binary as a "barcode" made of Unicode block-element symbols you pick to represent 0 and 1.

Each datetime component is encoded with a fixed bit width — year 12, month 4, day 5, hour 5, minute 6, second 6 — with `-` between fields and `_` between the date and time halves. Example:

```
2026-07-14_23:12:00  →  011111101010-0111-01110_10111-001100-000000
```

Built with React + Vite (plain JSX, no TypeScript), run with [Bun](https://bun.sh). No other runtime dependencies.

## How to run the app

Requires Bun.

```
bun install
bun run dev
```

Then open http://localhost:5173.

Other commands:

- `bun test` — run the unit tests
- `bun run build` — production build into `dist/`
- `bun run preview` — serve the built `dist/` locally

## How to use the app

1. Pick a symbol set from the dropdown (Block Elements is the default; Legacy Computing is experimental and may not render with default fonts).
2. Assign symbols to 0 and 1: click a slot button (`0 =` or `1 =`), then click a glyph in the grid. After each pick the other slot arms automatically, so two grid clicks complete the setup. Assigned glyphs show a highlight ring and a small 0/1 badge.
3. Type a datetime as `YYYY-MM-DD_hh:mm:ss` — the binary translation updates live as you type, with an error message for malformed input.
4. Click **Translate** to render the barcode. Separators become spaces so the fields read as groups.
5. Use the toggle in the header to switch between dark and light mode (the initial theme follows your system preference).

Switching symbol sets clears the 0/1 assignments, since the assigned glyphs may not exist in the new set.

## Structure of the app

```
datetime-barcode/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx             # bootstrap
    ├── App.jsx              # owns all state; composes components; Translate button
    ├── index.css            # theme tokens + all styles
    ├── logic/               # pure functions, zero React imports
    │   ├── datetimeBinary.js    # parse + fixed-width binary encoding
    │   ├── datetimeBinary.test.js
    │   ├── barcode.js           # binary → symbol substitution
    │   └── barcode.test.js
    ├── data/
    │   └── symbolSets.js        # curated Unicode symbol sets
    └── components/
        ├── ThemeToggle.jsx
        ├── SymbolSetPicker.jsx
        ├── SymbolGrid.jsx
        ├── ZeroOneAssigner.jsx
        ├── DatetimeInput.jsx
        └── CodeDisplay.jsx
```

State lives entirely in `App.jsx` (props down, callbacks up). The `logic/` modules return result objects (`{ ok, ... }`) instead of throwing, since malformed input is an expected state while typing.

## References

- [Block Elements](https://en.wikipedia.org/wiki/Block_Elements) — U+2580–259F
- [Box Drawing](https://en.wikipedia.org/wiki/Box_Drawing) — U+2500–257F
- [Geometric Shapes](https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)) — U+25A0–25FF
- [Symbols for Legacy Computing](https://en.wikipedia.org/wiki/Symbols_for_Legacy_Computing) — U+1FB00–1FB3B (sextants)
- [Vite](https://vite.dev/) · [React](https://react.dev/) · [Bun](https://bun.sh/)
