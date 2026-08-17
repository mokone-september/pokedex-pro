# AGENT.md

Welcome! This document explains how AI coding agents should contribute to Pokedex Pro.

The goal of this project is to build a modern, production-quality Pokédex using the latest React ecosystem while keeping the codebase simple, maintainable, and easy to extend.

This document is written for AI agents rather than human developers.

---

# Project Goals

Build a Pokédex that demonstrates professional frontend engineering.

The project should showcase:

- Next.js App Router
- TypeScript
- Chakra UI
- React Query
- Legend-State
- Modern Git workflow
- Testing
- Accessibility
- Performance
- Clean architecture

Every change should improve one or more of these goals.

---

# Philosophy

## Build production-quality code

Every feature should be written as if it will ship to production.

Avoid hacks.

Avoid shortcuts.

Avoid unnecessary complexity.

---

## Keep components small

Prefer many focused components over one large component.

Good:

PokemonCard
PokemonImage
PokemonStats
PokemonTypes

Bad:

PokemonCardEverything.tsx

---

## Prefer composition

Compose components instead of creating large inheritance hierarchies.

Example:

PokemonCard
 ├── PokemonImage
 ├── PokemonTypes
 └── PokemonStats

---

## TypeScript first

Never use `any`.

Prefer:

- interfaces
- discriminated unions
- utility types
- inferred types

Use strict typing whenever possible.

---

## Reuse before creating

Before creating a component:

Check if an existing component already solves the problem.

Avoid duplicate UI.

---

## Keep styling consistent

Use Chakra UI components.

Avoid inline styles unless absolutely necessary.

Prefer:

Stack

Flex

Grid

Box

Container

Use the Chakra design system.

---

## Performance matters

Avoid unnecessary renders.

Memoize expensive computations when needed.

Use React Query for server state.

Use Legend-State for local persistence.

---

## Accessibility

Every feature should be keyboard accessible.

Every image should have alt text.

Buttons should have labels.

Inputs should have placeholders and labels.

---

## Testing

Every reusable component should have tests.

Prefer:

Vitest

React Testing Library

Test behaviour rather than implementation.

---

## Git workflow

Never commit directly to main.

Always create a feature branch.

Example:

feature/pokemon-search

feature/favorites

feature/details-page

Commit messages should follow Conventional Commits.

Examples:

feat:

fix:

refactor:

docs:

test:

---

## Folder structure

Keep folders organized.

Example:

src/

components/
pokemon/

hooks/

lib/

types/

utils/

---

## Data fetching

All PokéAPI requests belong inside:

src/lib/pokeapi.ts

Never fetch directly inside components.

Components should remain presentational whenever possible.

---

## React Query

All API access should use React Query.

Do not duplicate fetch logic.

Create reusable hooks.

Example:

usePokemon()

usePokemonList()

---

## Legend-State

Legend-State should manage client-side state and persistence.

Keep local-first state such as:
- favorites
- user preferences
- recently viewed Pokémon

Do not store server data in Legend-State unless necessary.
Use TanStack Query for server/API state.

---

## Error handling

Every async operation should have:

loading state

error state

empty state

Never leave the UI blank.

---

## Code style

Prefer readable code over clever code.

If two solutions work:

Choose the one that is easier to understand.

---

## Documentation

Public functions should include brief documentation when the intent is not immediately obvious.

Keep comments focused on **why**, not **what**.

---

# Things to avoid

Avoid:

- any
- duplicated code
- large components
- unnecessary dependencies
- deeply nested JSX
- inline business logic
- magic numbers
- dead code

---

# Success criteria

A successful contribution:

- builds successfully
- passes tests
- passes linting
- follows project architecture
- improves maintainability
- keeps the UI responsive
- follows accessibility best practices

When in doubt:

Choose the simplest solution that fits the existing architecture.
