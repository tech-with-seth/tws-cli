import { program } from 'npm:commander';
import { configure } from 'npm:@trigger.dev/sdk/v3';
import { env } from 'node:process';

import { createReactRouterProject } from './utils/common.ts';

configure({
    secretKey: env.TRIGGER_SECRET_KEY
});

program.name('tws-cli').description('A Tech with Seth CLI').version('0.0.1');

program
    .command('new')
    .description('Project starter')
    .command('static')
    .argument('<name>', 'Project name')
    .action(async (projectName) => {
        await createReactRouterProject(projectName, './tws-static');
    });

program.parse();
