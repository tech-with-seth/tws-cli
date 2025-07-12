function createNewCommand(initialArg: string, args: string[]) {
    return new Deno.Command(initialArg, {
        args,
        stdout: 'inherit',
        stderr: 'inherit'
    });
}

export async function runCommand(
    toolName: string,
    args: string[],
    successMsg?: string,
    errorMsg?: string
) {
    console.log(`\nTool name: ${toolName}\n`);

    const cmd = createNewCommand(toolName, args);
    console.log(`Running command: "${toolName} ${args.join(' ')}"`);

    const { code } = await cmd.output();

    if (code === 0) {
        console.log(successMsg ?? `✅ ${toolName} ran successfully!`);
    } else {
        console.error(errorMsg ?? '❌ ${toolName} failed...');
        Deno.exit(code);
    }
}

export async function createReactRouterProject(
    projectName: string,
    templateDir: string
) {
    console.log(`\nProject name: ${projectName}\n`);

    await runCommand('npx', [
        `create-react-router@latest`,
        projectName,
        `--template`,
        templateDir,
        `--git-init`,
        `--install`
    ]);

    await runCommand('gh', [
        'repo',
        'create',
        projectName,
        '--public',
        '--source',
        `./${projectName}`,
        '--push'
    ]);
}
