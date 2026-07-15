# Datetime Barcode

**Live app: https://hopezh.github.io/datetime-barcode/**

A minimalistic web app that converts a date and time into a fixed-width binary string, then renders that binary as a "barcode" made of two Unicode symbols you pick to represent 0 and 1.

Each datetime component is encoded with a fixed bit width — year 12, month 4, day 5, hour 5, minute 6, second 6 — with `-` between fields and `_` between the date and time halves.

Example:

```
-> 2026-07-15_21:08:56
-> 011111101010-0111-01111_10101-001000-111000
-> ▒▚▚▚▚▚▚▒▚▒▚▒ ▒▚▚▚ ▒▚▚▚▚ ▚▒▚▒▚ ▒▒▚▒▒▒ ▚▚▚▒▒▒
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
- `bun run lint` — lint with oxlint

Pushes to `main` deploy the app to [GitHub Pages](https://hopezh.github.io/datetime-barcode/) via `.github/workflows/deploy.yml`.

## How to use the app

The app walks through five labeled steps:

1. **Specify the date and time** — a date picker plus three 24-hour dropdowns for hour, minute, and second. It defaults to the moment the app loaded.
2. **Convert to binary** — click **Convert** to encode the datetime as the fixed-width binary string.
3. **Pick the symbols for zero and one** — click a slot button (`0 =` or `1 =`) to arm it, then click a glyph in the grid below. After each pick the other slot arms automatically, so two grid clicks complete the setup.
4. **Select symbol set** — choose which Unicode block the grid shows (Block Elements, Box Drawing, Geometric Shapes, or the experimental Legacy Computing sextants, which may not render with default fonts). Assignments survive switching sets, so the 0 and 1 symbols can come from different sets.
5. **Convert the binary string to barcode** — click **Translate** to render the barcode. Separators become spaces so the fields read as groups.

Each output (datetime, binary, barcode) has a copy button. The toggle in the header switches between dark and light mode; the initial theme follows your system preference.

## Structure of the app

```
datetime-barcode/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── qr-code.svg          # theme-aware favicon
└── src/
    ├── main.jsx             # bootstrap
    ├── App.jsx              # owns all state; composes the five steps
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
        ├── CopyButton.jsx
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
