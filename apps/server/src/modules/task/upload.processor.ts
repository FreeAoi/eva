import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { StorageService } from '../storage/storage.service';

@Processor('upload')
export class UploadConsumer {
    constructor(private storageService: StorageService) {}

    @Process('attachment')
    async transcode(job: Job) {
        const { taskId, attachments, studentId } = job.data;
        for (const attachment of attachments) {
            const URI = studentId
                ? `assignment_${taskId}/${studentId}/${attachment.filename}`
                : `assignment_${taskId}/${attachment.filename}`;
            await this.storageService.uploadFile(
                Buffer.from(attachment.buffer),
                URI
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
