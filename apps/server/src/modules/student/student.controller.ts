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
import { RegisterDTO } from './dto/register.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/metadata/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import type { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';
import type { Student } from '@prisma/client';
import { StudentDTO } from './dto/user.dto';

@Controller('student')
export class StudentController {
    constructor(private studentsService: StudentService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async getStudent(@Query('id') id: string): Promise<StudentDTO> {
        const student = await this.studentsService.getStudent({ id });
        if (!student) throw new HttpException({ error: 'No existe ese estudiante' }, 400);
        return new StudentDTO(student);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async getMe(@CurrentUser() user: JWTPayload) {
        const student = await this.studentsService.getStudent({ id: user.id });
        if (!student)
            throw new HttpException(
                { error: 'Ha ocurrido un error, inicie session nuevamente' },
                400
            );
        return new StudentDTO(student);
    }

    @Post('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async registerStudent(@Body() student: RegisterDTO): Promise<Student> {
        const studentEmail = await this.studentsService.getStudent({
            email: student.email
        });
        if (studentEmail)
            throw new HttpException({ error: 'Ese email de estudiante ya existe' }, 400);

        return this.studentsService.registerStudent(student);
    }
}
