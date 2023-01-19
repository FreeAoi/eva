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
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/metadata/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
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
    @Roles(Role.ADMIN, Role.TEACHER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UseInterceptors(FilesInterceptor())
    async createTask(
        @UploadedFiles() files: FileUpload[],
        @Body() data: CreateTaskDTO,
        @Param() params: CheckCourseDTO
    ) {
        return this.taskService.createTask(data, files, params.courseId);
    }

    @Get(':taskId')
    @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async getTask(@Param() params: CheckTaskDTO) {
        return this.taskService.getTask(params.taskId);
    }

    @Post(':taskId/submit')
    @Roles(Role.STUDENT)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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
    @Roles(Role.TEACHER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async evaluateSubmission(
        @Param() params: CheckSubmitDTO,
        @Body() data: UpdateSubmissionDTO
    ) {
        return this.taskService.evaluateSubmission({
            submitId: params.submitId,
            taskId: params.taskId,
            score: data.score
        });
    }
}
