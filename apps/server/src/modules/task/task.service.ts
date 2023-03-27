import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { UploadProducer } from '../../jobs/producers/upload.producer';
import { RedisService } from '../../providers/cache/redis.service';
import type { CreateTaskDTO } from './dto/create-task.dto';
import type { Prisma, Task } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(
        private prismaService: PrismaService,
        private upload: UploadProducer,
        private cacheService: RedisService
    ) {}

    async getTask(taskId: number, filter?: string) {
        const key = `task:${taskId}${filter ? `:${filter}` : ''}`;
        const taskFromCache = await this.cacheService.retrieve<Task>(key);
        if (taskFromCache) return taskFromCache;

        const taskFromDB = await this.prismaService.task.findUniqueOrThrow({
            where: {
                id: taskId,
            },
            ...(filter && {
                include: {
                    submissions: {
                        where: {
                            studentId: filter,
                        },
                        include: {
                            attachments: true,
                            teacher: true,
                        },
                    },
                },
            }),
        });

        await this.cacheService.set(key, JSON.stringify(taskFromDB));

        return taskFromDB;
    }

    async submitTask({
        taskId,
        studentId,
        files,
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
        await this.cacheService.del(`task:${taskId}:${studentId}`);
        return true;
    }

    async createTask(
        data: CreateTaskDTO,
        files: Express.Multer.File[],
        courseId: string
    ) {
        const task = await this.prismaService.task.create({
            data: {
                title: data.title,
                dueDate: data.dueDate,
                course: {
                    connect: {
                        id: courseId,
                    },
                },
                maxScore: +data.maxScore,
            },
        });

        if (files.length > 0)
            await this.upload.uploadAttachments(files, task.id);
        await this.cacheService.del(`course:${courseId}`);
        await this.cacheService.set(`task:${task.id}`, JSON.stringify(task));
        return task;
    }

    async getSubmissions(taskId: number) {
        const submissionsFromCache = await this.cacheService.retrieve<
            Prisma.TaskGetPayload<{ include: { submissions: true } }>
        >(`task:${taskId}:submissions`);
        if (submissionsFromCache) return submissionsFromCache.submissions;

        const task = await this.prismaService.task.findUniqueOrThrow({
            where: {
                id: taskId,
            },
            include: {
                submissions: {
                    include: {
                        attachments: true,
                        teacher: true,
                    },
                },
            },
        });

        await this.cacheService.set(
            `task:${taskId}:submissions`,
            JSON.stringify(task)
        );
        return task.submissions;
    }

    async qualifySubmission({
        submitId,
        taskId,
        comment,
        score,
        teacherId,
    }: {
        submitId: number;
        taskId: number;
        comment: string;
        score: number;
        teacherId: string;
    }) {
        const task = await this.prismaService.task.findUnique({
            where: {
                id: taskId,
            },
            select: {
                submissions: {
                    where: {
                        id: submitId,
                    },
                },
            },
        });

        if (!task?.submissions.length) {
            throw new BadRequestException(
                'Invalid submid id for the specified task'
            );
        }

        const submission = await this.prismaService.taskSubmission.update({
            where: {
                id: submitId,
            },
            data: {
                score,
                comment,
                qualified: true,
                teacher: {
                    connect: {
                        id: teacherId,
                    },
                },
            },
            include: {
                attachments: true,
                teacher: true,
            },
        });

        await this.cacheService.del(`task:${taskId}:submissions`);
        await this.cacheService.del(`task:${taskId}:${submission.studentId}`);
        return submission;
    }
}
