import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import type { FileUpload } from '../../common/interceptors/files.interceptor';

@Injectable()
export class UploadProducer {
    constructor(@InjectQueue('upload') private upload: Queue) {}

    async uploadAttachments(files: FileUpload[], taskId: number, studentId?: string) {
        const attachments = files.map((file) => ({
            name: file.filename,
            buffer: file.stream
        }));

        await this.upload.add({ attachments, taskId, studentId }, { removeOnComplete: true });
    }
}
