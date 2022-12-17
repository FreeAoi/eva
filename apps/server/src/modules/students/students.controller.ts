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

@Controller('students')
export class StudentController {
    constructor(private studentsService: StudentsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getStudent(@CurrentUser() user: JWTPayload) {
        return this.studentsService.getStudentByEmail(user.email);
    }

    @Put('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async registerStudent(@Body() student: RegisterDTO) {
        const studentEmail = await this.studentsService.getStudentByEmail(
            student.email
        );
        if (studentEmail)
            throw new HttpException(
                { error: 'Ese email de estudiante ya existe' },
                400
            );

        return await this.studentsService.registerStudent(student);
    }
}
