export async function copyTwsStatic(projectName: string) {
    console.log(`\nProject name: ${projectName}\n`);

    const commandArgs = [
        `create-react-router@latest`,
        projectName,
        `--template`,
        `./tws-static`
    ];

    const staticCommand = new Deno.Command('npx', {
        args: commandArgs
    });

    console.log(`Running command: "npx ${commandArgs.join(' ')}"`);

    const { code } = await staticCommand.output();

    if (code === 0) {
        console.log('✅ Project created successfully!');
    } else {
        console.error('❌ Failed to create project');
    }
}
