# Dependency Guide

Keep this guide aligned with the dependencies declared in the root `package.json`. Use each library's official documentation for API details; this file records how the project uses the libraries rather than duplicating their full docs.

## Runtime dependencies

| Package | Declared version | Project use |
| --- | --- | --- |
| `express` | `^5.2.1` | HTTP app, routers, middleware, and request handling in `src/config/app.config.ts`, `src/app.ts`, and `src/routes/`. |
| `better-auth` | `^1.7.5` | Authentication setup, email/password, two-factor and JWT plugins in `src/lib/auth.ts`; mounted through `better-auth/node` in `src/routes/auth.route.ts`. |
| `pg` | `^8.23.0` | PostgreSQL pool supplied to Better Auth in `src/lib/auth.ts`. |
| `cors` | `^2.8.6` | CORS handling and credential support, configured in `src/config/app.config.ts`. |
| `cookie-parser` | `^1.4.7` | Parses request cookies in `src/config/app.config.ts`. |
| `morgan` | `^1.12.1` | HTTP request logging, configured by environment in `src/config/app.config.ts`. |
| `dotenv` | `^17.4.2` | Loads `.env` or `.env.<NODE_ENV>` in `src/config/env.config.ts`. |
| `express-validator` | `^7.3.2` | Defines request validation chains in `src/validators/`; common Express handler types reference `ValidationChain`. |

## Development and build dependencies

| Package | Declared version | Project use |
| --- | --- | --- |
| `typescript` | `~5.9.3` | Strict type checking and ESM compilation configured in `tsconfig.json`. |
| `tsx` | `^4.23.13` | Runs and watches `src/index.ts` for `npm run dev`. |
| `tsc-alias` | `^1.9.7` | Rewrites TypeScript path aliases in compiled output during `npm run build`. |
| `jest` | `^30.2.0` | Test runner invoked by the `test` script. |
| `ts-jest` | `^29.1.2` | Transforms TypeScript tests with the ESM preset in `jest.config.ts`. |
| `@types/node` | `^22.20.3` | Node.js API and process types. |
| `@types/express` | `^5.0.6` | Express type definitions. |
| `@types/cookie-parser` | `^1.4.10` | Cookie-parser type definitions. |
| `@types/cors` | `^2.8.19` | CORS type definitions. |
| `@types/morgan` | `^1.9.10` | Morgan type definitions. |
| `@types/jest` | `^30.0.0` | Jest type definitions used by the Jest config. |
| `nodemon` | `^1.14.10` | Declared directly, but not invoked by the current npm scripts. |
| `ts-node` | `^10.9.2` | Declared directly, but not invoked by the current npm scripts. |

The build also uses Node's built-in `node:fs` API in `scripts/copy-assets.mjs`; it does not require a separate asset-copy package.

## Dependency maintenance

- Add runtime libraries to `dependencies` and development/build/test tools to `devDependencies`.
- Use npm to add, remove, or update packages so `package-lock.json` remains synchronized. Commit both manifest and lockfile changes.
- Before changing how a library is used, search related project documentation and the library's official documentation to understand its role, conventions, and constraints. If a relevant library-specific skill is available, read and follow it.
- Before introducing a dependency, check whether Node.js or an existing package already provides the needed capability. Review advisories and compatibility with the project's Node.js 22+ and ESM setup.
- When adding or removing a direct dependency, update this guide with its role and usage location. Mention unused direct dependencies rather than assuming they are needed; remove them only after checking the repository and tooling.
- Prefer the package's official documentation for detailed APIs and configuration options.
