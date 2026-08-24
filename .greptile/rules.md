# Pokedex Pro — Engineering Rules

## Project Context

Pokedex Pro is a TypeScript application using:

- Next.js
- React
- TypeScript
- tRPC
- Prisma
- Better Auth
- Chakra UI
- Legend-State
- Vitest
- Testing Library

Preserve the existing architecture and conventions when making changes.

## TypeScript

- Maintain strict type safety.
- Do not introduce `any` without a strong technical justification.
- Do not use `@ts-ignore` to hide errors.
- Do not use unsafe type assertions when a safer alternative exists.
- Reuse existing types and schemas where appropriate.
- Validate data at application boundaries.

## Next.js

- Prefer Server Components by default.
- Use `"use client"` only when client-side behaviour requires it.
- Do not unnecessarily convert Server Components into Client Components.
- Keep server-only code out of Client Components.
- Never expose secrets or server-only environment variables to the browser.
- Avoid unnecessary client-side JavaScript.

## tRPC

- Validate procedure inputs.
- Keep authorization checks on the server.
- Reuse existing tRPC procedures when appropriate.
- Do not introduce another API mechanism when tRPC already provides the required functionality.
- Never trust authorization information supplied by the client.

## Prisma

- Keep Prisma database access server-side.
- Avoid N+1 queries.
- Avoid unnecessary database queries.
- Select only the data required when practical.
- Do not expose database credentials or Prisma clients to client code.
- Consider migrations and existing data when changing the Prisma schema.

## Better Auth

Authentication and authorization are security-sensitive.

Always flag:

- authentication bypasses
- missing authorization checks
- insecure session handling
- exposed authentication secrets
- client-side authorization decisions
- trusting user identity supplied by the client

Protected operations must enforce authorization server-side.

## React

- Avoid unnecessary `useEffect`.
- Prefer derived values over duplicated state.
- Avoid unnecessary re-renders.
- Keep components focused.
- Reuse existing components where appropriate.
- Preserve accessibility.
- Avoid unnecessary Client Components.

## Chakra UI

- Use the existing Chakra UI component system.
- Do not introduce another UI library without strong justification.
- Preserve responsive behaviour.
- Interactive elements must remain keyboard accessible.
- Icon-only controls should have accessible labels.

## Legend-State

- Use Legend-State consistently with the existing application architecture.
- Prefer existing Legend-State stores and patterns before introducing another client-side state-management solution.
- Keep server state and client state appropriately separated.
- Avoid duplicating the same state across multiple stores or React component state.
- Do not introduce Redux, Zustand, Jotai, TinyBase, or another state-management library unless there is a clear architectural justification.
- Keep persistence logic consistent with the existing Legend-State implementation.
- Avoid unnecessary subscriptions and re-renders.
- Use fine-grained observability where appropriate.
- Do not put sensitive server-only data or secrets into client-side state.

## Testing

When application behaviour changes:

- Add or update relevant tests.
- Do not remove tests simply to make the test suite pass.
- Prefer testing observable behaviour over implementation details.
- Preserve existing Vitest and Testing Library conventions.

## Security

Always flag:

- exposed secrets
- credentials committed to source control
- authentication vulnerabilities
- authorization bypasses
- unsafe user input
- insecure database access
- sensitive data exposed to client code
- unsafe HTML rendering
- server-only data exposed to the browser

## Performance

Flag:

- unnecessary API requests
- unnecessary database queries
- N+1 query patterns
- avoidable re-renders
- excessive client-side JavaScript
- expensive work during rendering
- unnecessary network requests

## Dependencies

Do not add a dependency when the existing project stack can reasonably solve the problem.

New dependencies should have a clear technical justification and should not duplicate existing functionality.

## Code Quality

Prioritize meaningful issues over minor stylistic preferences.

Flag:

- bugs
- security vulnerabilities
- broken architecture
- duplicated logic
- dead code
- fragile error handling
- performance regressions
- unsafe type assertions
- breaking changes

Do not report minor stylistic issues unless they materially affect maintainability or violate an explicit project convention.# Pokedex Pro — Engineering Rules

