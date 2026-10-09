# Express API

A TypeScript and Express 5 API starter with environment-based configuration, CORS, request logging, cookie and body parsing, validation helpers, and Better Auth integration backed by PostgreSQL.

## Requirements

- Node.js 22 or newer
- npm
- PostgreSQL for Better Auth data

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Set `PORT=3000` in the environment file to listen on `http://localhost:3000`. The `dev` script uses `tsx watch`, so TypeScript changes restart the server automatically.

## Configuration

Configuration is loaded from `.env` when that file exists; otherwise, `src/config/env.config.ts` loads `.env.<NODE_ENV>` (using `development` when `NODE_ENV` is unset). For local development, create `.env.development` in the project root:

```env
PORT=3000
CLIENT_ORIGINS=http://localhost:5173
AUTH_DB_URI=postgresql://user:password@localhost:5432/database
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
```

Set `PORT`, `CLIENT_ORIGINS`, `AUTH_DB_URI`, and `BETTER_AUTH_SECRET` in the selected environment file. `CLIENT_ORIGINS` is passed directly to the CORS middleware as a single origin string; the application does not parse a JSON array. `AUTH_DB_URI` and `BETTER_AUTH_SECRET` are required for authentication. Do not commit real credentials or secrets.

## API Routes

### `GET /`

Returns a JSON object containing the current server timestamp.

### `GET /system/health`

Serves the status page from `src/lib/status.html`. It currently passes through a placeholder middleware that calls `next()` and does not enforce access control, then the shared controller error handler.

### `/auth/*`

All routes under `/auth` are forwarded to Better Auth. Email/password authentication is enabled, with the two-factor and JWT plugins configured. Better Auth uses the configured PostgreSQL database and trusts the configured client origin.

## Middleware

The Express app enables credentialed CORS, Morgan request logging (`dev` outside production and `combined` in production), cookie parsing, JSON body parsing, and URL-encoded body parsing. Reusable `express-validator` helpers are available, but the current routes do not attach validation rules.

## Project Structure

```text
src/
  app.ts                   Express app setup and route registration
  index.ts                 HTTP server entry point
  config/                  Environment loading and Express app configuration
  routes/                  Express route registration
  controllers/             Request handlers
  middlewares/             Reusable middleware and centralized error handling
  validators/              Reusable express-validator chains and middleware
  types/                   Environment and Express type declarations
  lib/                     Better Auth configuration and health page asset
scripts/copy-assets.mjs    Copy runtime assets during build
tests/                     Jest unit and integration tests
```

## Scripts

```bash
npm run dev        # Start the watch-mode development server
npm run build      # Compile TypeScript and copy runtime library files
npm start          # Build and run the compiled application
npm test           # Run Jest tests
npm run typecheck  # Check types without emitting files
```

## GitHub Actions

- **CI** runs on pull requests and pushes to `main`. It installs dependencies with `npm ci`, then runs typechecking, unit tests, and the production build.
- **CD** runs on pushes to any branch or manually from the Actions tab. It packages the compiled application with production dependencies and publishes it as a 14-day GitHub Actions artifact named after the commit SHA.

The CD workflow creates a deployable package but does not deploy to a cloud provider. Add a deployment step for the hosting platform and configure its credentials as GitHub Actions secrets when a deployment target is selected.

Run the checks before submitting changes:

```bash
npm run typecheck
npm test
```

## Adding Features

1. Add or update a controller in `src/controllers`.
2. Add route registration in `src/routes`.
3. Put reusable request logic in `src/middlewares` and validation rules in `src/validators`.
4. Mount new routers from `src/app.ts`.
5. Add focused tests under `tests`.

The project uses native ESM. Local TypeScript imports therefore include the `.js` extension, matching the compiled output expected by Node.js.
