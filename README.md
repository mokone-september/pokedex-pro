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
- ❤️ Legend-State local-state foundation
- 💾 Local persistence foundation
- 🔐 Better Auth foundation
- 🗄️ Prisma database foundation
- 🔌 tRPC server foundation

### 🚧 In Progress

- ❤️ Favorites UI
- 🕘 Recently Viewed UI
- ⚙️ Persistent user preferences
- 💾 Persistent type filters
- 🔀 Persistent sorting
- 🌙 Theme preference persistence

### 🔮 Planned

- 🔗 Evolution chains
- ✨ Pokémon abilities
- 📜 Pokémon moves
- 🌐 Offline-first improvements
- 🔄 Local-to-server synchronization
- 👤 User-specific favorites
- 📱 Improved mobile experience
- ♿ Accessibility improvements
- ⚡ Performance optimization
- 📊 Advanced Pokémon statistics
- 🚀 Production deployment

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
- Loading and error states

### Client / Local State

Legend-State is responsible for local-first application state such as:

- Favorites
- User preferences
- Recently viewed Pokémon
- Local persistence

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
│   ├── components/
│   │   ├── providers.tsx
│   │   └── ui/
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   └── pokemon/
│
├── features/
│   ├── favorites/
│   │   ├── favorites.store.ts
│   │   └── favorites.persistence.ts
│   ├── preferences/
│   │   └── preferences.store.ts
│   └── recently-viewed/
│       ├── recently-viewed.store.ts
│       └── recently-viewed.persistence.ts
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
├── Favorites
├── Preferences
└── Recently Viewed
```

The goal is to provide a responsive local-first experience while keeping server/API state separate.

Future versions may synchronize local state with the authenticated backend.

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
 └── feat/type-filters
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

### Phase 4 — Local-First State 🚧
- [x] Replace TinyBase with Legend-State
- [x] Favorites store
- [x] Favorites persistence
- [x] Preferences store
- [x] Recently Viewed store
- [x] Recently Viewed persistence
- [ ] Favorites UI
- [ ] Recently Viewed UI
- [ ] Persistent type filters
- [ ] Persistent sorting
- [ ] Persistent theme preferences

### Phase 5 — UX & Accessibility
- [ ] Dark mode improvements
- [ ] Empty states
- [ ] Error states
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
