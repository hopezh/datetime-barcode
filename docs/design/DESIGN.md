# DESIGN.md — Hairline Grid System

A dark, flat, editorial-technical design system for content-dense reference
interfaces: dictionaries, documentation, dashboards, catalogs, spec sheets.
Derived from a study of aihero.dev's dictionary page; adapted, not copied.

**One-line identity:** a single continuous ruled sheet — near-black surfaces
divided by perfectly uniform 1px hairlines, zero corners, zero shadows, one
warm accent, and a strict sans/mono voice split.

**Companion file:** `hairline-grid-design-spec.html` is a live, rendered
example of every rule in this document. When a rule here is ambiguous, the
HTML file is the tiebreaker.

---

## 1. Design principles (the "why" layer)

These govern any case the tokens below don't explicitly cover.

1. **Structure is drawn, not implied.** Every region of the page is framed by
   hairlines. Headings, cards, nav, and footer all share the same ruled
   system — nothing floats in unmarked space.
2. **Depth is whisper-quiet.** All surfaces live in a narrow lightness band
   (Lab 3%–13%). Elevation is expressed only by a one-step background shift,
   never by shadows, borders brightening, or scale.
3. **Flatness is a decision.** `border-radius: 0` and `box-shadow: none`
   everywhere, including inputs, buttons, images, and modals. Do not "soften"
   new components with radius — that breaks the system.
4. **Two voices, strict roles.** The sans face speaks content; the mono face
   speaks metadata (labels, counts, values, eyebrows, code). A string of text
   is never both.
5. **One accent, used like punctuation.** The accent appears in small doses:
   a highlighted phrase, `#` marks, focus rings, an active state. It never
   fills large areas and never becomes a second surface color.
6. **Restraint is the effect.** When adding a new component, the default
   answer to "should it animate / glow / lift?" is no. Interaction feedback
   is a background-color change and nothing else.

---

## 2. Color tokens

All neutrals are true greys (zero chroma), specified in Lab lightness with
sRGB hex approximations for tools that need them.

| Token             | Value                | ≈ Hex     | Role                                   |
|-------------------|----------------------|-----------|----------------------------------------|
| `--background`    | `lab(3% 0 0)`        | `#0b0b0b` | Page background AND card/cell fill     |
| `--surface-raised`| `lab(7% 0 0)`        | `#151515` | Code blocks, chips, input fills        |
| `--surface-hover` | `lab(9% 0 0)`        | `#191919` | Hover/active fill for interactive cells|
| `--border`        | `lab(13% 0 0)`       | `#222222` | Every hairline, without exception      |
| `--fg-muted`      | `lab(73% 0 0)`       | `#b3b3b3` | Body copy, icons, secondary text       |
| `--fg`            | `lab(88% 0 0)`       | `#dddddd` | Titles, headings, primary text         |
| `--accent`        | `lab(82.6% 15.9 66.4)`| `#ffc04b`| The only chromatic color (see rule)    |

**Rules & rationale**

- **Text is never pure white.** `--fg` tops out at 88% lightness; on a
  near-black page, `#ffffff` reads harsh and vibrates. If a new component
  seems to need brighter text, the surface behind it is wrong, not the text.
- **The surface ladder is closed.** Do not invent intermediate greys. New
  components must map to one of the four surface steps (3 / 7 / 9 / 13%).
- **The accent hue is a placeholder by intent.** The amber is inherited from
  the source study and is its most identifiable trait. When this system is
  adopted for a real product, swap the hue first (keep lightness ≈ 80–85%
  and moderate chroma so it still reads on `--background`); all other tokens
  stay.
- **Semantic states** (success/warning/danger), if ever needed, follow the
  accent recipe: one hue each at ~80% Lab lightness, used only for text and
  thin indicators — never as fills.

---

## 3. Typography

**Faces**

- Sans (content): `Geist`, fallback `ui-sans-serif, system-ui, sans-serif`
- Mono (metadata): `Geist Mono`, fallback `ui-monospace, 'SF Mono',
  'Cascadia Mono', Consolas, monospace`
