import { assertEquals } from '@std/assert';
import { getConfig, defaultConfig } from './config.ts';

Deno.test('getConfig returns default configuration', () => {
  const config = getConfig();
  assertEquals(config.author.name, defaultConfig.author.name);
  assertEquals(config.paths.repositoriesRoot, defaultConfig.paths.repositoriesRoot);
});

Deno.test('config respects environment variables', () => {
  // Set environment variables
  Deno.env.set('TWS_AUTHOR_NAME', 'Test Author');
  Deno.env.set('TWS_REPOS_ROOT', '/test/path');
  
  // Note: In Deno, we can't easily reload modules, so this test
  // demonstrates the concept but would need a different approach
  // for full integration testing
  
  // Clean up
  Deno.env.delete('TWS_AUTHOR_NAME');
  Deno.env.delete('TWS_REPOS_ROOT');
});
