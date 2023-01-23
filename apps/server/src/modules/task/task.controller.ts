import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import {
    FilesInterceptor,
    FileUpload
} from '../../common/interceptors/files.interceptor';
import { CheckCourseDTO } from '../course/dto/check-course.dto';
import { CheckTaskDTO } from './dto/check-task.dto';
import { CheckSubmitDTO, UpdateSubmissionDTO } from './dto/evaluate-task.dto';
import type { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';

@Controller('course/:courseId/task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @UseInterceptors(FilesInterceptor())
    async createTask(
        @UploadedFiles() files: FileUpload[],
        @Body() data: CreateTaskDTO,
        @Param() params: CheckCourseDTO
    ) {
        return this.taskService.createTask(data, files, params.courseId);
    }

    @Get(':taskId')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async getTask(@Param() params: CheckTaskDTO) {
        return this.taskService.getTask(params.taskId);
    }

    @Post(':taskId/submit')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FilesInterceptor())
    async submitTask(
        @UploadedFiles() files: FileUpload[],
        @Param() params: CheckTaskDTO,
        @CurrentUser() user: JWTPayload
    ) {
        return this.taskService.submitTask({
            taskId: params.taskId,
            studentId: user.id,
            files
        });
    }

    @Patch(':taskId/submit/:submitId')
    @UseGuards(AuthGuard('jwt'))
    async evaluateSubmission(
        @Param() params: CheckSubmitDTO,
        @Body() data: UpdateSubmissionDTO,
        @CurrentUser() user: JWTPayload
    ) {
        return this.taskService.evaluateSubmission({
            submitId: params.submitId,
            taskId: params.taskId,
            score: data.score,
            teacherId: user.id
        });
    }
}