- Acceptable substitutions preserving the role split: Inter + JetBrains Mono,
  or any neutral grotesque + humanist mono pair. Never serif.

**Scale** (desktop; scale down ~0.8× under 640px)

| Role          | Size  | Weight | Tracking  | Leading | Color        | Face |
|---------------|-------|--------|-----------|---------|--------------|------|
| Display / h1  | 60px  | 400    | −1.5px    | 1.05    | `--fg`       | sans |
| Section h2    | 24px  | 600    | −0.6px    | 1.33    | `--fg`       | sans |
| Card title h3 | 20px  | 600    | −0.4px    | 1.20    | `--fg`       | sans |
| Body          | 14–16px| 400   | 0         | 1.5–1.62| `--fg-muted` | sans |
| Lede          | 17px  | 400    | 0         | 1.6     | `--fg-muted` | sans |
| Meta label    | 11px  | 400    | +0.08em, UPPERCASE | 1.4 | `--fg-muted` | mono |
| Meta value    | 12–13px| 400   | 0–0.06em  | 1.4     | `--fg-muted` | mono |

**Rules & rationale**

- **Large type is light.** The display size uses weight 400, not 600/700.
  Bold at 60px shouts like a landing page; regular reads refined. Weight 600
  is reserved for 20–24px headings.
- **Negative tracking scales with size:** −1.5px at 60px → −0.6px at 24px →
  −0.4px at 20px → none at body sizes. Never letter-space body copy.
- **Mono = chrome.** Eyebrows, counts ("16 terms"), token values, code,
  keyboard hints, timestamps. If a human reads it as a sentence, it's sans;
  if a machine could have printed it, it's mono.
- Accent color inside headings highlights at most one phrase per viewport.

---

## 4. Layout & the hairline grid (the core construction rule)

**The rule:** dividing lines between grid cells are NEVER per-card borders.
They are produced by the container:

```css
.hairline-grid {
  display: grid;
  gap: 1px;                     /* the "border width" */
  background: var(--border);    /* the "border color" */
}
.hairline-grid > * {
  background: var(--background); /* cells mask the container */
}
```

**Rationale:** per-card borders double where cards touch, drift at corners,
and break on responsive reflow. With the gap technique the geometry itself
guarantees uniform, single-thickness lines at any column count. This rule
applies to every multi-cell region: card grids, swatch strips, stat rows,
pricing tables, image galleries.

**Page frame**

- Max content width: **1180px**, centered, with 1px left/right frame borders
  so the sheet reads as a bounded object.
- Outer edges of grids get explicit 1px top/bottom borders in `--border`.
- Horizontal padding inside framed regions: **32px** (24px under 640px).

**Section pattern**

Sections are stacked framed bands, each composed of:

1. **Section header row** — not a floating heading: a flex row with the h2
   left and a mono meta (count/label) right, `padding: 20px 32px`,
   1px bottom hairline. The header belongs to the grid.
2. **Content band** — a `.hairline-grid` (cards, swatches, spec rows) or a
   full-width block (code, list) sharing the same hairlines.

**Responsive rule:** adapt by column count only (1 → 2 → 3/6 at 640/960px).
Never change the divider technique, padding language, or introduce radius at
any breakpoint.

---

## 5. Components

### 5.1 Card (primary unit — "term card")

- The entire card is one `<a>` (whole-surface link), `display: flex`,
  `flex-direction: column`, `gap: 12px`, `padding: 28px`.
- **Title row:** h3 (20px/600/−0.4px) left; a 16px ↗ arrow icon right,
  colored `--fg-muted`, stroke ~1.5px.
- **Description:** 14px `--fg-muted`, leading 1.62, clamped to exactly
  **3 lines** (`-webkit-line-clamp: 3`). Rationale: the clamp — not equal
  content length — is what keeps grid rows visually even.
- Optional **spec footer:** mono meta value pinned to the bottom
  (`margin-top: auto`).
- No border, no radius, no shadow on the card itself, ever.

