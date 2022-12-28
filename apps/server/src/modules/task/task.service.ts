import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import type { CreateTaskDTO } from './dto/create-task.dto';
import type { MultipartFile } from '@fastify/multipart';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class TaskService {
    constructor(
        private prismaService: PrismaService,
        @InjectQueue('upload') private upload: Queue
    ) {}
    createTask(data: CreateTaskDTO) {
        return this.prismaService.task.create({
            data: {
                title: data.title,
                description: data.description,
                course: {
                    connect: {
                        id: data.courseId
                    }
                },
                maxScore: data.maxScore
            }
        });
    }

    getTasksByCourse(courseId: string) {
        return this.prismaService.task.findMany({
            where: {
                courseId
            }
        });
    }

    async uploadAttachments(
        taskId: number,
        files: Record<string, MultipartFile>
    ) {
        await this.upload.add(
            'attachment',
            {
                attachments: Object.values(files).map((file) => ({
                    filename: file.filename,
                    buffer: file.file.read()
                })),
                taskId
            },
            {
                removeOnComplete: true
            }
        );

        return this.prismaService.task.update({
            where: {
                id: taskId
            },
            data: {
                attachments: {
                    createMany: {
                        data: Object.keys(files).map((file) => ({
                            name: files[file].filename,
                            url: `${process.env.R2_PUBLIC_URL}/assignment_${taskId}/${files[file].filename}`
                        }))
                    }
                }
            }
        });
    }
}
