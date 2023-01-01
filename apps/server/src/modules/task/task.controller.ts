import {
    Body,
    Controller,
    Param,
    Patch,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/user-current.decorator';
import type { FastifyRequest } from 'fastify';
import type { MultipartFile } from '@fastify/multipart';
import type { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';
import type { EvaluateTaskDTO } from './dto/evaluate-task.dto';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post('create')
    async createTask(@Body() data: CreateTaskDTO) {
        return this.taskService.createTask(data);
    }

    @Patch('create/attachment/:taskId')
    @Roles(Role.TEACHER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async uploadAttachment(
        @Req() request: FastifyRequest,
        @Param('taskId') taskId: string
    ) {
        const fields = (await request.file())?.fields;
        const files: Record<string, MultipartFile> = {};
        for (const field in fields) {
            files[field] = fields[field] as MultipartFile;
        }
        return this.taskService.createAttachment(parseInt(taskId), files);
    }

    @Post('submit/:courseId/:taskId')
    @Roles(Role.STUDENT, Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async uploadTask(
        @Req() request: FastifyRequest,
        @Param() params: { courseId: string; taskId: string },
        @CurrentUser() user: JWTPayload
    ) {
        const fields = (await request.file())?.fields;
        const files: Record<string, MultipartFile> = {};
        for (const field in fields) {
            files[field] = fields[field] as MultipartFile;
        }
        return this.taskService.submitTask({
            taskId: parseInt(params.taskId),
            studentId: user.id,
            courseId: params.courseId,
            files
        });
    }

    @Post('evaluate')
    @Roles(Role.TEACHER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async evaluateSubmission(@Body() data: EvaluateTaskDTO) {
        return this.taskService.evaluateSubmission(data);
    }
}
