# Express API

A TypeScript and Express 5 API starter with environment-based configuration, request logging, CORS, cookie parsing, validation-ready middleware, and Better Auth integration backed by PostgreSQL.

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

The server listens on `http://localhost:3000` by default. The `dev` script uses `tsx watch`, so TypeScript changes restart the server automatically.

## Configuration

Configuration is loaded from `.env.<NODE_ENV>` by `src/config/env.config.ts`. For local development, create `.env.development` in the project root:

```env
PORT=3000
CLIENT_ORIGINS=["http://localhost:3000"]
AUTH_DB_URI=postgresql://user:password@localhost:5432/database
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
```

`PORT` defaults to `3000`, and `CLIENT_ORIGINS` defaults to `["http://localhost:3000"]`. `AUTH_DB_URI` and `BETTER_AUTH_SECRET` should be set before using authentication features.

## API Routes

### `GET /`

Returns a JSON object containing the current server timestamp.

### `GET /system/health`

Serves the status page from `src/lib/status.html`. The route passes through the system protection middleware and the shared controller error handler.

### `/auth/*`

All routes under `/auth` are handled by Better Auth. Email/password authentication is enabled, with two-factor authentication and JWT plugins configured. The configured PostgreSQL database stores Better Auth data.

## Project Structure

```text
src/
  index.ts                 Express application and server entry point
  config/env.config.ts     Environment loading and exported settings
  routes/                  Express route registration
  controllers/             Request handlers and async error handling
  middlewares/             Reusable request middleware
  validators/              Express Validator helpers
  lib/auth.ts              Better Auth server configuration
  lib/status.html          Health status page
tests/unit/                Jest unit tests
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
- **CD** runs on pushes to `main` or manually from the Actions tab. It packages the compiled application with production dependencies and publishes it as a 14-day GitHub Actions artifact named after the commit SHA.

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
4. Mount new routers from `src/index.ts`.
5. Add focused tests under `tests`.

The project uses native ESM. Local TypeScript imports therefore include the `.js` extension, matching the compiled output expected by Node.js.
