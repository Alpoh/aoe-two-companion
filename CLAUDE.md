
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Phase 0 (setup) is done and committed (`baseline.`, `fix code in plan.` on
`main`): Expo/TypeScript project scaffolded, navigation deps installed,
`src/{screens,components,data,utils,styles}` created, `LICENSE` (MIT) and
this `CLAUDE.md` exist.

Phase 1 (basic navigation) is also done: `src/screens/{Home,Strategies,
Calculator}/*Screen.tsx` are placeholder screens, `App.tsx` wraps
`NavigationContainer` + `createBottomTabNavigator` wiring all 3 tabs
(Inicio/Estrategias/Calculadora), `tsc --noEmit` is clean, and it's been
verified end-to-end on physical iOS and Android devices via Expo Go (tabs
render and switch correctly). Not yet committed to git.

Phase 2 (mock data & strategy list) is done and committed: `src/data/
strategies.json` (3 mock strategies), `src/components/BuildOrderCard.tsx`,
and `StrategiesScreen.tsx` renders the list. Verified via `tsc --noEmit`,
`npm run lint`, and tests; not explicitly confirmed on a physical device.

Testing infra (TDD, see Coding rules below) was added alongside Phase 2:
`jest` + `jest-expo` preset + `@testing-library/react-native` v13 +
`react-test-renderer` pinned to the exact React version (19.2.3 — later
majors require react ^19.3.0 and will break the install). Two tests exist:
`BuildOrderCard.test.tsx` (retrofit) and `StrategiesScreen.test.tsx` (a
`jest.mock()` example — mocks `strategies.json` and the `BuildOrderCard`
child component to test the screen in isolation; note it aliases `Text` to
`MockText` on import rather than `require()`-ing it inside the factory, to
satisfy both Jest's mock-hoisting rules and ESLint without a suppression
comment, which rule 2 below forbids). Phase 0-1 code predates the TDD rule
and isn't covered.

ESLint (`eslint-config-expo`) and a pre-commit quality gate (`husky` +
`lint-staged`: `eslint --fix`, the no-comments check, `tsc --noEmit`, full
test suite) were also added alongside Phase 2 — see Coding rules below.
Prettier was added after that (`.prettierrc.json`: single quotes, semicolons,
trailing commas, 100 print width — chosen to match the code already
written) with `eslint-config-prettier` disabling ESLint's conflicting
stylistic rules; `lint-staged` runs `eslint --fix` then `prettier --write`
on staged `*.{ts,tsx}`. `.prettierignore` excludes `*.md` and `.idea`/`.claude`
so prose/tooling config isn't auto-reformatted.
**Gotcha already hit once:** Node here is nvm-managed (`~/.nvm`), which
isn't on the restricted `PATH` GUI git clients (WebStorm) use for hooks, so
the hook originally failed with `npx: not found` when committing from the
IDE. Fixed by sourcing `$NVM_DIR/nvm.sh` at the top of `.husky/pre-commit`
— don't remove that.

Phase 2, the testing/lint/pre-commit infra, and Prettier are all committed
(`7e63e51`, `b466d78`, `05426c6` "add prettier." — HEAD was at version
`1.0.3` last checked). **The user often commits directly via WebStorm's git
UI, not through an assistant session — always check `git log`/`git status`
fresh rather than trusting a prior session's account of what's committed.
Also: never run `git commit` or `git push` in this repo without the user's
explicit go-ahead for that specific commit, regardless of how "done" the
work looks.**

