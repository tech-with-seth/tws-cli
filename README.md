# TWS CLI

A Tech with Seth tool for automating project creation workflows.

## Usage

The TWS CLI provides commands to quickly scaffold new projects with Tech with Seth templates and configurations.

### Basic Commands

```bash
# Show help and available commands
tws-cli --help

# Show version
tws-cli --version
```

### Project Creation

#### Create a Static React Router Project

Creates a new React Router project using the TWS static template:

```bash
tws-cli new static <project-name>
```

**Example:**

```bash
tws-cli new static my-portfolio-site
```

This command will:

-   Create a new React Router project with the specified name
-   Use the `./tws-static` template
-   Initialize Git repository
-   Install dependencies automatically
-   Create a public GitHub repository
-   Set up the project for deployment

#### Create a Package Project

Creates a new package project with basic Git setup:

```bash
tws-cli new package <package-name>
```

**Example:**

```bash
tws-cli new package my-utility-package
```

This command will:

-   Create a new directory in `~/repositories/<package-name>`
-   Initialize a Git repository
-   Create a `.gitignore` file with `node_modules/`

### Getting Help

```bash
# Show all available commands
tws-cli --help

# Show help for the 'new' command group
tws-cli new --help

# Show help for any specific command
tws-cli help [command]
```

### Command Structure

The CLI follows a hierarchical command structure:

```text
tws-cli
├── new                    # Project creation commands
│   ├── static <name>     # Create React Router static site
│   └── package <name>    # Create basic package project
├── --version             # Show CLI version
└── --help               # Show help information
```

## Compilation

### Building Standalone Executables

You can compile the TWS CLI into standalone executables for different platforms using Deno's compilation tasks:

```bash
# Compile for macOS (Apple Silicon)
deno task compile:mac

# Compile for Linux (x86_64)
deno task compile:lin

# Compile for Windows (x86_64)
deno task compile:win
```

The compiled binaries will be created in the `dist/` directory:

-   `dist/tws-cli-mac` - macOS executable
-   `dist/tws-cli-lin` - Linux executable
-   `dist/tws-cli-win` - Windows executable

### Running Compiled Binaries

Once compiled, you can run the standalone executable directly without needing Deno installed:

```bash
# Run the macOS binary
./dist/tws-cli-mac --help

# Make it globally available (optional)
sudo cp ./dist/tws-cli-mac /usr/local/bin/tws-cli
```

**Note:** Compiled binaries include all dependencies and the Deno runtime, making them completely self-contained.

## Examples

### Creating a Portfolio Website

```bash
# Create a new static site project
tws-cli new static my-portfolio

# This creates a React Router project with:
# - TWS static template
# - Git initialization
# - Dependency installation
# - GitHub repository creation
```

### Creating a Utility Package

```bash
# Create a new package project
tws-cli new package awesome-utils

# This creates a basic project structure with:
# - Directory creation
# - Git initialization
# - Basic .gitignore file
```

## Notes

-   All commands require appropriate permissions (network access for GitHub, file system access)
-   The CLI integrates with GitHub CLI for repository creation
-   Projects are created with sensible defaults for Tech with Seth workflows
