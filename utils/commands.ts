/**
 * Enhanced command execution utilities
 * Provides consistent error handling and logging for shell commands
 */

export interface CommandOptions {
  cwd?: string;
  successMsg?: string;
  errorMsg?: string;
  silent?: boolean;
}

/**
 * Execute a shell command with consistent error handling
 */
export async function executeCommand(
  command: string,
  args: string[],
  options: CommandOptions = {}
): Promise<boolean> {
  const { cwd, successMsg, errorMsg, silent = false } = options;
  
  if (!silent) {
    console.log(`\nRunning: ${command} ${args.join(' ')}`);
  }

  const cmd = new Deno.Command(command, {
    args,
    cwd,
    stdout: 'inherit',
    stderr: 'inherit'
  });

  const { code } = await cmd.output();

  if (code === 0) {
    if (!silent && successMsg) {
      console.log(`✅ ${successMsg}`);
    }
    return true;
  } else {
    if (!silent) {
      console.error(errorMsg || `❌ ${command} failed with exit code ${code}`);
    }
    return false;
  }
}

/**
 * Execute a command and exit the process if it fails
 */
export async function executeCommandOrExit(
  command: string,
  args: string[],
  options: CommandOptions = {}
): Promise<void> {
  const success = await executeCommand(command, args, options);
  if (!success) {
    Deno.exit(1);
  }
}
