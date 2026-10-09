# Repository Instructions for Copilot

Use these instructions when working in this repository. Inspect the relevant source, tests, and configuration before proposing or making changes. Follow established patterns unless the task requires changing them.

## Repository Guides

- [Architecture](../.instructions/architecture.md): application structure, request flow, configuration, build, tests, and delivery workflows.
- [Code standards](../.instructions/code-standards.md): implementation, naming, TypeScript, security, testing, and review conventions.
- [Dependency guide](../.instructions/library-doc.md): dependency roles, maintenance, and package changes.

Consult the guide relevant to the task. Keep this file focused on collaboration and change workflow; do not duplicate the detailed guidance in those documents.

## Change Expectations

- Keep changes focused and preserve unrelated behavior and existing user changes.
- Add or update tests for behavior changes. Prefer existing test patterns and keep tests deterministic.
- Do not commit secrets, credentials, or real environment files.
- Follow documented standards, usage guidance, and patterns. If existing code materially conflicts with a guide, or a proposed change would materially depart from it, ask whether to change the code to conform or update the guide to reflect an intentional change.
- Update documentation when implementation changes make it inaccurate. For a major new dependency or substantial new file/folder structure, identify the affected guides and ask whether the broader documentation update is in scope.
- When adding, removing, or changing a direct dependency, keep `package.json` and `package-lock.json` synchronized and update the dependency guide.

## Progress and Uncertainty

If work stalls or conclusions depend on unverified assumptions, explain what is uncertain and ask whether the user would like you to continue or stop before proceeding speculatively.

## Validation

Run the applicable project checks after code changes:

```bash
npm run typecheck
npm test -- --runInBand
npm run build
```

Report which checks passed and identify any that could not be run. Do not claim a check passed unless it completed successfully.
