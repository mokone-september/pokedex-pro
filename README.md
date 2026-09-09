# Pokédex Pro

<div align="center">

<img
  src="public/logo.svg"
  width="120"
  alt="Pokédex Pro Logo"
/>

# Pokédex Pro

A modern, production-focused Pokédex built with Next.js, TypeScript, Chakra UI, TanStack Query, and Legend-State.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-3-319795?logo=chakraui)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery)
![Legend-State](https://img.shields.io/badge/Legend--State-3.x-4CAF50)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 📖 Overview

Pokédex Pro is a modern Pokémon application built to demonstrate practical frontend engineering patterns and scalable application architecture.

The project combines server-state management, local-first client state, typed APIs, reusable UI components, testing, and a structured Git workflow.

The goal is not simply to build another Pokédex, but to create a portfolio-quality application that demonstrates how a modern TypeScript application can be designed, tested, and evolved over time.

---

## ✨ Features

### ✅ Current

- 🔍 Pokémon search
- 📦 PokéAPI integration
- ⚡ TanStack Query caching
- 🏷️ Pokémon type filtering
- 🔀 Pokémon sorting
- 📄 Pokémon detail pages
- 📊 Pokémon statistics
- 🧩 Pokémon type display
- 🖼️ Pokémon image handling
- 🎨 Chakra UI components
- 📱 Responsive layout
- 🛡️ TypeScript
- 🧪 Vitest + React Testing Library
- ❤️ Favorites UI with working persistence
- 🕘 Recently Viewed UI with working persistence
- ⚙️ Persistent user preferences (type filter, sort order) with working persistence
- 🌙 Theme preference (light/dark/system) with working persistence
- 💾 Legend-State local-first persistence
- 🌓 Dark mode support across the entire app (semantic color tokens throughout)
- 🧭 Navbar and Footer rendered consistently on every page, with Home/Pokémon/About/Contact navigation
- 🔁 Error states with retry actions, on both the homepage and the Pokémon detail page
- 🔐 Better Auth foundation
- 🗄️ Prisma database foundation
- 🔌 tRPC server foundation

### 🚧 In Progress

- 🗂️ Empty-state polish (search-with-no-results messaging)
- ♿ Accessibility pass
- ⌨️ Keyboard navigation

### 🔮 Planned

- 🔗 Evolution chains
- ✨ Pokémon abilities
- 📜 Pokémon moves
- 🌐 Offline-first improvements
- 🔄 Local-to-server synchronization
- 👤 User-specific favorites
- 📱 Improved mobile experience
- ⚡ Performance optimization
- 📊 Advanced Pokémon statistics
- 🚀 Production deployment
- 🧭 Dedicated `/pokemon` listing route (the Navbar's "Pokémon" link currently points to the homepage, since all browsing lives there today)

---

## 🏗️ Architecture

Pokédex Pro separates **server state** from **client/local state**.

```text
┌─────────────────────────────────────────────┐
│                Next.js App                   │
├─────────────────────────────────────────────┤
│                                               │
│  UI / Components                             │
│       │                                      │
│       ├───────────────┐                      │
│       │               │                      │
│       ▼               ▼                      │
│ TanStack Query    Legend-State                │
│       │               │                      │
│       │               ├── Favorites           │
│       │               ├── Preferences         │
│       │               └── Recently Viewed     │
│       │                                      │
│       ▼                                      │
│    PokéAPI                                   │
│                                               │
├─────────────────────────────────────────────┤
│                                               │
│ tRPC / Better Auth / Prisma                  │
│                                               │
└─────────────────────────────────────────────┘
```

### Server / Remote State

TanStack Query is responsible for server/API state such as:

- Pokémon lists
- Pokémon details
- API caching
- Request lifecycle
- Loading and error states (with user-triggered retry)

### Client / Local State

Legend-State is responsible for local-first application state such as:

- Favorites
- User preferences (including theme)
- Recently viewed Pokémon
- Local persistence

Every local-state area follows the same pattern: a `*.store.ts` file defining the observable and its setters, and a `*.persistence.ts` file that calls `syncObservable(...)` to back it with `localStorage`. Persistence files must be imported somewhere the app actually loads (currently `src/app/components/providers.tsx`) — importing a persistence file only for its side effect is easy to forget, so double-check this when adding a new local-state area.

This separation keeps remote data fetching and client state responsibilities clearly defined.

---

## 🛠️ Tech Stack

**Framework**
- Next.js 15
- React 19
- TypeScript

**UI**
- Chakra UI
- Lucide React
- React Icons
- Tailwind CSS
- next-themes (color mode)

**Data & State**
- PokéAPI
- TanStack React Query
- Legend-State
- tRPC
- Prisma

**Authentication**
- Better Auth

**Forms & Validation**
- React Hook Form
- Zod

**Testing**
- Vitest
- React Testing Library
- Testing Library User Event
- Playwright

**Developer Tooling**
- pnpm
- ESLint
- Prettier
- Husky
- Git
- Greptile (automated PR review)

---

## 📂 Project Structure

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── about/
│   │   └── contact/
│   ├── api/
│   │   ├── auth/
│   │   └── trpc/
│   ├── pokemon/
│   │   └── [name]/
│   │       ├── page.tsx
│   │       └── error.tsx
│   ├── components/
│   │   ├── providers.tsx
│   │   └── ui/
│   │       └── color-mode.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   └── pokemon/
│       └── ErrorState.tsx
│
├── features/
│   ├── favorites/
│   │   ├── favorites.store.ts
│   │   ├── favorites.persistence.ts
│   │   └── FavoriteButton.tsx
│   ├── preferences/
│   │   ├── preferences.store.ts
│   │   ├── preferences.persistence.ts
│   │   └── ThemeToggle.tsx
│   └── recently-viewed/
│       ├── recently-viewed.store.ts
│       ├── recently-viewed.persistence.ts
│       ├── RecentlyViewedList.tsx
│       └── RecordRecentlyViewed.tsx
│
├── layout/
│   ├── Container.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
│
├── lib/
│   ├── hooks/
│   │   └── usePokemon.ts
│   ├── pokeapi.ts
│   ├── pokemon-search.ts
│   ├── pokemon-types.ts
│   └── utils.ts
│
├── server/
│
├── styles/
│   └── globals.css
│
├── test/
│
├── test-utils/
│
└── trpc/
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Node.js 20+
- pnpm 10+

Check your versions:

```bash
node --version
pnpm --version
```

### Clone

```bash
git clone git@github.com:mokone-september/pokedex-pro.git
cd pokedex-pro
```

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create your local environment file:

```bash
cp .env.example .env
```

Configure the required environment variables before starting the application.

### Start development server

```bash
pnpm dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🏭 Production

### Build

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

---

## 🧪 Testing

Run the complete test suite:

```bash
pnpm test:run
```

Run tests interactively:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Run coverage:

```bash
pnpm test:coverage
```

---

## 🔍 Code Quality

Run ESLint:

```bash
pnpm lint
```

Run TypeScript type checking:

```bash
pnpm typecheck
```

Run formatting checks:

```bash
pnpm format:check
```

Format the project:

```bash
pnpm format:write
```

---

## 🗄️ Database

Generate Prisma client:

```bash
pnpm db:generate
```

Run migrations:

```bash
pnpm db:migrate
```

Push the schema:

```bash
pnpm db:push
```

Open Prisma Studio:

```bash
pnpm db:studio
```

---

## 🌐 Data Source

Pokédex Pro uses the excellent [PokéAPI](https://pokeapi.co/).

PokéAPI provides the Pokémon data consumed by the application.

---

## 💾 Local-First State

Legend-State is used for client-side local state and persistence.

Current local-state areas include:

```
Legend-State
├── Favorites (with UI, verified persisting across reloads)
├── Preferences (type filter, sort, theme — verified persisting across reloads)
└── Recently Viewed (with UI, verified persisting across reloads)
```

Each area has its own store and its own `localStorage`-backed persistence file, following the same pattern throughout the codebase.

The goal is to provide a responsive local-first experience while keeping server/API state separate.

Future versions may synchronize local state with the authenticated backend.

---

## 🌓 Theming

Pokédex Pro supports light, dark, and system-driven color modes, powered by `next-themes` and Chakra UI's semantic color tokens (`fg`, `bg`, `border`, etc.).

The theme selector lives in the Navbar. Selecting a theme:

1. Updates the rendered appearance immediately via `next-themes`.
2. Persists the choice via `next-themes`' own storage.
3. Mirrors the choice into the `preferences` Legend-State store, so it stays consistent with the rest of the app's local-state architecture.

When adding new components, prefer semantic tokens (`fg`, `fg.muted`, `bg.panel`, `bg.muted`, `border`) over raw color-scale values (`gray.500`, `white`, etc.) so new UI automatically supports dark mode.

---

## 🔁 Error Handling

Failed data fetches show an `ErrorState` card (message + a "Try again" button) instead of leaving the user stuck:

- **Homepage**: retries whichever TanStack Query call actually failed — the Pokémon list, the type-filtered list, or any individual Pokémon detail fetch.
- **Pokémon detail page**: uses Next.js's route-level `error.tsx` convention, since that page fetches data server-side. The provided `reset()` function re-runs the failed server render.

Both surfaces reuse the same `ErrorState` component for a consistent look.

---

## 📦 Git Workflow

This project follows a feature-branch workflow.

Example:

```
main
 │
 ├── feat/pokemon-search
 │
 ├── feat/pokemon-details
 │
 ├── feat/legend-state-favorites
 │
 ├── feat/favorites-ui
 │
 ├── feat/recently-viewed-ui
 │
 ├── feat/preferences-persistence
 │
 ├── feat/theme-persistence
 │
 ├── fix/wire-up-persistence
 │
 ├── fix/wire-up-nav-and-footer
 │
 └── feat/error-state-retry
```

Create a feature branch:

```bash
git switch -c feat/my-feature
```

Make your changes, test them locally, then commit:

```bash
git add .
git commit -m "feat: add my feature"
```

Push the branch:

```bash
git push -u origin feat/my-feature
```

Open a Pull Request against `main`.

---

## 📋 Roadmap

### Phase 1 — Foundation ✅
- [x] Project setup
- [x] Next.js
- [x] React
- [x] TypeScript
- [x] Chakra UI
- [x] TanStack Query
- [x] PokéAPI integration
- [x] Prisma foundation
- [x] Better Auth foundation
- [x] tRPC foundation

### Phase 2 — Pokémon Discovery ✅
- [x] Pokémon search
- [x] Pokémon grid
- [x] Type filters
- [x] Sorting
- [x] Responsive UI
- [x] Loading states
- [x] Component testing

### Phase 3 — Pokémon Details ✅
- [x] Pokémon details page
- [x] Pokémon statistics
- [x] Pokémon types
- [x] Pokémon images
- [ ] Evolution chain
- [ ] Abilities
- [ ] Moves

### Phase 4 — Local-First State ✅
- [x] Replace TinyBase with Legend-State
- [x] Favorites store
- [x] Favorites persistence *(verified working — persistence module is imported and actually runs)*
- [x] Favorites UI
- [x] Preferences store
- [x] Persistent type filters *(verified working)*
- [x] Persistent sorting *(verified working)*
- [x] Persistent theme preferences *(verified working)*
- [x] Recently Viewed store
- [x] Recently Viewed persistence *(verified working)*
- [x] Recently Viewed UI
- [ ] Grid/list view persistence *(no list-view UI exists yet)*

### Phase 5 — UX & Accessibility 🚧
- [x] Dark mode support (theme toggle + semantic tokens across the entire app, including previously-missed components)
- [x] Site-wide footer wired into layout
- [x] Navigation links for About/Contact pages
- [x] Error states with retry actions (homepage + Pokémon detail page)
- [ ] Empty states *(basic "no results" text exists; could be more helpful)*
- [ ] Accessibility improvements
- [ ] Keyboard navigation
- [ ] Mobile UX improvements
- [ ] Performance optimization

### Phase 6 — Backend Synchronization
- [ ] User favorites
- [ ] Server-side favorites
- [ ] Legend-State synchronization
- [ ] Offline mutations
- [ ] Conflict handling
- [ ] Cross-device synchronization

### Phase 7 — Production
- [ ] Production deployment
- [ ] Vercel deployment
- [ ] Monitoring
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] Documentation improvements

---

## 🤝 Contributing

Contributions are welcome.

Please:

1. Fork the repository.
2. Create a feature branch.

   ```bash
   git switch -c feat/my-feature
   ```

3. Make your changes.
4. Run the quality checks.

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test:run
   pnpm build
   ```

5. Commit your changes.

   ```bash
   git commit -m "feat: add awesome feature"
   ```

6. Push your branch.

   ```bash
   git push origin feat/my-feature
   ```

7. Open a Pull Request.

---

## ✅ Quality Standards

Before opening a Pull Request, make sure:

- ✅ ESLint passes
- ✅ TypeScript passes
- ✅ Tests pass
- ✅ Production build passes
- ✅ No secrets are committed
- ✅ Documentation is updated when necessary
- ✅ Changes are focused
- ✅ If you claim something "persists" or "works," verify it manually (reload the page, check the actual behavior) before merging — don't rely on the code merely existing

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Thabiso Kenneth Mokone**

- GitHub: [https://github.com/mokone-september](https://github.com/mokone-september)
- LinkedIn: [https://www.linkedin.com/in/mokone-september](https://www.linkedin.com/in/mokone-september)

<div align="center">

Made with ❤️ using Next.js, TypeScript, Chakra UI, TanStack Query and Legend-State.

</div>
