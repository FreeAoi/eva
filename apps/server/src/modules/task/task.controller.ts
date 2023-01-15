import {
    Body,
    Controller,
    Param,
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
import { FilesInterceptor, FileUpload } from '../../common/interceptors/files.interceptor';
import type { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';

// ROUTE: api/course/:courseId/task
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post('create')
    @Roles(Role.ADMIN, Role.TEACHER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UseInterceptors(FilesInterceptor())
    async createTask(
        @UploadedFiles() files: FileUpload[],
        @Body() data: CreateTaskDTO,
        @Param() params: { courseId: string }
    ) {
        return this.taskService.createTask(data, files, params.courseId);
    }

    @Post(':taskId/submit')
    @Roles(Role.ADMIN, Role.TEACHER, Role.STUDENT)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UseInterceptors(FilesInterceptor())
    async submitTask(
        @UploadedFiles() files: FileUpload[],
        @Param() params: { taskId: string; courseId: string },
        @CurrentUser() user: JWTPayload
    ) {
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
    async evaluateSubmission() {
        return this.taskService.evaluateSubmission();
    }
}
