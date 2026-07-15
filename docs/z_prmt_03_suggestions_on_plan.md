# Suggestions to Improve z_plan_01 (structure, sequence, execution efficiency)

Suggestions raised during plan review, 2026-07-14. Each is marked with its current status, since the plan was subsequently revised (folder change, Bun switch).

## 1. Overlap dependency install with code writing

**Suggestion:** Don't treat scaffold + install as a blocking first step. None of the source files depend on `node_modules` existing — only running tests and the dev server does. Kick off the install in the background and write all pure logic, tests, symbol data, components, and CSS while it runs.

**Status:** Mostly obsolete after the switch to Bun — `bun install` takes seconds, not minutes, so there is little dead-time left to overlap.

## 2. One install, not two

**Suggestion:** The original plan ran `npm install` and later `npm i -D vitest` — two network round-trips. Add the test dependency to `package.json` before the first install so there is only one.

**Status:** Obsolete — `bun test` is built into Bun, so there is no test dependency to install at all.

## 3. Skip the boilerplate smoke-test

**Suggestion:** The original plan verified the Vite counter demo runs before pruning it. That is a wasted dev-server round-trip; the unit tests are the first meaningful signal. Prune immediately after scaffolding and run the dev server only once, at the end, for the real checklist.

**Status:** Applied to the plan.

## 4. Simplify the prefers-color-scheme check

**Suggestion:** Browser automation cannot easily flip the OS color-scheme emulation the way a human in DevTools can. Since the initial-theme-follows-system logic is a single `matchMedia` line, verify it by code review plus checking the toggle works both ways in the browser — cheaper and just as convincing.

**Status:** Applied to the plan (checklist item 5).

## 5. Batch browser verification into one session

**Suggestion:** Walk the entire UI checklist in a single dev-server + single Chrome tab pass, in flow order (glyphs → assign → type datetime → translate → toggle theme → switch to Legacy Computing for the warning), with two screenshots (light and dark) rather than one per item.

**Status:** Applied to the plan.

## Structural assessment

No structural changes recommended. The logic/data/components split, all-state-in-App ownership, and result-object error handling are appropriately sized for this app; adding more (context, reducers, custom hooks) would be speculative.
