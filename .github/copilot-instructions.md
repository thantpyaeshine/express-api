# Repository instructions for Copilot

Before making changes, inspect the relevant implementation, tests, and configuration. Use these repository guides:

- `.instructions/architecture.md` for app structure, request flow, configuration, build, and workflows.
- `.instructions/code-standards.md` for implementation, naming, security, testing, and validation conventions.
- `.instructions/library-doc.md` for dependency roles and maintenance.

Keep changes focused, follow existing architecture, add or update tests for behavior changes, and run the applicable existing checks (`npm run typecheck`, `npm test -- --runInBand`, and `npm run build`). Do not commit secrets. If source behavior changes, update the relevant guide so it remains accurate.

Keep instructions specific and concise. For more on repository custom instructions, see [GitHub's Copilot documentation](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide).
