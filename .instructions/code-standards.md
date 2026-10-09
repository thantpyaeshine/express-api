# Code Standards

These standards describe how to make changes in this repository. Follow the existing implementation and its configuration when a convention is unclear. Keep this document focused on coding practices; system structure and runtime behavior belong in the architecture guide.

## Principles

- Prefer clear, direct code over cleverness or unnecessary abstraction.
- Make the smallest change that fully addresses the requirement. Preserve unrelated behavior and avoid drive-by cleanup.
- Read nearby implementation, tests, and configuration before changing an established pattern.
- Keep each function and module focused. Introduce shared abstractions when they remove meaningful duplication or clarify a stable concept.
- Remove obsolete code rather than leaving commented-out implementations or unused declarations.
- Add comments to explain non-obvious reasoning or constraints, not to narrate what the code already says.

## Naming and Formatting

- Use lowercase names for files and directories. Use a concise descriptive filename; use a feature-and-role pattern such as `<feature>.<role>.ts` when it matches the surrounding code.
- Use `camelCase` for variables and functions, and `PascalCase` for types and classes. Use uppercase names for environment variables and established constants.
- Follow the repository's prevailing style: single quotes, four-space indentation, and trailing commas in multiline structures.
- Match nearby code when a legacy file differs. Do not reformat unrelated lines as part of a behavior change.

## TypeScript and Modules

- Preserve strict type checking. Prefer precise types, `unknown`, or a narrow union over `any`; do not use type assertions to silence an error without establishing why they are safe.
- Use `import type` for imports used only as types.
- The project uses native ESM. Include `.js` extensions in relative TypeScript imports when required by the existing module convention; use configured aliases for supported source imports.
- Keep public interfaces and behavior stable unless the task requires a change. When changing them, update their callers and tests.

## Implementation and Error Handling

- Validate untrusted input at the system boundary before relying on its shape or contents.
- Await asynchronous work and handle failures through the established error flow. Do not silently discard rejected promises or catch errors without recovering, adding useful context, or forwarding them.
- Return safe, intentional responses to callers. Do not expose stack traces, secrets, credentials, or internal implementation details.
- Keep logs useful for diagnosis while excluding sensitive values and unnecessary personal data.
- Avoid hidden side effects. Make state changes, I/O, and retry behavior clear to the reader.

## Security and Dependencies

- Never commit credentials, secret values, or real local environment files. Use placeholders in examples and keep secrets in the appropriate runtime configuration.
- Treat external input and external responses as untrusted. Use parameterized APIs for data access rather than constructing executable queries from strings.
- Add a dependency only when it provides a needed capability that existing code or the platform does not reasonably provide. Consider maintenance, compatibility, and security before adding it.
- Use npm to change dependencies and keep `package.json` and `package-lock.json` synchronized.

## Tests and Verification

- Add or update tests when behavior changes. Prefer focused unit tests for isolated logic and integration tests when behavior depends on application wiring or external boundaries.
- Keep tests deterministic. Mock external dependencies when a test is not intended to exercise them; test real integration behavior explicitly when that is the purpose of the test.
- Run the applicable repository checks after code changes:

  ```bash
  npm run typecheck
  npm test -- --runInBand
  npm run build
  ```

- Report which checks passed and disclose any that could not be run. Do not claim that a check passed unless it was run successfully.

## Change Review

Before handing off a change, confirm that:

- It solves the requested problem without unrelated changes.
- Error paths, boundary conditions, and security implications have been considered.
- Tests cover meaningful behavior changes and the relevant checks have been run.
- Documentation and dependency metadata are updated when the change makes them inaccurate.
- The diff contains no secrets, generated artifacts, debug output, or unexplained temporary code.
