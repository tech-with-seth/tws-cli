import { runs, tasks } from 'npm:@trigger.dev/sdk/v3';

type TriggerRunStatus =
    | 'WAITING_FOR_DEPLOY'
    | 'QUEUED'
    | 'EXECUTING'
    | 'REATTEMPTING'
    | 'FROZEN'
    | 'COMPLETED'
    | 'CANCELED'
    | 'FAILED'
    | 'CRASHED'
    | 'INTERRUPTED'
    | 'SYSTEM_FAILURE';

// enum TriggerTaskName {
//     DOCUMENT_UPDATER = 'document-updater'
// }

export async function listTriggerRunsAction(options: {
    status: TriggerRunStatus;
}) {
    if (options.status) {
        const result = await runs.list({
            limit: 10,
            status: options.status
        });

        console.log(result);
    }
}

export async function triggerDocumentUpdater() {
    const handle = await tasks.trigger('document-updater', {});
    console.log({ handle });
}
