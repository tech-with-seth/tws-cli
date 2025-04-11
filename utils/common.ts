function createNewCommand(initialArg: string, args: string[]) {
    return new Deno.Command(initialArg, {
        args,
        stdout: 'inherit',
        stderr: 'inherit'
    });
}

async function runTool(
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

    await runTool('npx', [
        `create-react-router@latest`,
        projectName,
        `--template`,
        templateDir,
        `--git-init`,
        `--install`
    ]);

    await runTool('gh', [
        'repo',
        'create',
        projectName,
        '--public',
        '--source',
        `./${projectName}`,
        '--push'
    ]);

    // COMMENTING UNTIL INIT CAN TAKE A TEAM

    // await runTool(
    //     'railway',
    //     ['init', '--name', projectName],
    //     '✅ Successfully initialized',
    //     '❌ Failed to initialize Railway project...'
    // );
    // await runTool(
    //     'railway',
    //     [
    //         'link',
    //         '--project',
    //         projectName,
    //         '--team',
    //         `Seth Davis's Projects`,
    //         '--environment',
    //         'prod'
    //     ],
    //     '✅ Successfully linked Railway project',
    //     '❌ Failed to link Railway project...'
    // );
    // await runTool(
    //     'railway',
    //     ['up'],
    //     '✅ Successfully deployed',
    //     '❌ Failed to deploy Railway project...'
    // );
}
