# CLAUDE.md

# Pokédex Pro

## Goal

Build a production-quality Pokédex that demonstrates modern React engineering.

Every feature should be:
- accessible
- responsive
- type-safe
- tested
- production ready

---

## Stack

- Next.js 15 App Router
- React 19
- TypeScript (strict)
- Chakra UI
- TanStack Query
- TinyBase
- Vitest
- React Testing Library
- pnpm

---

## UI Guidelines

- Use Chakra UI components.
- Never mix multiple styling systems.
- Mobile-first responsive design.
- Dark mode support.
- Accessible by default.

---

## Code Style

- Prefer composition over inheritance.
- Avoid unnecessary abstractions.
- Keep components under 200 lines.
- Extract reusable logic into hooks.
- Prefer named exports.

---

## Folder Structure

src/
  app/
  components/
  hooks/
  layout/
  lib/
  services/
  types/

---

## API

Use:
- React Query
- fetch wrapper
- proper loading states
- error boundaries

Never fetch directly inside UI components.

---

## Testing

Every feature should include:

- unit tests
- loading state tests
- error state tests

---

## Performance

- lazy load when appropriate
- memoize expensive calculations
- optimize images
- avoid unnecessary rerenders

---

## Accessibility

Every interactive element must have:

- keyboard navigation
- focus styles
- aria labels where needed

---

## Git

Use Conventional Commits.

Examples:

feat:
fix:
docs:
refactor:
test:
chore:

Never push broken builds.

---

## Pull Requests

Before committing:

pnpm lint
pnpm typecheck
pnpm test
pnpm build

All must pass.
