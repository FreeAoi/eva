import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { UploadProducer } from '../../jobs/producers/upload.producer';

@Injectable()
export class TaskService {
    constructor(private prismaService: PrismaService, private upload: UploadProducer) {}

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

    // async createTask(data: CreateTaskDTO, files: FileUpload[], courseId: string) {
    //     const task = await this.prismaService.task.create({
    //         data: {
    //             title: data.title,
    //             description: data.description,
    //             dueDate: data.dueDate,
    //             course: {
    //                 connect: {
    //                     id: courseId
    //                 }
    //             },
    //             maxScore: data.maxScore
    //         }
    //     });

    //     if (files.length > 0) await this.upload.uploadAttachments(files, task.id);

    //     await this.cache.set(`task:${task.id}`, JSON.stringify(task));
    //     return task;
    // }

    // async evaluateSubmission({
    //     submitId,
    //     taskId,
    //     score,
    //     teacherId
    // }: {
    //     submitId: number;
    //     taskId: number;
    //     score: number;
    //     teacherId: string;
    // }) {
    //     const task = await this.prismaService.task.findUnique({
    //         where: {
    //             id: taskId
    //         },
    //         select: {
    //             submissions: {
    //                 where: {
    //                     id: submitId
    //                 }
    //             }
    //         }
    //     });

    //     if (task?.submissions.length) {
    //         throw new BadRequestException('Invalid submid id for the specified task');
    //     }

    //     await this.prismaService.taskSubmission.update({
    //         where: {
    //             id: submitId
    //         },
    //         data: {
    //             score,
    //             teacher: {
    //                 connect: {
    //                     id: teacherId
    //                 }
    //             }
    //         }
    //     });

    //     return {
    //         message: `Task submission ${submitId} evaluated with score ${score}`
    //     };
    // }
}
