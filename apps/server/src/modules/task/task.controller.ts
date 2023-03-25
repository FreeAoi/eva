import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { StudentSubmissionDTO, TaskDTO } from './dto/task.dto';
import {
    ApiBody,
    ApiConsumes,
    ApiHeader,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import { FileInterceptor, FilesInterceptor } from '@nest-lab/fastify-multer';
import { QualifySubmissionDTO } from './dto/qualify-submission.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
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
        return dto;
    }

    @Post(':taskId/submit')
    @UseGuards(AuthGuard('jwt'))
    @ApiHeader({ name: 'Authorization', description: 'Bearer token', required: true })
    @ApiParam({ name: 'taskId', description: 'Task id', type: 'string' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @ApiConsumes('multipart/form-data')
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

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FilesInterceptor('file'))
    async createTask(
        @Query('courseId') id: string,
        @UploadedFiles() file: Express.Multer.File[],
        @Body() data: CreateTaskDTO
    ) {
        return this.taskService.createTask(data, file, id);
    }

    @Get(':taskId/submissions')
    @ApiOkResponse({
        description: 'Task found',
        type: StudentSubmissionDTO,
        isArray: true
    })
    @ApiParam({ name: 'taskId', description: 'Task id', type: 'string' })
    async getSubmissions(@Param('taskId') id: string) {
        const tasks = await this.taskService.getSubmissions(Number(id));
        return tasks.map((task) => new StudentSubmissionDTO(task));
    }

    @Post(':taskId/submissions/:submissionId')
    @ApiOkResponse({ description: 'Task found', type: StudentSubmissionDTO })
    @ApiParam({ name: 'taskId', description: 'Task id', type: 'string' })
    @ApiParam({ name: 'submissionId', description: 'Submission id', type: 'string' })
    @ApiHeader({ name: 'Authorization', description: 'Bearer token', required: true })
    @ApiBody({ type: QualifySubmissionDTO })
    @UseGuards(AuthGuard('jwt'))
    async qualifySubmission(
        @Param('taskId') taskId: string,
        @Param('submissionId') submissionId: string,
        @Body() data: QualifySubmissionDTO,
        @CurrentUser() user: JWTPayload
    ) {
        const task = await this.taskService.qualifySubmission({
            taskId: Number(taskId),
            submitId: Number(submissionId),
            ...data,
            teacherId: user.id
        });
        console.log(new StudentSubmissionDTO(task));
        return new StudentSubmissionDTO(task);
    }
}
