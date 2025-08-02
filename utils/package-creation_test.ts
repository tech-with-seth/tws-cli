import { assertEquals, assertThrows } from '@std/assert';
import { validatePackageName } from './package-creation.ts';

Deno.test('validatePackageName accepts valid names', () => {
  assertEquals(validatePackageName('my-package'), 'my-package');
  assertEquals(validatePackageName('my_package'), 'my_package');
  assertEquals(validatePackageName('mypackage123'), 'mypackage123');
  assertEquals(validatePackageName('a'), 'a');
});

Deno.test('validatePackageName rejects invalid names', () => {
  assertThrows(
    () => validatePackageName('my package'),
    Error,
    'Invalid package name'
  );
  
  assertThrows(
    () => validatePackageName('my@package'),
    Error,
    'Invalid package name'
  );
  
  assertThrows(
    () => validatePackageName('my.package'),
    Error,
    'Invalid package name'
  );
  
  assertThrows(
    () => validatePackageName(''),
    Error,
    'Invalid package name'
  );
});

Deno.test('validatePackageName handles edge cases', () => {
  assertEquals(validatePackageName('a-b-c-d'), 'a-b-c-d');
  assertEquals(validatePackageName('a_b_c_d'), 'a_b_c_d');
  assertEquals(validatePackageName('package123'), 'package123');
});

// Integration test would require file system operations
// For now, we'll focus on unit tests for the pure functions
