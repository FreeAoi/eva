import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { R2Service } from '../../providers/storage/r2.service';
import { PrismaService } from '../../providers/database/prisma.service';

@Processor('upload')
export class UploadConsumer {
    constructor(private storageService: R2Service, private prismaService: PrismaService) {}

    @Process()
    async transcode(job: Job) {
        const { taskId, attachments, studentId } = job.data as JobData;
        const attachmentarr: { filename: string; URI: string }[] = [];

        for (const attachment of attachments) {
            const URI = studentId
                ? `assignment_${taskId}/${studentId}/${attachment.filename}`
                : `assignment_${taskId}/${attachment.filename}`;
            await this.storageService.uploadFile(Buffer.from(attachment.buffer), URI);
            attachmentarr.push({ filename: attachment.filename, URI });
        }

        if (studentId) this.createSubmissionAttachment(taskId, attachmentarr, studentId);
        else this.createTaskAttachment(taskId, attachmentarr);
    }

    private createTaskAttachment(taskId: number, attachments: { filename: string; URI: string }[]) {
        return this.prismaService.taskAttachment.createMany({
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

    private createSubmissionAttachment(
        taskId: number,
        attachments: { filename: string; URI: string }[],
        studentId: string
    ) {
        this.prismaService.taskSubmission.create({
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
        filename: string;
        buffer: Buffer;
    }[];
    taskId: number;
    studentId?: string;
}
