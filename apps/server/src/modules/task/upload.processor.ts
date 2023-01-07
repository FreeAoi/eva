import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { StorageService } from '../storage/storage.service';
import { PrismaService } from '../../providers/prisma/prisma.service';

interface JobData {
    attachments: {
        filename: string;
        buffer: Buffer;
    }[];
    taskId: number;
    studentId?: string;
}

@Processor('upload')
export class UploadConsumer {
    constructor(
        private storageService: StorageService,
        private prismaService: PrismaService
    ) {}

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

        if (!studentId) {
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
        } else {
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
