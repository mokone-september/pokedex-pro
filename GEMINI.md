# GEMINI.md

# Pokédex Pro

This file provides project-specific guidance for Gemini and other AI coding assistants.

> For project philosophy, architecture, and long-term goals, refer to `AGENT.md`.

---

# Project Overview

Pokédex Pro is a modern Pokédex application built with the T3 Stack and the latest React ecosystem.

Primary goals:

- Clean architecture
- Type safety
- Excellent developer experience
- Production-ready code
- Accessible UI
- High test coverage

---

# Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Chakra UI v3
- TanStack React Query
- PokéAPI
- Vitest
- React Testing Library
- ESLint
- Prettier
- pnpm

---

# Code Style

Prefer:

- Functional React components
- TypeScript interfaces
- Early returns
- Small reusable components
- Composition over inheritance
- Named exports

Avoid:

- `any`
- unnecessary abstractions
- duplicated logic
- deeply nested components

---

# File Organization

```
src/
 ├── app/
 ├── components/
 │     ├── pokemon/
 │     └── ui/
 ├── hooks/
 ├── lib/
 ├── layout/
 ├── services/
 ├── test/
 ├── types/
 └── utils/
```

Keep components focused on a single responsibility.

---

# API

All API logic belongs inside:

```
src/lib/pokeapi.ts
```

Do not call the PokéAPI directly from components.

Prefer reusable helper functions.

---

# React Query

Use React Query for all remote state.

Prefer custom hooks:

```
usePokemonList()
usePokemon()
usePokemonByType()
```

Avoid fetch calls inside React components.

---

# Chakra UI

Prefer Chakra components instead of raw HTML whenever practical.

Example:

- Stack
- Flex
- Grid
- Card
- Badge
- Skeleton

Avoid unnecessary inline styles.

---

# Testing

Testing stack:

- Vitest
- React Testing Library

Test:

- rendering
- loading states
- error states
- interactions
- filtering
- searching

Avoid implementation-detail testing.

---

# Accessibility

Always include:

- alt text
- aria labels
- semantic HTML
- keyboard navigation

Accessibility is required.

---

# Performance

Prefer:

- memoization where appropriate
- React Query caching
- lazy loading
- optimized images
- minimal rerenders

---

# Git

Use Conventional Commits.

Examples:

```
feat:
fix:
docs:
refactor:
test:
style:
perf:
chore:
```

Examples:

```
feat: add pokemon search
fix: handle API errors
docs: update README
test: add PokemonCard tests
```

---

# Pull Requests

Each PR should:

- solve one problem
- build successfully
- pass tests
- pass lint
- include a clear description

---

# Documentation

Update documentation whenever:

- features change
- architecture changes
- commands change

Keep README accurate.

---

# AI Guidelines

When generating code:

- prefer readability
- preserve existing architecture
- avoid introducing unnecessary dependencies
- keep functions small
- keep components reusable
- maintain strict TypeScript safety

When unsure, choose the simplest maintainable solution.

---

# Project Philosophy

Pokédex Pro is intended to be a portfolio-quality example of modern React and Next.js development.

Every contribution should improve:

- readability
- maintainability
- performance
- developer experience
