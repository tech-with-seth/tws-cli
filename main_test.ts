import { assertEquals } from '@std/assert';
import { createNpmPackageProject } from './actions/package.ts';
import { validatePackageName } from './utils/package-creation.ts';

Deno.test('validatePackageName works correctly', () => {
    assertEquals(validatePackageName('test-package'), 'test-package');
});

Deno.test('CLI exports main functions', () => {
    assertEquals(typeof createNpmPackageProject, 'function');
});
