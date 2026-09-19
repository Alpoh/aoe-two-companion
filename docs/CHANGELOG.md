# Changelog

All notable changes to this project are documented here. Versions follow
`package.json`; format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added

- `jest.mock()` example: `StrategiesScreen.test.tsx` mocks `strategies.json`
  and `BuildOrderCard` to test the screen's rendering logic in isolation.
  Version bump to `1.0.2` pending commit alongside this.

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
