import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';
import type { FastifyRequest } from 'fastify';
import type { MultipartFile } from '@fastify/multipart';
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}
    @Post('create')
    async createTask(@Body() data: CreateTaskDTO) {
        return this.taskService.createTask(data);
    }

    @Patch('create/attachment/:taskId')
    async uploadAttachment(
        @Req() request: FastifyRequest,
        @Param('taskId') taskId: string
    ) {
        const fields = (await request.file())?.fields;
        const files: Record<string, MultipartFile> = {};
        for (const field in fields) {
            files[field] = fields[field] as MultipartFile;
        }
        return this.taskService.uploadAttachments(parseInt(taskId), files);
    }

    @Get('course')
    async getTasksByCourse(@Query('courseId') courseId: string) {
        return this.taskService.getTasksByCourse(courseId);
    }
}
