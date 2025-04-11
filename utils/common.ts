export async function createProject(projectName: string, templateDir: string) {
    console.log(`\nProject name: ${projectName}\n`);

    const commandArgs = [
        `create-react-router@latest`,
        projectName,
        `--template`,
        templateDir
    ];

    const cmsCommand = new Deno.Command('npx', {
        args: commandArgs
    });

    console.log(`Running command: "npx ${commandArgs.join(' ')}"`);

    const { code } = await cmsCommand.output();

    if (code === 0) {
        console.log('✅ Project created successfully!');
    } else {
        console.error('❌ Failed to create project');
    }
}
