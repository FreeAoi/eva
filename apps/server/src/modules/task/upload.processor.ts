import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { StorageService } from '../storage/storage.service';
@Processor('upload')
export class UploadConsumer {
    constructor(private storageService: StorageService) {}

    @Process('attachment')
    async transcode(job: Job) {
        const { taskId, attachments } = job.data;
        for (const attachment of attachments) {
            await this.storageService.uploadFile(
                Buffer.from(attachment.buffer),
                `assignment_${taskId}/${attachment.filename}`
            );
        }
    }

    @OnQueueError()
    async onError(error: Error) {
        console.log(error);
    }

    @OnQueueFailed()
    async onFailed(job: Job, error: Error) {
        console.log(job);
        console.log(error);
    }
}
