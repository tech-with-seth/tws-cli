import { Option, program } from 'npm:commander';
import { configure } from 'npm:@trigger.dev/sdk/v3';
import { env } from 'node:process';

import { copyTwsStatic, templateChoices } from './actions/static.ts';

configure({
    secretKey: env.TRIGGER_SECRET_KEY
});

program.name('tws-cli').description('A Tech with Seth CLI').version('0.0.1');

program
    .command('new')
    .description('Project starter')
    .command('static')
    .argument('<name>', 'Project name')
    .addOption(
        new Option('--template <item>', 'Template repo').choices(
            templateChoices
        )
    )
    .option('--git-init', 'Initialize repo', false)
    .option('--npm-install', 'Install node modules', false)
    .action(copyTwsStatic);

program.parse();
