import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import type { CreateTaskDTO } from './dto/create-task.dto';
import type { FileUpload } from '../../common/interceptors/files.interceptor';
import { UploadProducer } from '../../jobs/producers/upload.producer';

@Injectable()
export class TaskService {
    constructor(private prismaService: PrismaService, private upload: UploadProducer) {}
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

        if (files.length > 0) await this.upload.uploadAttachments(files, task.id);

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

        await this.upload.uploadAttachments(files, taskId, studentId);

        return 'Task submitted for evaluation';
    }

    async evaluateSubmission() {
        // search for the submission
    }
}
