enum ProjectRepos {
    TWS_STATIC = './tws-static'
}

export const templateChoices: Array<string> = Object.keys(ProjectRepos).map(
    (k) => k.toLowerCase().replace('_', '-')
);

export async function copyTwsStatic(
    projectName: string,
    options: {
        template?: string;
        gitInit?: boolean;
        npmInstall?: boolean;
    }
) {
    console.log(
        `\nProject name: ${projectName}
Template: ${options.template}
Initialize new repo: ${options.gitInit}
Run npm install: ${options.npmInstall}\n`
    );

    const commandArgs = ['create-react-router@latest', projectName];

    // React Router projects are created from templates. A template can be one of the following:
    // - GitHub repo shorthand: `:username/:repo` or `:username/:repo/:directory`
    // - URL of a GitHub repo (or directory within it)
    // - URL of a tarball
    // - File path to a directory of files
    // - File path to a tarball
    //
    // Examples:
    // - "remix-run/react-router/templates/basic"
    // - "remix-run/react-router/examples/basic"
    // - ":username/:repo"
    // - ":username/:repo/:directory"
    // - "https://github.com/:username/:repo"
    // - "https://github.com/:username/:repo/tree/:branch"
    // - "https://github.com/:username/:repo/tree/:branch/:directory"
    // - "https://github.com/:username/:repo/archive/refs/tags/:tag.tar.gz"
    // - "https://example.com/template.tar.gz"
    // - "./path/to/template"
    // - "./path/to/template.tar.gz"

    if (options.template) {
        const chosen = options.template
            .toUpperCase()
            .replace('-', '_') as keyof typeof ProjectRepos;

        commandArgs.push(`--template`, ProjectRepos[chosen]);
    }

    if (options.gitInit) {
        commandArgs.push('--git-init');
    }

    if (options.npmInstall) {
        commandArgs.push('--install');
    }

    const npxReactRouterCommand = new Deno.Command('npx', {
        args: commandArgs
    });

    console.log(`Running command: "npx ${commandArgs.join(' ')}"`);

    const { code } = await npxReactRouterCommand.output();

    if (code === 0) {
        console.log('✅ Project created successfully!');
    } else {
        console.error('❌ Failed to create project');
    }
}
