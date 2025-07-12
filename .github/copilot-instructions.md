# GitHub Copilot Instructions for TWS CLI

## Project Overview

TWS CLI is a command-line tool built with Deno and TypeScript that automates project creation workflows for "Tech with Seth" projects. It integrates with React Router, GitHub, Railway, and Trigger.dev to provide streamlined project scaffolding and deployment.

## Core Architecture & Patterns

### 1. Deno-First Development

-   **Runtime**: Use Deno as the primary runtime environment
-   **Imports**: Use npm: prefix for Node.js packages and jsr: for Deno modules
-   **Configuration**: All configuration lives in `deno.json`
-   **File Extensions**: Always use `.ts` extensions for TypeScript files

```typescript
// ✅ Correct import patterns
import { program } from 'npm:commander';
import { assertEquals } from '@std/assert';
import fs from 'npm:fs-extra';

// ❌ Avoid Node.js style imports
const fs = require('fs');
```

### 2. Command Pattern Architecture

-   **Main Entry**: `main.ts` serves as the CLI entry point using Commander.js
-   **Actions Directory**: All command implementations live in `actions/` directory
-   **Utilities**: Shared utilities go in `utils/` directory
-   **Modular Commands**: Each command should be its own module with exported async functions

```typescript
// ✅ Command structure pattern
const newProjectCommand = program.command('new').description('Project starter');

newProjectCommand
    .command('static')
    .argument('<name>', 'Project name')
    .action(async (projectName) => {
        await createReactRouterProject(projectName, './tws-static');
    });

newProjectCommand
    .command('package')
    .argument('<name>', 'Package name')
    .action(async (packageName) => {
        await createNpmPackageProject(packageName);
    });
```

### 3. Error Handling & User Feedback

-   **Success Messages**: Use green checkmarks (✅) for success states
-   **Error Messages**: Use red X marks (❌) for error states
-   **Process Exit**: Always exit with proper error codes using `Deno.exit(code)`
-   **Console Logging**: Provide clear, informative console output

```typescript
// ✅ Consistent feedback pattern
if (code === 0) {
    console.log('✅ Project created successfully!');
} else {
    console.error('❌ Failed to create project');
    Deno.exit(code);
}
```

## Coding Conventions

### 1. TypeScript Standards

-   **Strict Typing**: Always use explicit types for function parameters and return values
-   **Interfaces**: Define interfaces for complex data structures
-   **Async/Await**: Prefer async/await over Promises for readability
-   **Optional Parameters**: Use `?` for optional parameters and provide defaults where appropriate

```typescript
// ✅ Good interface definition
interface FileMeta {
    name: string;
    src: string;
    dist: string;
}

// ✅ Good function signature
async function runTool(
    toolName: string,
    args: string[],
    successMsg?: string,
    errorMsg?: string
): Promise<void>;
```

### 2. Function Naming & Organization

-   **Action Functions**: Use descriptive verb-noun patterns (e.g., `createReactRouterProject`, `copyTwsStatic`)
-   **Export Pattern**: Export main action functions, keep utilities internal when possible
-   **File Naming**: Use kebab-case for files, camelCase for functions and variables

### 3. Command Execution Patterns

-   **Deno.Command**: Use `Deno.Command` for external process execution
-   **Inherited Streams**: Use `stdout: 'inherit', stderr: 'inherit'` for real-time output
-   **Command Abstraction**: Wrap command execution in reusable functions

```typescript
// ✅ Standard command execution pattern
function createNewCommand(initialArg: string, args: string[]) {
    return new Deno.Command(initialArg, {
        args,
        stdout: 'inherit',
        stderr: 'inherit'
    });
}
```

## Domain-Specific Guidelines

### 1. Project Templates

-   **Template Types**: Support for `tws-static` React Router templates and npm package scaffolding
-   **Template Paths**: Use relative paths starting with `./` for local templates
-   **Project Names**: Always validate and sanitize project names from user input

### 2. External Tool Integration

-   **NPX Usage**: Use `npx create-react-router@latest` for React Router project creation
-   **GitHub CLI**: Use `gh` commands for repository creation and management
-   **npm/Changesets**: Use npm and Changesets for package publishing workflows
-   **Vitest**: Use Vitest for testing in generated packages

### 3. Configuration Management

-   **Environment Variables**: Use `env` from `node:process` for environment variable access
-   **Secrets**: Store sensitive data like npm tokens in environment variables
-   **Default Values**: Provide sensible defaults for optional configurations
-   **Git Repository Management**
    -   **Repository Initialization**: Always use `git init` to initialize repositories
    -   **Remote Origin Setup**: Configure remote origin URL using `git remote add origin <url>`
    -   **GitHub Integration**: Use consistent GitHub URL patterns (`https://github.com/sethdavis512/<name>.git`)
    -   **Error Handling**: Provide clear feedback for git operations success/failure

