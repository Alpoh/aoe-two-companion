
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

Phase 0 (setup) is done: Expo/TypeScript project scaffolded, navigation deps
installed, `src/{screens,components,data,utils,styles}` created, `App.tsx`
shows the placeholder screen, `LICENSE` (MIT) and this `CLAUDE.md` exist.
Phases 1-5 (navigation, mock data, timer, storage, polish) are not yet
implemented — check `docs/PLAN_IMPLEMENTACION_AOE2.md`'s checkboxes and
`git log` for current progress before assuming what's done.

## What this project is

A React Native (Expo) mobile app for Age of Empires 2: build-order strategies
per civilization, a visual countdown timer for following build-order timings,
and locally-persisted favorites.

**Stack:** React Native + Expo + TypeScript + React Navigation (bottom tabs) + AsyncStorage

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
