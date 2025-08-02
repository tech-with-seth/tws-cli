import { getConfig } from '../config.ts';

/**
 * Template variable replacements
 */
export interface TemplateVars {
  PACKAGE_NAME: string;
  AUTHOR_NAME: string;
  AUTHOR_EMAIL: string;
  AUTHOR_WEBSITE: string;
  GITHUB_USERNAME: string;
  YEAR: string;
}

/**
 * Read and process a template file with variable substitution
 */
export async function processTemplate(templatePath: string, vars: TemplateVars): Promise<string> {
  const templateContent = await Deno.readTextFile(templatePath);
  
  let processed = templateContent;
  for (const [key, value] of Object.entries(vars)) {
    const placeholder = `{{${key}}}`;
    processed = processed.replaceAll(placeholder, value);
  }
  
  return processed;
}

/**
 * Create template variables from config and package name
 */
export function createTemplateVars(packageName: string): TemplateVars {
  const config = getConfig();
  
  return {
    PACKAGE_NAME: packageName,
    AUTHOR_NAME: config.author.name,
    AUTHOR_EMAIL: config.author.email,
    AUTHOR_WEBSITE: config.author.website,
    GITHUB_USERNAME: config.author.githubUsername,
    YEAR: new Date().getFullYear().toString(),
  };
}
