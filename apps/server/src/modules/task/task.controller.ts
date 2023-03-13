import {
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskDTO } from './dto/task.dto';
import { ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import type { JWTPayload } from '../../authentication/dto/jwt-payload.dto';

@Controller('task')
@ApiTags('Task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get(':taskId')
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ description: 'Task found', type: TaskDTO })
    @ApiParam({ name: 'taskId', description: 'Task id', type: 'string' })
    @ApiHeader({ name: 'Authorization', description: 'Bearer token', required: true })
    @ApiQuery({ name: 'filter', description: 'Student id', required: false })
    async getTask(@Param('taskId') id: string, @Query('filter') studentId: string) {
        const task = await this.taskService.getTask(Number(id), studentId);
        const dto = new TaskDTO(task);
        console.log(dto);
        return dto;
    }

    @Post(':taskId/submit')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async submitTask(
        @Param('taskId') id: string,
        @CurrentUser() user: JWTPayload,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.taskService.submitTask({
            taskId: Number(id),
            studentId: user.id,
            files: [file]
        });
    }

    // @Post()
    // @UseGuards(AuthGuard('jwt'), RoleGuard)
    // @UseInterceptors(FilesInterceptor())
    // async createTask(
    //     @UploadedFiles() files: FileUpload[],
    //     @Body() data: CreateTaskDTO,
    //     @Param() params: CheckCourseDTO
    // ) {
    //     return this.taskService.createTask(data, files, params.courseId);
    // }

    // @Get(':taskId')
    // @UseGuards(AuthGuard('jwt'), RoleGuard)
    // async getTask(@Param() params: CheckTaskDTO) {
    //     return this.taskService.getTask(params.taskId);
    // }

    // @Post(':taskId/submit')
    // @UseGuards(AuthGuard('jwt'))
    // @UseInterceptors(FilesInterceptor())
    // async submitTask(
    //     @UploadedFiles() files: FileUpload[],
    //     @Param() params: CheckTaskDTO,
    //     @CurrentUser() user: JWTPayload
    // ) {
    //     return this.taskService.submitTask({
    //         taskId: params.taskId,
    //         studentId: user.id,
    //         files
    //     });
    // }

    // @Patch(':taskId/submit/:submitId')
    // @UseGuards(AuthGuard('jwt'))
    // async evaluateSubmission(
    //     @Param() params: CheckSubmitDTO,
    //     @Body() data: UpdateSubmissionDTO,
    //     @CurrentUser() user: JWTPayload
    // ) {
    //     return this.taskService.evaluateSubmission({
    //         submitId: params.submitId,
    //         taskId: params.taskId,
    //         score: data.score,
    //         teacherId: user.id
    //     });
    // }
}