```typescript
// ✅ Git setup pattern
const gitInit = new Deno.Command('git', {
    args: ['init'],
    cwd: root,
    stdout: 'inherit',
    stderr: 'inherit'
});
const { code: gitCode } = await gitInit.output();

if (gitCode === 0) {
    console.log('✅ Initialized a new git repository.');
} else {
    console.error('❌ Failed to initialize git repository.');
}
```

## Testing Requirements

### 1. Test Organization

-   **Test Files**: Use `*_test.ts` naming convention
-   **Test Framework**: Use Deno's built-in testing with `@std/assert`
-   **Test Structure**: Use descriptive function names for test cases

```typescript
// ✅ Test structure pattern
import { assertEquals } from '@std/assert';

Deno.test(function projectCreationTest() {
    // Test implementation
});
```

### 2. Testing Practices

-   **Unit Tests**: Test individual functions in isolation
-   **Integration Tests**: Test command workflows end-to-end
-   **Mock External Calls**: Mock external CLI tools and APIs for reliable testing

## Performance & Security

### 1. Async Operations

-   **Parallel Execution**: Use `Promise.all()` for independent async operations
-   **Error Propagation**: Properly handle and propagate errors in async chains
-   **Resource Cleanup**: Ensure proper cleanup of file handles and processes

```typescript
// ✅ Parallel async operations
await Promise.all([
    fs.writeFile(`${root}/src/index.ts`, indexContent),
    fs.writeFile(`${root}/src/utils.ts`, utilsContent),
    fs.writeFile(`${root}/LICENSE`, licenseContent)
]);
```

### 2. Security Considerations

-   **Input Validation**: Validate all user inputs, especially project names
-   **Path Safety**: Use path utilities to prevent directory traversal
-   **Secret Management**: Never commit secrets; use environment variables

## Anti-Patterns to Avoid

### 1. Code Smells

-   **❌ Hardcoded Values**: Don't hardcode URLs, paths, or configuration
-   **❌ Synchronous Operations**: Avoid blocking synchronous calls for I/O
-   **❌ Silent Failures**: Always provide feedback for operations
-   **❌ Mixed Import Styles**: Don't mix npm: and require() imports

### 2. CLI Best Practices

-   **❌ Unclear Commands**: Avoid ambiguous command names or descriptions
-   **❌ No Help Text**: Always provide help text and examples
-   **❌ Poor Error Messages**: Don't use generic error messages

## Development Workflow

### 1. Local Development

```bash
# Development with watch mode
deno task dev:watch

# Run tests
deno test

# Compile for different platforms
deno task compile:mac
deno task compile:lin
deno task compile:win
```

### 2. File Structure

-   **Actions**: Command implementations (`actions/`)
-   **Utils**: Shared utilities (`utils/`)
-   **Tests**: Test files (`*_test.ts`)
-   **Config**: `deno.json` for all configuration
-   **Distribution**: Compiled binaries (`dist/`)

### 3. Current Commands

-   **`tws new static <name>`**: Creates a React Router project using the `./tws-static` template
-   **`tws new package <name>`**: Scaffolds a complete npm package with TypeScript, Prettier, Vitest, and Changesets
    -   Initializes git repository with `git init`
    -   Configures remote origin to `https://github.com/sethdavis512/<name>.git`
    -   Sets up complete CI/CD pipeline with GitHub Actions
    -   Includes ESLint, Prettier, and testing configuration

## Integration Guidelines

### 1. Adding New Commands

1. Create action function in `actions/` directory
2. Import and wire up in `main.ts`
3. Add appropriate error handling and user feedback
4. Write corresponding tests
5. Update this documentation

### 2. External Dependencies

-   **Prefer Deno**: Use Deno-native packages when available
-   **npm Packages**: Use npm: prefix for Node.js packages
-   **Version Pinning**: Pin versions in `deno.json` imports

### 3. Current Dependencies

-   **Commander.js**: CLI framework (`npm:commander`)
-   **fs-extra**: File system utilities (`npm:fs-extra`)
-   **@std/assert**: Deno testing assertions (`jsr:@std/assert`)
-   **@std/cli**: Deno CLI utilities (`jsr:@std/cli`)

## Documentation Standards

-   **Function Comments**: Document complex functions with JSDoc
-   **README Updates**: Keep README.md current with new features
-   **Changelog**: Document breaking changes and new features
-   **Examples**: Provide usage examples for new commands

---

_This file should be updated whenever new patterns, conventions, or architectural decisions are made to ensure GitHub Copilot generates code that follows project standards._
