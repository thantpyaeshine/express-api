# Application Architecture

## Purpose and stack

This repository is a starter template for an HTTP API built with Node.js 22+, TypeScript, and Express 5. It uses native ESM, Better Auth for authentication, and PostgreSQL through `pg`. Jest with `ts-jest` provides unit and app-level integration tests.

## Source layout

| Path | Responsibility |
| --- | --- |
| `src/app.ts` | Composes the Express application, root endpoint, routers, and final error handler. |
| `src/index.ts` | Starts the HTTP server from the configured port. |
| `src/config/` | Configures Express middleware and loads environment settings. |
| `src/routes/` | Declares endpoints and connects middleware/controllers or external handlers. |
| `src/controllers/` | Implements request-specific response logic. |
| `src/middlewares/` | Implements reusable request processing, handler wrappers, and centralized error handling. |
| `src/validators/` | Builds reusable `express-validator` chains and validation middleware. |
| `src/lib/` | Integrates Better Auth and stores the runtime status-page asset. |
| `src/types/` | Holds shared Express and environment TypeScript types. |
| `scripts/copy-assets.mjs` | Copies `src/lib` assets into the compiled output. |
| `tests/unit/` | Tests individual controllers, middleware, and handlers. |
| `tests/integration/` | Exercises the composed Express app over a local HTTP server. |

## Request lifecycle

1. `src/config/app.config.ts` creates the Express app and registers CORS, Morgan request logging, cookie parsing, JSON parsing, and URL-encoded body parsing.
2. `src/app.ts` registers the root timestamp endpoint, mounts `/system` and `/auth` routers, then registers the centralized error handler last.
3. The system router sends `/system/health` through `protectSystem`, then the controller wrapper and `getStatus` controller, which serves `src/lib/status.html`.
4. The auth router forwards requests under `/auth/*` to Better Auth's Node handler. Better Auth uses the configured PostgreSQL pool.
5. Wrapped controllers and middleware forward thrown/rejected errors with `next(error)`. The final error middleware logs them and returns a generic 500 response, delegating to Express if response headers were already sent.

## Configuration and build

- `src/config/env.config.ts` loads `.env` if present, otherwise `.env.<NODE_ENV>` (using `development` when `NODE_ENV` is unset), then exposes `process.env` using the `EnvironmentVariables` type. Type declarations do not perform runtime parsing or validation.
- `src/types/env.d.ts` describes the environment settings used by the app. Treat actual runtime values as environment-provided strings unless explicitly parsed.
- `tsconfig.json` enables strict TypeScript, targets ES2024, emits ESM to `dist`, and defines source aliases such as `@route/*` and `@middleware/*`.
- `package.json` declares `"type": "module"`. The build runs `tsc`, rewrites aliases with `tsc-alias`, then copies runtime assets with `scripts/copy-assets.mjs`.
- `npm run dev` runs `tsx watch src/index.ts`; `npm start` builds and starts `dist/src/index.js`.

## Tests and workflows

- Jest runs TypeScript tests in the Node environment using the ESM `ts-jest` preset. `jest.config.ts` maps source aliases for tests.
- CI installs with `npm ci`, then runs `npm run typecheck`, `npm test -- --runInBand`, and `npm run build`.
- CD runs on pushes to any branch or manual dispatch. It packages the compiled app and production dependencies as a 14-day GitHub Actions artifact; it does not deploy to a hosting provider.
