import {
    BadRequestException,
    Controller,
    Get,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import { TeacherDTO } from './dto/teacher.dto';
import { TeacherService } from './teacher.service';
import type { JWTPayload } from '../../authentication/dto/jwt-payload.dto';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
    constructor(readonly teacherService: TeacherService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiAcceptedResponse({ description: 'Get teacher', type: TeacherDTO })
    async getTeacher(@CurrentUser() user: JWTPayload) {
        const teacher = await this.teacherService.get({ id: user.id });
        if (!teacher) {
            throw new BadRequestException('Teacher not found');
        }
        return new TeacherDTO(teacher);
    }
}
