# Code Standards

## Engineering mindset

Act as a careful engineer working in an existing API template. Read the relevant source, tests, and configuration before changing code. Make focused, secure changes that preserve unrelated behavior; prefer straightforward, maintainable solutions over unnecessary abstractions or excessive fragmentation. Add or adjust tests for behavior changes and report checks accurately.

## Naming and files

- Use lowercase names for files and directories. Prefer one concise descriptive word when it is clear; when a file has a feature and role, use `<feature>.<role>.ts`, as in `system.controller.ts`, `auth.route.ts`, and `error.middleware.ts`.
- Use `camelCase` for variables and functions, and `PascalCase` for TypeScript types. Follow established role suffixes: `.route.ts`, `.controller.ts`, `.middleware.ts`, and `.validator.ts`.
- Keep reusable, feature-neutral helpers in a clearly named module such as `validator.ts`; avoid creating folders or files for one-line abstractions without a concrete reuse or organization need.

## Architecture and component responsibilities

- Put Express app composition and route mounting in `src/app.ts`; keep process/server startup in `src/index.ts`.
- Put endpoint registration in `src/routes/`. Routes should connect middleware and controllers rather than accumulate business logic.
- Put request/response behavior in `src/controllers/`; type handlers with the shared types in `src/types/express.d.ts`.
- Put reusable request processing in `src/middlewares/`. Use the controller and middleware wrappers where appropriate so rejected async work reaches Express's centralized error handler.
- Put request validation chains in `src/validators/`, and reusable validation execution in `validator.ts`.
- Keep framework setup and environment loading in `src/config/`; integrations and non-code runtime assets belong in `src/lib/`.

## Imports, types, and formatting

- Prefer the configured source aliases (`@route/*`, `@controller/*`, `@middleware/*`, `@config/*`, `@lib/*`, `@type/*`) for source modules.
- For relative imports in native ESM TypeScript, include the `.js` extension so emitted Node.js imports resolve. The build runs `tsc-alias` to rewrite configured aliases.
- Use `import type` for type-only dependencies. Preserve strict TypeScript checking; avoid `any` when a shared or narrow type is available.
- Use single quotes, four-space indentation, and trailing commas in multiline structures, following the predominant style in the source. Match nearby code where legacy formatting differs; avoid unrelated reformatting.

## Error handling and security

- Forward errors from wrapped controllers/middleware with `next(error)`; do not return internal exception details to clients. The centralized error middleware logs details and sends a generic response.
- Keep middleware and route ordering intentional. The error handler belongs after route registration; when headers are already sent, delegate the error to Express.
- Do not commit secrets, credentials, or real environment files. Use `.env.example` for placeholder configuration. Validate untrusted request data before using it, and avoid logging sensitive values.
- Review dependency changes for necessity and advisories; keep `package.json` and `package-lock.json` consistent.

## Tests and build

- Add unit tests under `tests/unit/` for focused functions/handlers and integration tests under `tests/integration/` for composed HTTP behavior.
- Use Jest, `@jest/globals`, and the existing ESM/Jest alias configuration. Mock external services such as Better Auth when the test is not intended to require a real database.
- Example integration assertions:

  ```ts
  const response = await fetch(`${baseUrl}/system/health`);

  expect(response.status).toBe(200);
  expect(response.headers.get('content-type')).toContain('text/html');
  ```

- Run the existing project checks after code changes:

  ```bash
  npm run typecheck
  npm test -- --runInBand
  npm run build
  ```

- The build compiles TypeScript, rewrites aliases, and copies `src/lib` into `dist/src/lib`. Keep runtime assets available in the compiled package.
