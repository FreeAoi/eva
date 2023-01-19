import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import type { CreateTaskDTO } from './dto/create-task.dto';
import type { FileUpload } from '../../common/interceptors/files.interceptor';
import { UploadProducer } from '../../jobs/producers/upload.producer';
import { CacheService } from '../../providers/cache/redis.service';

@Injectable()
export class TaskService {
    constructor(
        private prismaService: PrismaService,
        private upload: UploadProducer,
        private cache: CacheService
    ) {}

    async createTask(data: CreateTaskDTO, files: FileUpload[], courseId: string) {
        const task = await this.prismaService.task.create({
            data: {
                title: data.title,
                description: data.description,
                course: {
                    connect: {
                        id: courseId
                    }
                },
                maxScore: data.maxScore
            }
        });

        console.log(task);

        if (files.length > 0) await this.upload.uploadAttachments(files, task.id);

        await this.cache.set(`task:${task.id}`, JSON.stringify(task));
        return task;
    }

    async getTask(taskId: number) {
        const task = await this.cache.get(`task:${taskId}`);
        if (task) return JSON.parse(task);

        const taskFromDB = await this.prismaService.task.findUnique({
            where: {
                id: taskId
            }
        });

        await this.cache.set(`task:${taskId}`, JSON.stringify(taskFromDB));
        return taskFromDB;
    }

    async submitTask({
        taskId,
        studentId,
        files
    }: {
        taskId: number;
        studentId: string;
        files: FileUpload[];
    }) {
        await this.upload.uploadAttachments(files, taskId, studentId);

        return 'Task submitted for evaluation';
    }

    async evaluateSubmission({
        submitId,
        taskId,
        score
    }: {
        submitId: number;
        taskId: number;
        score: number;
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

        if (task?.submissions.length) {
            throw new BadRequestException('Invalid submid id for the specified task');
        }

        await this.prismaService.taskSubmission.update({
            where: {
                id: submitId
            },
            data: {
                score
            }
        });

        return {
            message: `Task submission ${submitId} evaluated with score ${score}`
        };
    }
}
