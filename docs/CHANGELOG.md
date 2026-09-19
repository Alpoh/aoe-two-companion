# Changelog

All notable changes to this project are documented here. Versions follow
`package.json`; format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- Phase 4: local favorites storage. `src/utils/storage.ts` wraps
  `@react-native-async-storage/async-storage` (`getFavorites`/`addFavorite`/
  `removeFavorite`/`isFavorite`, keyed under `@aoe2_favorites`) + tests;
  `BuildOrderCard` shows a star button (☆/⭐) that toggles a strategy's
  favorite status and persists it; `StrategiesScreen` now passes each
  strategy's `id` through.

Version bump to `1.0.5` pending commit alongside this.

## [1.0.4] - 2026-09-19 (commit `721d288` "phase 3.")

### Added

- Phase 3: visual countdown timer. `src/utils/time.ts` (`parseTimeToSeconds`/
  `formatSeconds`, new — not in the original plan template) + tests;
  `src/components/Timer.tsx` (start/pause/reset) + tests using
  `jest.useFakeTimers()`; `CalculatorScreen` renders it wired to
  `strategies[0].timing` instead of a hardcoded value, + a test.

### Fixed

- Timer off-by-one-tick bug from the plan's original template: the
  countdown no longer takes one extra tick to stop after reaching `0:00`.
  Root cause was re-parsing a `"mm:ss"` string every tick; fixed by keeping
  the countdown state as a plain number of seconds. Covered by a regression
  test in `Timer.test.tsx`.

## [1.0.3] - 2026-09-19 (commit `05426c6` "add prettier.")

### Added

- Prettier (`.prettierrc.json`, `.prettierignore`) with `eslint-config-prettier`
  wired into ESLint and `lint-staged`; `npm run format`/`format:check` added;
  whole codebase reformatted to a consistent style (no logic changes).

## [1.0.2] - 2026-09-19 (commit `b466d78` "phase 2.")

### Added

- `jest.mock()` example: `StrategiesScreen.test.tsx` mocks `strategies.json`
  and `BuildOrderCard` to test the screen's rendering logic in isolation.

## [1.0.1] - 2026-09-19 (commit `7e63e51`)

### Added

- Phase 2: mock strategy data (`src/data/strategies.json`), reusable
  `BuildOrderCard` component, `StrategiesScreen` renders the list.
- TDD setup: `jest` + `jest-expo` preset + `@testing-library/react-native`,
  with a first test for `BuildOrderCard`.
- ESLint (`eslint-config-expo`) via `npm run lint`.
- Pre-commit quality gate (`husky` + `lint-staged`): `eslint --fix`, a
  custom no-comments check (`scripts/check-no-comments.js`), `tsc --noEmit`,
  and the full test suite, all gated on every commit.
- `CLAUDE.md` "Coding rules": TDD, zero comments in `src/`/`App.tsx`/tests,
  and a version bump + `npm install` after each completed phase.

## [1.0.0] - 2026-09-19

### Added

- Phase 0: Expo + TypeScript project scaffold, `src/{screens,components,
  data,utils,styles}` structure, `LICENSE` (MIT), `CLAUDE.md`.
- Phase 1: bottom-tab navigation (`App.tsx`) wiring the Home, Strategies,
  and Calculator screens.