Phase 3 (visual timer) is done, written test-first per Coding rule 1:
`src/utils/time.ts` (`parseTimeToSeconds`/`formatSeconds`, not in the
original plan template — added to fix the bug below) + `time.test.ts`;
`src/components/Timer.tsx` + `Timer.test.tsx` (uses `jest.useFakeTimers()`);
`CalculatorScreen.tsx` renders the Timer wired to `strategies[0].timing`
(not a hardcoded `"14:30"` like the plan's template) + a test mocking both
`strategies.json` and `Timer`. **The known off-by-one-tick bug from the
plan's original template is fixed**, with a regression test
(`Timer.test.tsx`: "stops exactly at 0:00 and calls onComplete once, with
no extra tick") — the fix was switching the countdown's internal state from
a re-parsed `"mm:ss"` string to a plain number of seconds. Version bumped
to `1.0.4`, not yet committed.

Phases 4-5 (storage, polish) are not yet implemented — check
`docs/PLAN_IMPLEMENTACION_AOE2.md`'s checkboxes and `git log` for current
progress before assuming what's done.

No Android SDK/`adb` is installed on the dev machine, so `npm run android`
fails with `spawn adb ENOENT`. Testing happens via Expo Go on physical
devices (`npm start` + scan QR) instead of local emulators — don't suggest
installing Android Studio/SDK or a Docker-based Android emulator unless
asked; Docker was already considered and isn't worth the setup friction over
Expo Go, and iOS simulation isn't possible in Docker at all (Xcode/macOS
only).

### Current on-disk structure

```
aoe-two-companion/
├── App.tsx                  # NavigationContainer + bottom-tab navigator (Phase 1)
├── app.json                 # Expo config — name/slug still default "expo-scaffold"
├── index.ts                 # Expo entry point (registers App)
├── tsconfig.json            # includes "types": ["jest"] for test globals
├── eslint.config.js         # eslint-config-expo flat config + eslint-config-prettier
├── .prettierrc.json         # single quotes, semi, trailing commas, printWidth 100
├── .prettierignore          # excludes *.md, .idea, .claude, node_modules, dist
├── package.json             # name "aoe-two-companion", "license": "MIT", v1.0.4(+)
├── LICENSE                  # MIT
├── CLAUDE.md
├── .gitignore                # node_modules, .expo, native dirs, .idea/, etc.
├── .husky/
│   └── pre-commit            # lint-staged + tsc --noEmit + jest, sources nvm first
├── scripts/
│   └── check-no-comments.js  # enforces Coding rule 2 via the TS scanner API
├── assets/                  # icon.png (iOS/general), android-icon-*.png
│                             #   (Android adaptive icon layers), favicon.png (unused, no web build)
├── docs/
│   ├── PLAN_IMPLEMENTACION_AOE2.md
│   └── CHANGELOG.md
└── src/                      # populated phase by phase
    ├── screens/
    │   ├── Home/HomeScreen.tsx          # placeholder, Phase 5 fills it in
    │   ├── Strategies/StrategiesScreen.tsx      # Phase 2: renders BuildOrderCard list
    │   │   └── StrategiesScreen.test.tsx        # jest.mock() example
    │   └── Calculator/
    │       ├── CalculatorScreen.tsx      # Phase 3: renders Timer w/ strategies[0].timing
    │       └── CalculatorScreen.test.tsx
    ├── components/
    │   ├── BuildOrderCard.tsx + .test.tsx  # Phase 2
    │   └── Timer.tsx + .test.tsx            # Phase 3, off-by-one bug fixed
    ├── data/
    │   └── strategies.json  # Phase 2, 3 mock strategies
    ├── utils/
    │   └── time.ts + .test.ts  # Phase 3: mm:ss <-> seconds, not in original plan
    └── styles/        # empty — Phase 5 (colors.ts)
```

`app.json`'s `name`/`slug` are still the `create-expo-app` defaults
(`expo-scaffold`) — renaming them to the project's real name is a pending
step, not yet assigned to a specific phase in the plan doc.

## What this project is

A React Native (Expo) mobile app for Age of Empires 2: build-order strategies
per civilization, a visual countdown timer for following build-order timings,
and locally-persisted favorites.

**Stack:** React Native + Expo + TypeScript + React Navigation (bottom tabs) + AsyncStorage

## Coding rules

These are strict and apply to all code written in this repo from here on,
regardless of phase:

1. **TDD.** Write the failing test first, then the minimum code to make it
   pass, then refactor. This applies to any new component, utility, or bug
   fix — every future change, no exceptions (Phase 3's Timer, including its
   now-fixed off-by-one bug, was built this way: see Project status above).
   Test runner: `jest` (`jest-expo` preset) + `@testing-library/react-native`;
   run with `npm test`. Test files live next to the code they cover
   (`Foo.tsx` → `Foo.test.tsx`).
2. **Clean code, no comments.** Code must be self-explanatory through naming
   and structure — no exceptions, not even for non-obvious logic; if logic
   needs explaining, refactor or rename until it doesn't. Do not write `//`
   or `/* */` comments, docblocks, or commented-out code anywhere in
   `src/`, `App.tsx`, or test files.
3. **Version bump per phase.** After finishing and verifying a phase (its
   checklist in `docs/PLAN_IMPLEMENTACION_AOE2.md` is satisfied), bump the
   version in `package.json` (patch bump, e.g. `1.0.0` → `1.0.1`) and run
   `npm install` so `package-lock.json` picks up the new version — do this
   before committing that phase's work.

## Implementation plan

Implementation must follow `docs/PLAN_IMPLEMENTACION_AOE2.md`, which breaks
the build into 6 sequential phases, each with explicit success criteria to
verify before moving to the next:

0. **Setup & base structure** — scaffold Expo/TS project, create
   `src/{screens,components,data,utils,styles}`, minimal `App.tsx`.
1. **Basic navigation** — bottom-tab navigator wiring 3 empty screens
   (Home, Strategies, Calculator).
2. **Mock data & strategy list** — `src/data/strategies.json` + reusable
   `BuildOrderCard` component rendering a scrollable list.
3. **Visual timer** — reusable `Timer` component (start/pause/reset,
   `mm:ss` countdown) integrated into the Calculator screen.
4. **Local storage** — `@react-native-async-storage/async-storage` wrapper
   (`src/utils/storage.ts`) for persisting favorited strategies, wired into
   `BuildOrderCard`.
5. **Polish / UI-UX** — centralized color palette (`src/styles/colors.ts`,
   AoE2 gold/brown theme) applied across screens and navigator chrome.

Each phase is meant to be small, independently testable, and verified
against its checklist in the plan doc before proceeding — do not skip ahead
or batch multiple phases into one change without the user's direction.

### Planned architecture (per the plan doc)

- `App.tsx` — root component, wraps `NavigationContainer` +
  `createBottomTabNavigator` with 3 tabs (Home / Strategies / Calculator).
- `src/screens/<Name>/<Name>Screen.tsx` — one folder per tab screen.
- `src/components/` — reusable presentational components (`BuildOrderCard`,
  `Timer`), kept decoupled from navigation and storage specifics where
  possible.
- `src/data/strategies.json` — static mock data for civilizations/strategies
  (id, civ, strategy, timing, steps); the intended seam for a future
  real data source or API.
- `src/utils/storage.ts` — AsyncStorage read/write helpers for favorites,
  keyed under `@aoe2_favorites`.
- `src/styles/colors.ts` — shared color tokens, introduced in Phase 5 and
  referenced by screens/navigator instead of inlined hex values.

## Commands

```bash
npm install             # install dependencies
npm start               # start Expo dev server (Metro), scan QR with Expo Go
npm start -- --clear    # start with cache cleared
npm run android         # start targeting Android
npm run ios             # start targeting iOS (macOS only)
npm test                # run the Jest test suite once
npm run test:watch      # run Jest in watch mode (use during TDD)
npm run lint            # ESLint (eslint-config-expo)
npm run format          # Prettier --write .
npm run format:check    # Prettier --check . (no writes)
eas build --platform android   # production Android build
eas build --platform ios       # production iOS build
```

Web isn't set up (`react-dom`/`react-native-web` aren't installed) since the
plan targets mobile via Expo Go only.

## Changelog

`docs/CHANGELOG.md` tracks notable changes per version (Keep a Changelog
style). Update it alongside the version bump in Coding rule 3.

## Explicitly out of scope (per the plan)

Detail/expand screens, search/filter by civilization, strategy categories
(Early/Mid/Late game), a real AoE2 stats API integration, user-added custom
strategies, timer notifications/alarms, dark/light theming, and
multi-language (ES/EN) support are all listed as future work beyond the
5 core phases — don't add them unless the user asks.
