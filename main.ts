import { program } from 'npm:commander';
import { configure } from 'npm:@trigger.dev/sdk/v3';
import { env } from 'node:process';

import { createProject } from './utils/common.ts';

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
        await createProject(projectName, './tws-static');
    });

program.parse();