### 5.2 Section header

Flex row, `align-items: flex-end`, `justify-content: space-between`,
`padding: 20px 32px`, 1px bottom hairline. Left: h2. Right: mono meta.

### 5.3 Hero

Two-column at ≥860px (≈1.3fr / 1fr) split by a 1px hairline. Left: mono
eyebrow, display h1 (one accent phrase), muted lede capped ~44ch. Right: a
vertical mono index of anchor links, each prefixed by an accent `#`; panel
may carry a faint 45° repeating-line texture at ~lab(5.5%) for material
interest (the only permitted "decoration").

### 5.4 Navigation bar

Single row, `padding: 18px 32px`, 1px bottom hairline. Left: wordmark
(sans 600, −0.02em). Right: mono meta labels/links. No fills, no pills.

### 5.5 Inputs & buttons

- Input: `--surface-raised` fill or transparent, 0 radius, no visible border
  until focus; mono placeholder at 13–14px; height ~56px for primary search.
- Button (if needed): sans 600 14px label; default = text + hairline frame;
  primary = `--accent` text or thin accent underline. Never a filled amber
  slab; the accent is punctuation, not paint.
- Focus (all interactive elements): `outline: 1px solid var(--accent);
  outline-offset: -1px`. Visible keyboard focus is required.

### 5.6 Code block

`--surface-raised` fill, mono 12.5px, leading 1.7, `padding: 24px 32px`,
full-bleed within its band. Syntax accents: comments ~lab(45%), keys `--fg`,
values `--accent`.

### 5.7 Rule list

Full-width rows separated by 1px hairlines; each row = accent mono `→`
marker + 14px muted text with bold `--fg` lead-in phrase.

---

## 6. Interaction & motion

- **The one-property hover:** interactive cells transition only
  `background-color` from `--background` to `--surface-hover` over
  **150ms ease**. Icons may brighten `--fg-muted` → `--fg` in the same
  transition. Nothing else moves, scales, lifts, or glows.
- Links in chrome (nav, hero index): color-only hover, `--fg-muted` → `--fg`.
- Respect `prefers-reduced-motion: reduce` by disabling all transitions.
- No scroll-triggered animation, no parallax, no skeleton shimmer.

---

## 7. Spacing tokens

| Token        | Value | Use                                    |
|--------------|-------|-----------------------------------------|
| `--hairline` | 1px   | All dividers and frames                 |
| gap-card     | 12px  | Vertical rhythm inside a card           |
| pad-card     | 28px  | Card padding (24px under 640px)         |
| pad-x        | 32px  | Horizontal padding of framed bands      |
| pad-header   | 20px 32px | Section header rows                 |
| pad-hero     | 64px 32px | Hero panels                         |
| max-w        | 1180px| Page frame                              |

---

## 8. Do / Don't

**Do**

- Build every multi-cell layout with the gap-px hairline grid.
- Keep all copy in the muted/foreground two-step; clamp card copy to 3 lines.
- Use mono for anything a machine could have printed.
- Add new components by mapping them onto the existing surface ladder and
  hairline frame.
- Vary rhythm with asymmetric spans (`grid-column: span 2` feature cells)
  for a truer bento — the hairline system holds automatically.

**Don't**

- Don't add border-radius, box-shadow, gradients (beyond the hero texture),
  or filled accent areas.
- Don't put borders on cards or brighten borders on hover.
- Don't use pure white (`#fff`) or pure black (`#000`) anywhere.
- Don't letter-space body text or bold the display size.
- Don't introduce a second chromatic color for decoration.

---

## 9. Adaptation notes (mimic, don't copy)

This system's *principles* are portable; three moves make it yours:

1. **Swap the accent hue** — the amber is the source's fingerprint.
2. **Swap the type pairing** while keeping the sans/mono role split.
3. **Vary the grid rhythm** — asymmetric spans, a 3-column base, or mixed
   cell heights — while keeping hairlines, the surface ladder, clamped copy,
   and one-property hovers intact.
