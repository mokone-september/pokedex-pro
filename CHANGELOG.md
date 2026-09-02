# Changelog
All notable changes to this project will be documented in this file.
The format is based on Keep a Changelog
and this project follows Semantic Versioning.

---

## [Unreleased]
### Added
- Nothing yet.

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
