import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { R2Service } from '../../providers/storage/r2.service';
import { PrismaService } from '../../providers/database/prisma.service';

@Processor('upload')
export class UploadConsumer {
    constructor(
        private storageService: R2Service,
        private prismaService: PrismaService
    ) {}

    @Process('task')
    async transcode(job: Job) {
        const { taskId, attachments, studentId } = job.data as JobData;
        const attachmentarr: { filename: string; URI: string }[] = [];

        for (const attachment of attachments) {
            const URI = studentId
                ? `assignment_${taskId}/${studentId}/${attachment.name}`
                : `assignment_${taskId}/${attachment.name}`;
            await this.storageService.uploadFile(Buffer.from(attachment.buffer), URI);
            attachmentarr.push({ filename: attachment.name, URI });
        }

        if (studentId)
            await this.createSubmissionAttachment(taskId, attachmentarr, studentId);
        else await this.createTaskAttachment(taskId, attachmentarr);
    }

    private async createTaskAttachment(
        taskId: number,
        attachments: { filename: string; URI: string }[]
    ) {
        await this.prismaService.attachment.createMany({
            data: attachments.map((attachment) => ({
                task: {
                    connect: {
                        id: taskId
                    }
                },
                name: attachment.filename,
                url: attachment.URI
            }))
        });
    }

    private async createSubmissionAttachment(
        taskId: number,
        attachments: { filename: string; URI: string }[],
        studentId: string
    ) {
        console.log(attachments);
        await this.prismaService.taskSubmission.create({
            data: {
                task: {
                    connect: {
                        id: taskId
                    }
                },
                student: {
                    connect: {
                        id: studentId
                    }
                },
                attachments: {
                    createMany: {
                        data: attachments.map((attachment) => ({
                            name: attachment.filename,
                            url: attachment.URI
                        }))
                    }
                },
                score: 0
            }
        });
    }

    @Process('avatar')
    async uploadAvatar(job: Job) {
        const { attachment, studentId } = job.data;
        console.log(attachment, studentId);
        const URI = `avatar/${studentId}`;
        await this.storageService.uploadFile(Buffer.from(attachment.buffer), URI);
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

interface JobData {
    attachments: {
        name: string;
        buffer: Buffer;
    }[];
    taskId: number;
    studentId?: string;
}
