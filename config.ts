/**
 * Configuration settings for TWS CLI
 * Centralizes all user-specific and environment settings
 */

export interface TWSConfig {
  author: {
    name: string;
    email: string;
    website: string;
    githubUsername: string;
  };
  paths: {
    repositoriesRoot: string;
  };
  templates: {
    staticTemplate: string;
  };
}

/**
 * Default configuration - can be overridden by environment variables or config file
 */
export const defaultConfig: TWSConfig = {
  author: {
    name: Deno.env.get('TWS_AUTHOR_NAME') || 'Seth Davis',
    email: Deno.env.get('TWS_AUTHOR_EMAIL') || 'techwithseth512@gmail.com',
    website: Deno.env.get('TWS_AUTHOR_WEBSITE') || 'https://sethdavis.tech',
    githubUsername: Deno.env.get('TWS_GITHUB_USERNAME') || 'sethdavis512',
  },
  paths: {
    repositoriesRoot: Deno.env.get('TWS_REPOS_ROOT') || '/Users/seth/repositories',
  },
  templates: {
    staticTemplate: Deno.env.get('TWS_STATIC_TEMPLATE') || '/Users/seth/repositories/tws-static',
  },
};

/**
 * Get the current configuration
 */
export function getConfig(): TWSConfig {
  return defaultConfig;
}
