# Pokédex Pro

A modern, production-focused Pokédex built with **Next.js, TypeScript, Chakra UI, TanStack Query, and Legend-State**.

The project focuses on clean architecture, responsive UX, accessible interactions, client/server state separation, persistence, and maintainable frontend engineering practices.

---

## ✨ Features

### 🔎 Pokémon Discovery

* Search Pokémon by name
* Browse Pokémon from the [PokéAPI](https://pokeapi.co/)
* TanStack Query for server-state management
* Client-side filtering
* Sorting by:

  * Name
  * ID
* Responsive Pokémon card grid
* Pokémon detail pages
* Base stats and type information
* Pokémon artwork and image handling

### 🎨 UI & UX

* Chakra UI component system
* Responsive layouts
* Dark mode support
* Persistent theme preference
* Responsive navigation
* Site-wide footer
* Loading states
* Error states with retry functionality
* Empty-state messaging
* Consistent spacing and typography
* Lucide and React Icons

### ♿ Accessibility

* Skip-to-content navigation
* Semantic heading structure
* Exactly one primary `<h1>` per page
* Polite live-region announcements for search results
* Keyboard-accessible navigation
* Visible keyboard focus states
* Keyboard interaction support for the mobile navigation menu
* Escape-to-close behavior for navigation menus
* Focus restoration to the menu trigger

### 💾 State & Persistence

* **TanStack Query** for server/API state
* **Legend-State** for client and local state
* Persistent favorites
* Recently viewed Pokémon
* Persistent user preferences
* Local theme preference
* Local storage-backed application state

### 🔐 Application Foundations

The project also contains foundations for:

* Better Auth
* Prisma
* PostgreSQL
* tRPC
* User authentication
* User-specific application data

These features are being developed incrementally rather than treated as completed production functionality.

---

## 🚧 In Progress

* 🗂️ Empty-state polish
* ⌨️ Keyboard navigation
* 📱 Mobile UX improvements
* ⚡ Performance optimization

---

## 🗺️ Planned

* 🧬 Pokémon evolution chains
* ⚡ Abilities
* ⚔️ Moves
* 📡 Improved offline support
* 🔄 Local-to-server state synchronization
* ❤️ User-specific favorites
* 📱 Mobile UX improvements
* ⚡ Performance optimization
* 📊 Advanced Pokémon statistics
* 🚀 Production deployment improvements
* 🗂️ Dedicated `/pokemon` browsing route

---

## 🏗️ Architecture

Pokédex Pro separates **server state** from **client/local state**.

### Server State

Handled with **TanStack Query**.

Used for:

* PokéAPI requests
* Pokémon lists
* Pokémon details
* Loading states
* Error states
* Request caching
* Query invalidation

### Client & Local State

Handled with **Legend-State**.

Used for:

* Favorites
* Recently viewed Pokémon
* User preferences
* Local UI state
* Persistent client-side data

Each major local-state area follows a dedicated store and persistence structure.

Example:

```text
src/
├── features/
│   └── preferences/
│       ├── preferences.store.ts
│       └── preferences.persistence.ts
```

The stores and persistence layers are initialized through the application's provider structure.

---

## 🛠️ Tech Stack

### Frontend

* [Next.js](https://nextjs.org/) 15
* [React](https://react.dev/) 19
* TypeScript
* Chakra UI
* Tailwind CSS
* Lucide React
* React Icons
* next-themes

### Data & State

* [PokéAPI](https://pokeapi.co/)
* TanStack Query
* Legend-State
* tRPC
* Prisma
* PostgreSQL

### Authentication & Forms

* Better Auth
* React Hook Form
* Zod

### Testing

* Vitest
* React Testing Library
* Testing Library User Event
* Playwright

### Tooling

* pnpm
* ESLint
* Prettier
* Husky
* Git

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── about/
│   ├── api/
│   ├── contact/
│   ├── pokemon/
│   │   └── [name]/
│   ├── components/
│   │   └── providers.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── pokemon/
│   │   └── ErrorState.tsx
│   └── ui/
│
├── features/
│   ├── favorites/
│   ├── pokemon/
│   ├── preferences/
│   └── recently-viewed/
│
├── layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── lib/
│
├── server/
│
├── styles/
│
├── test/
│   └── ...
│
├── test-utils/
│
└── trpc/
```

The architecture is intentionally organized around reusable features and clear separation of responsibilities.

---

## 🧪 Testing

The project uses multiple levels of automated testing.

### Unit & Component Tests

Vitest and React Testing Library are used to test:

* Components
* User interactions
* State behavior
* Navigation
* Accessibility-related behavior
* Loading and error states
* Pokémon functionality

Testing Library User Event is used for realistic keyboard and pointer interactions.

### End-to-End Testing

Playwright is used for browser-level workflows, including:

* Navigation
* Keyboard interaction
* Responsive behavior
* User-facing flows

### Current Test Status

The latest full test suite contains:

```text
20 test files
77 tests
77 passing
```

---

## ♿ Accessibility Work

Accessibility is treated as an ongoing engineering concern rather than a one-time checklist.

Recent improvements include:

### Skip Navigation

A keyboard user can press `Tab` and access a skip-to-content link before navigating through the site's main navigation.

### Heading Structure

The homepage provides a single primary heading:

```text
<h1>Pokédex Pro</h1>
```

The 404 page also provides a single primary heading.

### Live Results

Search/filter results provide polite screen-reader announcements through an `aria-live` region.

### Keyboard Navigation

The navigation system supports keyboard interaction, including:

* Tab navigation
* Opening the mobile navigation menu
* Arrow-key navigation within the menu
* Escape to close the menu
* Focus restoration to the menu trigger

Accessibility improvements will continue as additional application features are introduced.

---

## 🔄 Git Workflow

Feature development follows a branch-based workflow.

Example:

```bash
git checkout main
git pull

git checkout -b feat/keyboard-navigation

# Make changes

git status
git add .
git commit -m "feat: improve keyboard navigation"

git push -u origin feat/keyboard-navigation
```

Other feature branches may follow the same naming convention:

```text
feat/error-state-retry
feat/keyboard-navigation
feat/mobile-ux
feat/performance
feat/evolution-chains
```

Pull requests are reviewed and merged into `main` once the relevant checks pass.

---

## ✅ Quality Standards

Before merging significant changes, the project should pass:

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
```

Or run the complete quality gate:

```bash
pnpm lint && pnpm typecheck && pnpm test:run && pnpm build
```

### Manual Verification

Automated tests are supported by manual browser verification where appropriate.

For example:

* Keyboard navigation should be tested with a real keyboard
* Focus visibility should be visually checked
* Responsive layouts should be tested at different viewport sizes
* Persistent state should be verified after refreshing the page
* Theme preferences should persist across reloads
* Error and empty states should be checked from a user's perspective

The README only claims persistence or user-facing behavior as complete when it has been verified.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* pnpm
* Git

### Clone the repository

```bash
git clone https://github.com/mokone-september/pokedex-pro.git
cd pokedex-pro
```

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm test
pnpm test:run
```

---

## 🧭 Development Roadmap

### Phase 1 — Foundation ✅

* [x] Next.js App Router
* [x] TypeScript
* [x] Chakra UI
* [x] PokéAPI integration
* [x] Basic Pokémon listing
* [x] Pokémon search
* [x] Pokémon detail pages

### Phase 2 — Data & State ✅

* [x] TanStack Query
* [x] Query caching
* [x] Client-side filtering
* [x] Sorting
* [x] Legend-State
* [x] Favorites state
* [x] Recently viewed state
* [x] Persistent preferences

### Phase 3 — UI & UX ✅

* [x] Responsive Pokémon grid
* [x] Dark mode
* [x] Loading states
* [x] Error states
* [x] Retry functionality
* [x] Responsive navigation
* [x] Site-wide footer

### Phase 4 — Application Foundations 🚧

* [x] Better Auth foundation
* [x] Prisma foundation
* [x] PostgreSQL integration foundation
* [x] tRPC foundation
* [ ] Complete authentication flows
* [ ] User-specific favorites
* [ ] Local-to-server synchronization

### Phase 5 — UX & Accessibility 🚧

* [x] Dark mode support with persistent theme preference
* [x] Site-wide footer
* [x] Navigation links
* [x] Error states
* [x] Accessibility improvements

  * [x] Skip-to-content link
  * [x] Semantic heading structure
  * [x] Live result announcements
* [ ] Empty-state polish
* [ ] Keyboard navigation
* [ ] Mobile UX improvements
* [ ] Performance optimization

### Phase 6 — Advanced Pokémon Features 📋

* [ ] Evolution chains
* [ ] Abilities
* [ ] Moves
* [ ] Advanced stats
* [ ] Additional Pokémon metadata

### Phase 7 — Production 📋

* [ ] Production deployment
* [ ] Performance optimization
* [ ] Offline improvements
* [ ] Production authentication
* [ ] User-specific data synchronization
* [ ] Dedicated `/pokemon` route

---

## 🔍 Engineering Principles

The project prioritizes:

* Clear separation of concerns
* Type safety
* Reusable components
* Accessible interfaces
* Predictable state management
* Server/client state separation
* Automated testing
* Responsive design
* Incremental feature development
* Maintainable code over unnecessary abstraction

The goal is not simply to build a Pokédex, but to demonstrate practical frontend and full-stack engineering practices in a realistic application.

---

## 👨🏾‍💻 Author

**Thabiso Kenneth Mokone**

Frontend / Full-Stack Software Developer

* React
* Next.js
* TypeScript
* Node.js
* Python
* AWS

### Links

* GitHub: https://github.com/mokone-september
* LinkedIn: https://www.linkedin.com/in/mokone-september/
* Portfolio: https://portfolio-v2-main-sooty.vercel.app/

---

## 📄 License

This project is for portfolio and learning purposes.
