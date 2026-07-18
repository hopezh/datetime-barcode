# Datetime Barcode

**Live app: https://hopezh.github.io/datetime-barcode/**

A minimalistic web app that converts a date and time into a fixed-width digit string in base 2–6, then renders that string as a "barcode" made of Unicode symbols you pick to represent each digit. Five tabs — **Binary**, **Ternary**, **Quaternary**, **Quinary**, and **Senary**, each marked with a dice icon showing its base — offer the same five-step flow, one per base.

Each datetime component is encoded with a fixed digit width, with `-` between fields and `_` between the date and time halves:

- binary (bits): year 12, month 4, day 5, hour 5, minute 6, second 6
- ternary (trits): year 8, month 3, day 4, hour 3, minute 4, second 4
- quaternary: year 6, month 2, day 3, hour 3, minute 3, second 3
- quinary: year 6, month 2, day 3, hour 2, minute 3, second 3
- senary: year 5, month 2, day 2, hour 2, minute 3, second 3

Example:

```
------------> 2026-07-15_21:08:59

binary     -> 011111101010-0111-01111_10101-001000-111011
           -> ▒▚▚▚▚▚▚▒▚▒▚▒ ▒▚▚▚ ▒▚▚▚▚ ▚▒▚▒▚ ▒▒▚▒▒▒ ▚▚▚▒▚▚

ternary    -> 02210001-021-0120_210-0022-2012
           -> ▖██▀▖▖▖▀ ▖█▀ ▖▀█▖ █▀▖ ▖▖██ █▖▀█

quaternary -> 133222-13-033_111-020-323
           -> ▄▟▟▐▐▐ ▄▟ ▁▟▟ ▄▄▄ ▁▐▁ ▟▐▟

quinary    -> 031101-12-030_41-013-214
           -> ▘▓▌▌▘▌ ▌░ ▘▓▘ ▇▌ ▘▌▓ ░▌▇

senary     -> 13214-11-23_33-012-135
           -> ▝▛▐▝▙ ▝▝ ▐▛ ▛▛ ▂▝▐ ▝▛█
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

Pick a tab for the base you want, then walk through its five labeled steps (each tab keeps its own state):

1. **Specify the date and time** — a date picker plus three 24-hour dropdowns for hour, minute, and second. It defaults to the moment the app loaded.
2. **Convert to the chosen base** — click **Convert** to encode the datetime as the fixed-width digit string.
3. **Pick symbols and colors for each digit** — click a slot button (one per digit: `0 =` and `1 =` for binary, up to `5 =` for senary) to arm it, then click a glyph in the grid below. After each pick the next slot arms automatically, so one grid click per digit completes the setup. The color picker under each slot tints that digit's symbol. Or click **Randomize symbols** to fill every slot with distinct random symbols drawn from the three non-experimental sets, and **Randomize colors** to assign each digit a distinct color from a palette that stays readable in both themes.
4. **Select symbol set** — choose which Unicode block the grid shows (Block Elements, Box Drawing, Geometric Shapes, or the experimental Legacy Computing sextants, which may not render with default fonts). Assignments survive switching sets, so the digit symbols can come from different sets.
5. **Convert the digit string to barcode** — click **Translate** to render the barcode, with each symbol shown in its digit's color. Separators become spaces so the fields read as groups.

Each output (datetime, digit string, barcode) has a copy button. The toggle in the header switches between dark and light mode; the initial theme follows your system preference.

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
    ├── App.jsx              # theme + tab switching; renders one BarcodeBuilder per tab
    ├── index.css            # theme tokens + all styles
    ├── logic/               # pure functions, zero React imports
    │   ├── datetimeCode.js      # parse + fixed-width encoding in a given base
    │   ├── datetimeCode.test.js
    │   ├── barcode.js           # digit string → symbol substitution
    │   └── barcode.test.js
    ├── data/
    │   └── symbolSets.js        # curated Unicode symbol sets
    └── components/
        ├── BarcodeBuilder.jsx   # the five-step flow, parameterized by base
        ├── ThemeToggle.jsx
        ├── GithubLink.jsx
        ├── CopyButton.jsx
        ├── SymbolSetPicker.jsx
        ├── SymbolGrid.jsx
        ├── DigitAssigner.jsx
        ├── DatetimeInput.jsx
        └── CodeDisplay.jsx
```

Per-tab state lives in each `BarcodeBuilder` instance (props down, callbacks up); all tabs stay mounted so switching preserves their state. The `logic/` modules return result objects (`{ ok, ... }`) instead of throwing, since malformed input is an expected state while typing.

## References

- Numeral systems: [binary](https://en.wikipedia.org/wiki/Binary_number) · [ternary](https://en.wikipedia.org/wiki/Ternary_numeral_system) · [quaternary](https://en.wikipedia.org/wiki/Quaternary_numeral_system) · [quinary](https://en.wikipedia.org/wiki/Quinary) · [senary](https://en.wikipedia.org/wiki/Senary)
- [Block Elements](https://en.wikipedia.org/wiki/Block_Elements) — U+2580–259F
- [Box Drawing](https://en.wikipedia.org/wiki/Box_Drawing) — U+2500–257F
- [Geometric Shapes](https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)) — U+25A0–25FF
- [Symbols for Legacy Computing](https://en.wikipedia.org/wiki/Symbols_for_Legacy_Computing) — U+1FB00–1FB3B (sextants)
- [Vite](https://vite.dev/) · [React](https://react.dev/) · [Bun](https://bun.sh/)
