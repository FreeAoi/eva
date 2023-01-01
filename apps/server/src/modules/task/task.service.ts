import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import type { CreateTaskDTO } from './dto/create-task.dto';
import type { MultipartFile } from '@fastify/multipart';
import type { Queue } from 'bull';
import type { EvaluateTaskDTO } from './dto/evaluate-task.dto';

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

    async createAttachment(
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
        files: Record<string, MultipartFile>;
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

        await this.upload.add(
            'attachment',
            {
                attachments: Object.values(files).map((file) => ({
                    filename: file.filename,
                    buffer: file.file.read()
                })),
                taskId,
                studentId
            },
            {
                removeOnComplete: true
            }
        );

        return this.prismaService.taskSubmission.create({
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
                        data: Object.keys(files).map((file) => ({
                            name: files[file].filename,
                            url: `${process.env.R2_PUBLIC_URL}/assignment_${taskId}/${studentId}/${files[file].filename}`
                        }))
                    }
                },
                score: 0
            }
        });
    }

    async evaluateSubmission(data: EvaluateTaskDTO) {
        // search for the submission
    }
}
