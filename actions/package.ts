import { getConfig } from '../config.ts';
import {
  validatePackageName,
  createDirectoryStructure,
  createPackageJson,
  createTemplateFiles,
  createSourceFiles,
  setupGitRepository,
  installDependencies,
  formatCode,
} from '../utils/package-creation.ts';

/**
 * Main action to scaffold a new npm package project.
 * 
 * This function orchestrates the creation of a complete npm package with:
 * - TypeScript configuration
 * - Testing setup with Vitest
 * - Code formatting with Prettier
 * - Version management with Changesets
 * - GitHub Actions CI/CD
 * - Git repository initialization
 */
export async function createNpmPackageProject(packageName: string): Promise<void> {
  try {
    console.log(`\n🚀 Creating npm package: ${packageName}\n`);
    
    // Validate package name
    const validatedName = validatePackageName(packageName);
    const config = getConfig();
    const packagePath = `${config.paths.repositoriesRoot}/${validatedName}`;
    
    // Create project structure and files
    await createDirectoryStructure(packagePath);
    await createPackageJson(packagePath, validatedName);
    await createTemplateFiles(packagePath, validatedName);
    await createSourceFiles(packagePath);
    
    // Setup git and install dependencies
    await setupGitRepository(packagePath, validatedName);
    await installDependencies(packagePath);
    await formatCode(packagePath);
    
    console.log(`\n✅ Successfully created npm package '${validatedName}'!`);
    console.log(`\n📁 Location: ${packagePath}`);
    console.log(`\n🔗 Next steps:`);
    console.log(`   1. cd ${packagePath}`);
    console.log(`   2. gh repo create ${config.author.githubUsername}/${validatedName} --public --push`);
    console.log(`   3. Start coding in src/utils.ts`);
    console.log(`   4. Run 'npm run dev' to start testing`);
    
  } catch (error) {
    console.error(`\n❌ Failed to create package: ${(error as Error).message}`);
    Deno.exit(1);
  }
}
