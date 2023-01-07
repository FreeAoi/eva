import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { StorageService } from '../storage/storage.service';
import { PrismaService } from '../../providers/prisma/prisma.service';

interface Attachment {
    filename: string;
    buffer: Buffer;
}

interface JobData {
    attachments: Attachment[];
    taskId: number;
    studentId?: string;
}

@Processor('upload')
export class UploadConsumer {
    constructor(
        private storageService: StorageService,
        private prismaService: PrismaService
    ) {}

    // TODO: refactor this because its too long
    @Process('attachment')
    async transcode(job: Job) {
        const { taskId, attachments, studentId } = job.data as JobData;
        for (const attachment of attachments) {
            const URI = studentId
                ? `assignment_${taskId}/${studentId}/${attachment.filename}`
                : `assignment_${taskId}/${attachment.filename}`;
            await this.storageService.uploadFile(
                Buffer.from(attachment.buffer),
                URI
            );
        }

        if (studentId) this.createSubmission(taskId, studentId, attachments);
        else await this.updateTask(taskId, attachments);
    }

    private async updateTask(taskId: number, attachments: Attachment[]) {
        await this.prismaService.task.update({
            where: {
                id: taskId
            },
            data: {
                attachments: {
                    createMany: {
                        data: attachments.map((attachment) => ({
                            name: attachment.filename,
                            url: `${process.env.R2_PUBLIC_URL}/assignment_${taskId}/${attachment.filename}`
                        }))
                    }
                }
            }
        });
    }

    private createSubmission(
        taskId: number,
        studentId: string,
        attachments: Attachment[]
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
                            url: `${process.env.R2_PUBLIC_URL}/assignment_${taskId}/${studentId}/${attachment.filename}`
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