## Project Context

Pokedex Pro is a TypeScript application using:

- Next.js
- React
- TypeScript
- tRPC
- Prisma
- Better Auth
- Chakra UI
- Legend-State
- Vitest
- Testing Library

Preserve the existing architecture and conventions when making changes.

Do not introduce a new framework, API layer, state-management solution, authentication system, database abstraction, or UI library when an existing project solution already handles the requirement.

## TypeScript

- Maintain strict type safety.
- Do not introduce `any` without a strong technical justification.
- Do not use `@ts-ignore` to hide errors.
- Do not use unsafe type assertions when a safer alternative exists.
- Reuse existing types and schemas where appropriate.
- Validate data at application boundaries.

## Next.js

- Prefer Server Components by default.
- Use `"use client"` only when client-side behaviour requires it.
- Do not unnecessarily convert Server Components into Client Components.
- Keep server-only code out of Client Components.
- Never expose secrets or server-only environment variables to the browser.
- Avoid unnecessary client-side JavaScript.

## tRPC

- Validate procedure inputs.
- Keep authorization checks on the server.
- Reuse existing tRPC procedures when appropriate.
- Do not introduce another API mechanism when tRPC already provides the required functionality.
- Never trust authorization information supplied by the client.

## Prisma

- Keep Prisma database access server-side.
- Avoid N+1 queries.
- Avoid unnecessary database queries.
- Select only the data required when practical.
- Do not expose database credentials or Prisma clients to client code.
- Consider migrations and existing data when changing the Prisma schema.

## Better Auth

Authentication and authorization are security-sensitive.

Always flag:

- authentication bypasses
- missing authorization checks
- insecure session handling
- exposed authentication secrets
- client-side authorization decisions
- trusting user identity supplied by the client

Protected operations must enforce authorization server-side.

## React

- Avoid unnecessary `useEffect`.
- Prefer derived values over duplicated state.
- Avoid unnecessary re-renders.
- Keep components focused.
- Reuse existing components where appropriate.
- Preserve accessibility.
- Avoid unnecessary Client Components.

## Chakra UI

- Use the existing Chakra UI component system.
- Do not introduce another UI library without strong justification.
- Preserve responsive behaviour.
- Interactive elements must remain keyboard accessible.
- Icon-only controls should have accessible labels.

## Legend-State

- Use Legend-State consistently with the existing application architecture.
- Prefer existing Legend-State stores and patterns before introducing another client-side state-management solution.
- Keep server state and client state appropriately separated.
- Avoid duplicating the same state across multiple stores or React component state.
- Do not introduce Redux, Zustand, Jotai, TinyBase, or another state-management library unless there is a clear architectural justification.
- Keep persistence logic consistent with the existing Legend-State implementation.
- Avoid unnecessary subscriptions and re-renders.
- Use fine-grained observability where appropriate.
- Do not put sensitive server-only data or secrets into client-side state.


## Testing

When application behaviour changes:

- Add or update relevant tests.
- Do not remove tests simply to make the test suite pass.
- Prefer testing observable behaviour over implementation details.
- Preserve existing Vitest and Testing Library conventions.

## Security

Always flag:

- exposed secrets
- credentials committed to source control
- authentication vulnerabilities
- authorization bypasses
- unsafe user input
- insecure database access
- sensitive data exposed to client code
- unsafe HTML rendering
- server-only data exposed to the browser

## Performance

Flag:

- unnecessary API requests
- unnecessary database queries
- N+1 query patterns
- avoidable re-renders
- excessive client-side JavaScript
- expensive work during rendering
- unnecessary network requests

## Dependencies

Do not add a dependency when the existing project stack can reasonably solve the problem.

New dependencies should have a clear technical justification and should not duplicate existing functionality.

## Code Quality

Prioritize meaningful issues over minor stylistic preferences.

Flag:

- bugs
- security vulnerabilities
- broken architecture
- duplicated logic
- dead code
- fragile error handling
- performance regressions
- unsafe type assertions
- breaking changes

Do not report minor stylistic issues unless they materially affect maintainability or violate an explicit project convention.
