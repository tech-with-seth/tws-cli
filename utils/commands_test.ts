import { assertEquals } from '@std/assert';
import { executeCommand } from './commands.ts';

Deno.test('executeCommand succeeds with valid command', async () => {
  const result = await executeCommand('echo', ['hello'], { silent: true });
  assertEquals(result, true);
});

Deno.test('executeCommand fails with invalid command', async () => {
  // Use a command that will definitely fail but won't throw an exception
  const result = await executeCommand('sh', ['-c', 'exit 1'], { silent: true });
  assertEquals(result, false);
});

Deno.test('executeCommand respects cwd option', async () => {
  // Create a temporary directory for testing
  const tempDir = await Deno.makeTempDir();
  
  try {
    // Create a test file in the temp directory
    await Deno.writeTextFile(`${tempDir}/test.txt`, 'test content');
    
    // Run ls command in the temp directory
    const result = await executeCommand('ls', ['test.txt'], { 
      cwd: tempDir, 
      silent: true 
    });
    
    assertEquals(result, true);
  } finally {
    // Clean up
    await Deno.remove(tempDir, { recursive: true });
  }
});

Deno.test('executeCommand handles success and error messages', async () => {
  // Test with success message
  const result1 = await executeCommand('echo', ['test'], {
    silent: true,
    successMsg: 'Command succeeded'
  });
  assertEquals(result1, true);
  
  // Test with error message
  const result2 = await executeCommand('false', [], {
    silent: true,
    errorMsg: 'Command failed as expected'
  });
  assertEquals(result2, false);
});
