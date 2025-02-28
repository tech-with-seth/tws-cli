import { program } from 'npm:commander';
import { configure } from 'npm:@trigger.dev/sdk/v3';
import { env } from 'node:process';

import {
    listTriggerRunsAction,
    triggerDocumentUpdater
} from './actions/trigger.dev.ts';

configure({
    secretKey: env.TRIGGER_SECRET_KEY
});

program.name('tws-cli').description('A Tech with Seth CLI').version('0.0.1');

const triggerCommand = program
    .command('trigger')
    .description('Access Trigger.dev API');

triggerCommand
    .command('runs')
    .command('list')
    .description('List Trigger.dev runs')
    .option('--status <runStatus>', 'List successful runs', 'COMPLETED')
    .action(listTriggerRunsAction);

triggerCommand
    .command('execute')
    .description('Execute a Trigger.dev task')
    .action(triggerDocumentUpdater);

program.parse();
