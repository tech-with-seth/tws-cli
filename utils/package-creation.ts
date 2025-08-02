import fs from 'npm:fs-extra';
import { getConfig } from '../config.ts';
import { processTemplate, createTemplateVars } from './templates.ts';
import { executeCommandOrExit, executeCommand } from './commands.ts';

/**
 * Validates and sanitizes npm package name
 */
export function validatePackageName(name: string): string {
  const valid = /^([a-zA-Z0-9-_]+)$/;
  if (!valid.test(name)) {
    throw new Error(
      '❌ Invalid package name. Use only letters, numbers, dashes, and underscores.'
    );
  }
  return name;
}

/**
 * Creates the basic directory structure for the package
 */
export async function createDirectoryStructure(packagePath: string): Promise<void> {
  if (await fs.pathExists(packagePath)) {
    console.error('❌ Directory already exists.');
    Deno.exit(1);
  }
  
  await fs.ensureDir(`${packagePath}/src`);
  await fs.ensureDir(`${packagePath}/.github/workflows`);
  console.log('✅ Created directory structure');
}

/**
 * Generates package.json with all necessary configuration
 */
export async function createPackageJson(packagePath: string, packageName: string): Promise<void> {
  const config = getConfig();
  
  const pkgJson = {
    name: packageName,
    version: '1.0.0',
    description: `A new npm package: ${packageName}`,
    keywords: ['typescript', 'package'],
    homepage: `https://github.com/${config.author.githubUsername}/${packageName}`,
    bugs: {
      url: `https://github.com/${config.author.githubUsername}/${packageName}/issues`
    },
    author: `${config.author.name} <${config.author.email}> (${config.author.website})`,
    repository: {
      type: 'git',
      url: `git+https://github.com/${config.author.githubUsername}/${packageName}.git`
    },
    files: ['dist'],
    type: 'module',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    scripts: {
      build: 'tsc',
      test: 'vitest run',
      dev: 'vitest',
      ci: 'npm run build && npm run test',
      format: 'prettier --write .',
      'check-format': 'prettier --check .',
      changeset: 'changeset',
      release: 'changeset version',
      prepublishOnly: 'npm run ci'
    },
    license: 'MIT'
  };
  
  await fs.writeJson(`${packagePath}/package.json`, pkgJson, { spaces: 2 });
  console.log('✅ Created package.json');
}

/**
 * Creates all template-based files (LICENSE, README, etc.)
 */
export async function createTemplateFiles(packagePath: string, packageName: string): Promise<void> {
  const templateVars = createTemplateVars(packageName);
  const templatesDir = new URL('../templates/', import.meta.url).pathname;
  
  // Create LICENSE
  const licenseContent = await processTemplate(`${templatesDir}LICENSE.txt`, templateVars);
  await fs.writeFile(`${packagePath}/LICENSE`, licenseContent);
  
  // Create README
  const readmeContent = await processTemplate(`${templatesDir}README.md`, templateVars);
  await fs.writeFile(`${packagePath}/README.md`, readmeContent);
  
  // Create TypeScript config
  const tsconfigContent = await processTemplate(`${templatesDir}tsconfig.json`, templateVars);
  await fs.writeFile(`${packagePath}/tsconfig.json`, tsconfigContent);
  
  // Create GitHub workflow
  const workflowContent = await processTemplate(`${templatesDir}publish.yml`, templateVars);
  await fs.writeFile(`${packagePath}/.github/workflows/publish.yml`, workflowContent);
  
  console.log('✅ Created template files');
}

/**
 * Creates source files with basic TypeScript setup
 */
export async function createSourceFiles(packagePath: string): Promise<void> {
  // Create main source file
  await fs.writeFile(
    `${packagePath}/src/index.ts`,
    `export { add } from "./utils.js";\n`
  );
  
  // Create utils file
  await fs.writeFile(
    `${packagePath}/src/utils.ts`,
    `export function add(a: number, b: number): number {\n  return a + b;\n}\n`
  );
  
  // Create test file
  await fs.writeFile(
    `${packagePath}/src/utils.test.ts`,
    `import { add } from "./utils.js";\nimport { test, expect } from "vitest";\n\ntest("add", () => {\n  expect(add(1, 2)).toBe(3);\n});\n`
  );
  
  console.log('✅ Created source files');
}

/**
 * Initializes git repository and sets up remote
 */
export async function setupGitRepository(packagePath: string, packageName: string): Promise<void> {
  const config = getConfig();
  
  await executeCommandOrExit('git', ['init'], {
    cwd: packagePath,
    successMsg: 'Initialized git repository'
  });
  
  await executeCommandOrExit('git', [
    'remote', 'add', 'origin',
    `https://github.com/${config.author.githubUsername}/${packageName}.git`
  ], {
    cwd: packagePath,
    successMsg: 'Added remote origin'
  });
}

/**
 * Installs npm dependencies
 */
export async function installDependencies(packagePath: string): Promise<void> {
  await executeCommandOrExit('npm', [
    'install', '--save-dev',
    'typescript', 'prettier', 'vitest', '@changesets/cli'
  ], {
    cwd: packagePath,
    successMsg: 'Dependencies installed'
  });
}

/**
 * Formats code with Prettier
 */
export async function formatCode(packagePath: string): Promise<void> {
  // Try to format, but don't fail if it doesn't work
  const success = await executeCommand('npm', ['run', 'format'], {
    cwd: packagePath,
    successMsg: 'Code formatted with Prettier',
    errorMsg: '⚠️  Prettier formatting failed, but continuing...'
  });
  
  if (!success) {
    console.log('⚠️  Prettier formatting failed, but continuing...');
  }
}
