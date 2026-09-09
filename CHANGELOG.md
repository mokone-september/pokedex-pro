# Changelog
All notable changes to this project will be documented in this file.
The format is based on Keep a Changelog
and this project follows Semantic Versioning.

---

## [Unreleased]
### Added
- Nothing yet.

---

## [0.4.0] - 2026-09-08
### Added
- `ErrorState` component: a reusable card with a message and a "Try again" button, styled with the app's semantic color tokens
- Homepage retry handling: retries whichever query actually failed — the Pokémon list, the type-filtered list, or any individual Pokémon detail fetch (previously, a failed detail fetch could silently show fewer cards with no visible error at all)
- `error.tsx` route-level error boundary for the Pokémon detail page, using Next.js's built-in convention, reusing the same `ErrorState` component
- "About" and "Contact" links added to the Navbar

### Changed
- `Navbar` and `Footer` moved into the root layout (`src/app/layout.tsx`) so both render consistently on every page instead of only the homepage; removed the now-duplicate inline `<Navbar />` from `HomePage`
- `PokemonSearch`, `PokemonSkeleton`, and `PokemonStats` converted from manual `_dark={{...}}` overrides to the same semantic-token convention (`bg.panel`, `border`) used everywhere else in the app
- Navbar's "Pokémon" link now points to `/` instead of the nonexistent `/pokemon` route

### Fixed
- **Favorites, preferences, and recently-viewed persistence never actually ran.** Each persistence module correctly called `syncObservable(...)`, but none of the three files were ever imported anywhere in the app, so that side effect never executed — all three stores silently reset on every page reload despite appearing to work within a single session. Fixed by importing all three persistence modules in `providers.tsx`. Caught by Greptile review; verified by manually reproducing the bug (favorite a Pokémon, hard-refresh, watch it reset) both before and after the fix.
- `Footer` was a fully built, tested component that was never actually rendered anywhere in the app.
- `/about` and `/contact` pages existed and rendered correctly, but had no navigation link pointing to them.

---

## [0.3.0] - 2026-09-02
### Added
- Favorites UI: heart toggle on Pokémon cards, backed by a centralized `toggleFavorite` in the favorites store
- Recently Viewed UI: automatically records a view when visiting a Pokémon's detail page, displayed on the homepage with per-item remove and "Clear all"
- Persistent user preferences: Pokémon type filter and sort order now persist across sessions via the `preferences` store
- Theme preference: light/dark/system toggle in the Navbar, powered by `next-themes`, persisted and mirrored into the `preferences` store
- Repository-specific Greptile automated review rules (`.greptile/rules.md`)
- Shared `PokemonTypeValue` type and `POKEMON_TYPES` constant (`src/lib/pokemon-types.ts`), used by both `PokemonFilters` and the preferences store
- `ResizeObserver` polyfill in test setup, needed for testing Chakra's positioned components (Menu, Popover, Tooltip)

### Changed
- `PokemonImage`: replaced Chakra v2-only `fallbackSrc` (which doesn't exist in Chakra UI v3) with an `onError`-based fallback that handles both missing and failed-to-load images
- Semantic color tokens (`fg`, `fg.muted`, `bg.panel`, `bg.muted`, `border`) applied across `Navbar`, `Footer`, the Pokémon detail page, About, Contact, and the 404 page, replacing hardcoded light-only colors so the whole app now supports dark mode consistently
- ESLint config now ignores `generated/**` (Prisma client output) and `next-env.d.ts`, removing 334 errors and 53 warnings that were false positives from linting auto-generated code

### Fixed
- Hydration mismatch in the theme toggle: the active theme icon now defers rendering until mount (`ClientOnly`), instead of guessing an icon during SSR and flipping it after hydration
- Type-widening bug in `PokemonFilters.test.tsx` (`defaultProps.type`/`sort` needed `as const` to satisfy tightened prop types)
- Minor `import/no-anonymous-default-export` warnings in `postcss.config.js` and `prettier.config.js`

---

## [0.2.0] - 2026-08-07
### Added
- Pokémon search
- Pokémon filtering
- PokéAPI integration
- React Query data fetching
- Loading skeletons
- Responsive layout
- Project branding
- SVG logo system
- CLAUDE.md
- GEMINI.md
- AGENT.md

### Changed
- Improved README documentation
- Updated navigation
- Improved component organization
- Better loading states
- Better caching

### Fixed
- Navbar export issue
- API request encoding
- TypeScript improvements
- ESLint fixes

---

## [0.1.0] - 2026-08-07
### Added
- Initial release
- T3 Stack setup
- Chakra UI
- Prisma
- tRPC
- Next.js App Router
- Pokémon listing
- Pokémon details
