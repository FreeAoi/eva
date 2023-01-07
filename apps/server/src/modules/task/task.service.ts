import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import type { CreateTaskDTO } from './dto/create-task.dto';
import type { Queue } from 'bull';
import type { FileUpload } from '../../common/interceptors/files.interceptor';

@Injectable()
export class TaskService {
    constructor(
        private prismaService: PrismaService,
        @InjectQueue('upload') private upload: Queue
    ) {}
    async createTask(
        data: CreateTaskDTO,
        files: FileUpload[],
        courseId: string
    ) {
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

        if (files.length > 0) {
            await this.upload.add(
                'attachment',
                {
                    attachments: files.map((file) => ({
                        filename: file.filename,
                        buffer: file.stream
                    })),
                    taskId: task.id
                },
                {
                    removeOnComplete: true
                }
            );
        }

        return task;
    }

    // TODO: ADD cache and refactor this shit
    async submitTask({
        taskId,
        studentId,
        courseId,
        files
    }: {
        taskId: number;
        courseId: string;
        studentId: string;
        files: FileUpload[];
    }) {
        // check if the task is in the course
        const course = await this.prismaService.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                tasks: {
                    where: {
                        id: taskId
                    }
                },
                students: {
                    where: {
                        id: studentId
                    }
                }
            }
        });

        if (!course) {
            return 'Course not found';
        }

        if (course.tasks.length === 0) {
            return 'Task not found';
        }

        if (course.students.length === 0) {
            return 'Student not found';
        }

        if (files.length === 0) {
            return 'No files found';
        }

        await this.upload.add(
            'attachment',
            {
                attachments: Object.values(files).map((file) => ({
                    filename: file.filename,
                    buffer: file.stream
                })),
                taskId,
                studentId
            },
            {
                removeOnComplete: true
            }
        );

        return 'Task submitted for evaluation';
    }

    async evaluateSubmission() {
        // search for the submission
    }
}
