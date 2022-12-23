import {
    Body,
    Controller,
    Get,
    HttpException,
    Put,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentsService } from './students.service';
import RegisterDTO from './dto/register.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/user-current.decorator';
import { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';
import { Student } from '@prisma/client';

@Controller('students')
export class StudentController {
    constructor(private studentsService: StudentsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getStudent(@CurrentUser() user: JWTPayload): Promise<Student | null> {
        return this.studentsService.getStudentByEmail(user.email);
    }

    @Put('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async registerStudent(@Body() student: RegisterDTO): Promise<Student> {
        const studentEmail = await this.studentsService.getStudentByEmail(
            student.email
        );
        console.log(studentEmail);
        if (studentEmail)
            throw new HttpException(
                { error: 'Ese email de estudiante ya existe' },
                400
            );

        return this.studentsService.registerStudent(student);
    }
}
