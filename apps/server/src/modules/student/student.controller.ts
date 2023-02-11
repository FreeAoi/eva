import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    Post,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from './student.service';
import { RegisterStudentDTO } from './dto/register.dto';
import { RoleGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import type { JWTPayload } from '../../authentication/dto/jwt-payload.dto';
import { StudentDTO } from './dto/student.dto';

@Controller('student')
@ApiTags('Student')
export class StudentController {
    constructor(private studentsService: StudentService) {}

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiAcceptedResponse({
        description: 'Student data',
        type: StudentDTO
    })
    async getMe(@CurrentUser() user: JWTPayload) {
        const student = await this.studentsService.get({ id: user.id });
        if (!student)
            throw new HttpException(
                { error: 'Ha ocurrido un error, inicie session nuevamente' },
                400
            );
        return new StudentDTO(student);
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiAcceptedResponse({
        description: 'Student created',
        type: StudentDTO
    })
    async registerStudent(@Body() student: RegisterStudentDTO) {
        const studentCreated = await this.studentsService.registerStudent(student);
        return new StudentDTO(studentCreated);
    }
}
