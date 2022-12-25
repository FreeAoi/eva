import {
    Body,
    Controller,
    Get,
    HttpException,
    Put,
    Query,
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

    @Get('student')
    @UseGuards(AuthGuard('jwt'))
    async getStudent(@Query('id') id: string) {
        return this.studentsService.getStudentById(id);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async getMe(@CurrentUser() user: JWTPayload) {
        return this.studentsService.getStudentById(user.id);
    }

    @Put('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async registerStudent(@Body() student: RegisterDTO): Promise<Student> {
        const studentEmail = await this.studentsService.getStudentById(
            student.id
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
