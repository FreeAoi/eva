import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class UploadProducer {
    constructor(@InjectQueue('upload') private upload: Queue) {}

    async uploadAttachments(
        files: Express.Multer.File[],
        taskId: number,
        studentId?: string
    ) {
        const attachments = files.map((file) => ({
            name: file.originalname,
            buffer: file.buffer,
        }));

        await this.upload.add(
            'task',
            { attachments, taskId, studentId },
            { removeOnComplete: true }
        );
    }

    async uploadAvatar(file: Express.Multer.File, studentId: string) {
        await this.upload.add(
            'avatar',
            {
                attachment: { name: file.originalname, buffer: file.buffer },
                studentId,
            },
            { removeOnComplete: true }
        );
    }
}
