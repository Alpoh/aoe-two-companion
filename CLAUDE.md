
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

Phase 2 (mock data & strategy list) is also done: `src/data/strategies.json`
(3 mock strategies), `src/components/BuildOrderCard.tsx`, and
`StrategiesScreen.tsx` renders the list. `tsc --noEmit` is clean; not yet
confirmed on-device.

Testing infra (TDD, see Coding rules below) was added after Phase 2: `jest`
+ `jest-expo` preset + `@testing-library/react-native` v13 +
`react-test-renderer` pinned to the exact React version (19.2.3 — later
majors require react ^19.3.0 and will break the install). `npm test` passes
with one retrofit test (`BuildOrderCard.test.tsx`). Phase 0-2 code predates
the TDD rule and isn't otherwise covered; going forward, all new code
(including the Phase 3 Timer bug fix) must be written test-first.

Phases 3-5 (timer, storage, polish) are not yet implemented — check
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
├── tsconfig.json
├── package.json             # name "aoe-two-companion", "license": "MIT"
├── LICENSE                  # MIT
├── CLAUDE.md
├── .gitignore                # node_modules, .expo, native dirs, .idea/, etc.
├── assets/                  # icon.png (iOS/general), android-icon-*.png
│                             #   (Android adaptive icon layers), favicon.png (unused, no web build)
├── docs/
│   └── PLAN_IMPLEMENTACION_AOE2.md
└── src/                      # populated phase by phase
    ├── screens/
    │   ├── Home/HomeScreen.tsx          # placeholder, Phase 2+ fills it in
    │   ├── Strategies/StrategiesScreen.tsx  # placeholder, Phase 2 adds the list
    │   └── Calculator/CalculatorScreen.tsx  # placeholder, Phase 3 adds the Timer
    ├── components/    # empty — Phase 2+ (BuildOrderCard, Timer)
    ├── data/          # empty — Phase 2 (strategies.json)
    ├── utils/         # empty — Phase 4 (storage.ts)
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
   fix — including the known Phase 3 Timer off-by-one bug, which should get
   a regression test before the fix. Test runner: `jest` (`jest-expo`
   preset) + `@testing-library/react-native`; run with `npm test`. Test
   files live next to the code they cover (`Foo.tsx` → `Foo.test.tsx`).
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
eas build --platform android   # production Android build
eas build --platform ios       # production iOS build
```

Web isn't set up (`react-dom`/`react-native-web` aren't installed) since the
plan targets mobile via Expo Go only.

## Explicitly out of scope (per the plan)

Detail/expand screens, search/filter by civilization, strategy categories
(Early/Mid/Late game), a real AoE2 stats API integration, user-added custom
strategies, timer notifications/alarms, dark/light theming, and
multi-language (ES/EN) support are all listed as future work beyond the
5 core phases — don't add them unless the user asks.
