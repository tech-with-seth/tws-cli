import { program } from 'npm:commander';

import { createReactRouterProject } from './utils/common.ts';
import { createNpmPackageProject } from './actions/package.ts';

program.name('tws-cli').description('A Tech with Seth CLI').version('0.0.1');

const newProjectCommand = program.command('new').description('Project starter');

newProjectCommand
    .command('static')
    .argument('<name>', 'Project name')
    .action(async (projectName) => {
        await createReactRouterProject(projectName, './tws-static');
    });

newProjectCommand
    .command('package')
    .argument('<name>', 'Package name')
    .action(async (packageName) => {
        await createNpmPackageProject(packageName);
    });

program.parse();
