import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    Post,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from './student.service';
import { RegisterStudentDTO } from './dto/register.dto';
import { RoleGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import { StudentDTO } from './dto/student.dto';
import type { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';

@Controller('student')
export class StudentController {
    constructor(private studentsService: StudentService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async getStudent(@Query('id') id: string): Promise<StudentDTO> {
        const student = await this.studentsService.get({ id });
        if (!student) throw new HttpException({ error: 'No existe ese estudiante' }, 400);
        return new StudentDTO(student);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
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
    async registerStudent(@Body() student: RegisterStudentDTO) {
        const studentEmail = await this.studentsService.get({
            email: student.email
        });
        if (studentEmail)
            throw new HttpException({ error: 'Ese email de estudiante ya existe' }, 400);

        return this.studentsService.registerStudent(student);
    }
}
