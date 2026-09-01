# Browser Parity Evidence — 2026-09-01T08:44:21.799Z

**Do not commit artefacts** — this file is generated local evidence per task 9.

## Environment

- Browser: Google Chrome 151.0.7922.174 (via Playwright Chromium 151.0.7922.34 / chromium-1234)
- Playwright: 1.62.1
- Chromium (Playwright): 151.0.7922.34 (Playwright chromium-1234)
- Node: v26.4.0
- Base URL: http://localhost:5174
- Dev server: http://localhost:5174 (LISTENING, PID 48568 via netstat, vp run playground#dev)
- Date: 2026-09-01T08:44:21.799Z

## Routes (200 verification)

| Route                  | HTTP | Title                         | HTML class | Screenshots |
| ---------------------- | ---- | ----------------------------- | ---------- | ----------- |
| `/`                    | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/surfaces` | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/button`   | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/dialog`   | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/popover`  | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/calendar` | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/tooltip`  | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/backdrop` | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/popup`    | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |
| `/components/input`    | 200  | Cladd Vue · Visual laboratory | `dark`     | dark/light  |

## Checks

### Dark/Light theme tokens

- dark tokens: bg=#0f0f0f, fg=oklch(from #fff 0.9 0 h)
- light tokens: bg=#fff, fg=oklch(0.32 0 0)
- CSS has :root/.dark/.light/cladd-color/bg/fg: {"hasRoot":true,"hasDark":true,"hasLight":true,"hasCladdColor":true,"hasBg":true,"hasFg":true,"hasImportColors":true}

### Overlay lifecycle (dialog)

```json
{
  "triggerFound": true,
  "overlayOpened": true,
  "focusReturned": true,
  "enterFrameVisible": true,
  "closeFrameVisible": true
}
```

- Enter/open/close frames captured: `dialog-open.png`, `dialog-closed.png` (and dark/light per route).
- Focus return after dialog close: PASS — focus returned to trigger
- Happy-dom lifecycle also covered: `vp run cladd-vue#test -- --run tests/foundations/overlayLifecycle.test.ts` → 10 tests passed (see terminal output).

### Narrow viewport (320px)

- narrow-/components/dialog: {"hasHScroll":false,"minWidth":"320px","overflow":"visible","scrollWidth":320,"innerWidth":320}
- narrow-/components/button: {"hasHScroll":false,"minWidth":"320px","overflow":"visible","scrollWidth":320,"innerWidth":320}
- narrow-/components/calendar: {"hasHScroll":false,"minWidth":"320px","overflow":"visible","scrollWidth":320,"innerWidth":320}
- Screenshots: `*-320.png` confirm no clipping; body min-width is 320px by design.

### Reduced motion

- prefers-reduced-motion: reduce matched = true
- CSS contains `prefers-reduced-motion`: true
- Overlay durations locked (browserEvidence.test.ts): dialogHidden=scale-75 opacity-0 duration-200, dialogOpened=scale-100 opacity-100 duration-500; reduced-motion fast path synthetically completes transition (overlayLifecycle.test.ts).
- Screenshot: `dialog-reduced-motion.png`

### Calendar keyboard grid navigation

```json
{
  "gridRendered": true,
  "selectedAccent": false,
  "keyboardNav": true,
  "gridHTML": "<div class=\"cladd-calendar\" data-part=\"calendar\" data-show-today=\"true\" data-size=\"md\"><!--v-if--><div class=\"dp--main dp--theme-dark dp--flex-display\" data-datepicker-instance=\"\" enable-time-picker=\"false\" hide-input-icon=\"\"><div><!----><!----></div><div class=\"dp--outer-menu-wrap\"><div aria-label=\"Datepicker menu\" class=\"dp--menu dp--relative cladd-calendar__menu text-cladd-xs dp--theme-dark\"><!----><!----><div class=\"\" style=\"--dp-menu-width: 196px;\"><!----><!----><div class=\"dp--instance-calendar\"><div class=\"dp--menu-inner\"><div class=\"\"><div class=\"dp--header-wrap\"><div class=\"dp--month-year-wrap\"><div class=\"flex min-h-8 w-full items-center\" data-part=\"caption\"><span class=\"pl-2 font-semibold text-cladd-fg text-cladd-xs\">September 2026</span><div class=\"cladd-surface relative cladd-surface-level-4 text-cladd-fg cladd-toolbar flex rounded-full ml-auto\"><div class=\"cladd-surface__background pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-cladd-surface-h"
}
```

- Grid rendered: YES
- Selected accent class present: pending — date not selected in default state
- Keyboard ArrowRight moved focus: YES
- Happy-dom calendar already covered: `calendar.test.ts` 8 tests passed.

## Files

- Screenshots: `plans/evidence/screenshots/` and `packages/ui/docs/evidence/screenshots/` (mirrored)
- DOM dumps: `plans/evidence/*.html` (per route, truncated to 200k) and mirrored to `packages/ui/docs/evidence/`
- JSON report: `browser-parity-report.json` in both evidence dirs

## Alternative verification (when headless capture unavailable)

- `curl -s -o NUL -w "%{http_code}" http://localhost:5174/components/dialog` → 200 (and for all routes above, via Node spawnSync curl.exe)
- `chrome --headless --dump-dom http://localhost:5174/components/dialog` → shows `<html class="dark">` and Tailwind tokens; validated via Playwright evaluate getComputedStyle
- Tests: `vp run cladd-vue#test -- --run` → 210 tests passed including `overlayLifecycle.test.ts` (10), `browserEvidence.test.ts` (3), `calendar.test.ts` (8)

## Notes / Issues

- Dev server kept running on :5174 (PID via netstat). Do NOT stop.
- Popover/Tooltip overlay families share same lifecycle contract as Dialog; Dialog evidence is representative. Screenshot coverage includes popover/tooltip routes (dark/light).
- If focus-return flaky in headless, happy-dom unit test `focusTrap.test.ts` (14 tests) is authoritative for the contract.
