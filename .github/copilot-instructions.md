# Copilot Instructions for TWS CLI

## Project Overview

-   **TWS CLI** is a Deno-based command-line tool for automating project creation workflows, especially for Tech with Seth templates.
-   The CLI scaffolds new React Router projects and npm package projects with opinionated defaults, GitHub integration, and automated setup.

## Architecture & Key Files

-   **Entry Point:** `main.ts` (uses `commander` for CLI parsing)
-   **Project Actions:**
    -   `utils/common.ts`: Logic for creating React Router projects, running shell commands
    -   `actions/package.ts`: Logic for scaffolding npm package projects (directory, files, CI, formatting, etc.)
-   **Configuration:**
    -   `deno.json`: Deno tasks for building, compiling, and running the CLI
    -   `.vscode/settings.json`: Enables Deno support in VS Code

## Command Structure

-   `tws-cli new static <name>`: Creates a React Router project using a local template, initializes Git, installs dependencies, and creates a GitHub repo
-   `tws-cli new package <name>`: Creates a new npm package project with TypeScript, Prettier, Vitest, Changesets, and GitHub Actions
-   All commands are defined in `main.ts` and delegate to action modules

## Developer Workflows

-   **Build CLI for Distribution:**
    -   Use Deno tasks in `deno.json` (e.g., `deno task compile:mac`)
    -   Compiled binaries are output to `dist/`
-   **Development:**
    -   `deno task dev` or `deno task dev:watch` for local development
-   **Testing:**
    -   Minimal tests in `main_test.ts` (expand as needed)
-   **Debugging:**
    -   Console output is used for status and errors; failures exit with nonzero code

## Project-Specific Patterns & Conventions

-   **Project scaffolding is opinionated:**
    -   React projects use a static template at `/Users/seth/repositories/tws-static`
    -   Package projects enforce naming rules and set up CI, formatting, and release workflows
    -   All generated projects are initialized with Git and pushed to GitHub
-   **Shell commands are run via Deno.Command** for cross-platform compatibility
-   **No global state:** All logic is function-based and stateless
-   **Error handling:**
    -   Failures print clear error messages and exit
    -   Directory existence and name validation are enforced before project creation

## Integration Points

-   **GitHub CLI (`gh`)** is required for repo creation and pushing
-   **Node.js tools** (`npx`, `npm`) are invoked for project setup
-   **VS Code (`code`)** is optionally invoked to open new projects

## Examples

-   See `README.md` for example CLI usage and expected project structure
-   Generated package projects include detailed `README.md` and workflow files

## Recommendations for AI Agents

-   Follow the patterns in `actions/package.ts` and `utils/common.ts` for new project types
-   Use Deno tasks for builds and local dev; do not add Node.js-specific scripts to this CLI
-   When adding new commands, extend the `main.ts` CLI structure and delegate to new modules
-   Keep all project scaffolding logic stateless and explicit

---

For more details, see the top-level `README.md` and referenced action modules.
