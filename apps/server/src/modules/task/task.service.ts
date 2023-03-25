import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { UploadProducer } from '../../jobs/producers/upload.producer';
import { RedisService } from '../../providers/cache/redis.service';
import type { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        private prismaService: PrismaService,
        private upload: UploadProducer,
        private cacheService: RedisService
    ) {}

    async getTask(taskId: number, filter?: string) {
        const taskFromDB = await this.prismaService.task.findUniqueOrThrow({
            where: {
                id: taskId
            },
            ...(filter && {
                include: {
                    submissions: {
                        where: {
                            studentId: filter
                        },
                        include: {
                            attachments: true,
                            teacher: true
                        }
                    }
                }
            })
        });

        return taskFromDB;
    }

    async submitTask({
        taskId,
        studentId,
        files
    }: {
        taskId: number;
        studentId: string;
        files: Express.Multer.File[];
    }) {
        const task = await this.getTask(taskId);
        if (new Date(task.dueDate) < new Date()) {
            throw new BadRequestException('Task is already due');
        }

        await this.upload.uploadAttachments(files, taskId, studentId);
        return {
            message: 'Task submitted successfully'
        };
    }

    async createTask(
        data: CreateTaskDTO,
        files: Express.Multer.File[],
        courseId: string
    ) {
        console.log(courseId);
        const task = await this.prismaService.task.create({
            data: {
                title: data.title,
                dueDate: data.dueDate,
                course: {
                    connect: {
                        id: courseId
                    }
                },
                maxScore: +data.maxScore
            }
        });

        if (files.length > 0) await this.upload.uploadAttachments(files, task.id);
        await this.cacheService.del(`course:${courseId}`);
        return task;
    }

    async getSubmissions(taskId: number) {
        const task = await this.prismaService.task.findUniqueOrThrow({
            where: {
                id: taskId
            },
            include: {
                submissions: {
                    include: {
                        attachments: true,
                        teacher: true
                    }
                }
            }
        });

        return task.submissions;
    }

    async qualifySubmission({
        submitId,
        taskId,
        comment,
        score,
        teacherId
    }: {
        submitId: number;
        taskId: number;
        comment: string;
        score: number;
        teacherId: string;
    }) {
        const task = await this.prismaService.task.findUnique({
            where: {
                id: taskId
            },
            select: {
                submissions: {
                    where: {
                        id: submitId
                    }
                }
            }
        });

        console.log(task);
        if (!task?.submissions.length) {
            throw new BadRequestException('Invalid submid id for the specified task');
        }

        const submission = await this.prismaService.taskSubmission.update({
            where: {
                id: submitId
            },
            data: {
                score,
                comment,
                qualified: true,
                teacher: {
                    connect: {
                        id: teacherId
                    }
                }
            },
            include: {
                attachments: true,
                teacher: true
            }
        });

        return submission;
    }
}
