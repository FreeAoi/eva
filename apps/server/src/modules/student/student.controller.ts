import {
    Body,
    Controller,
    Get,
    HttpException,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from './student.service';
import { RegisterDTO } from './dto/register.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { CurrentUser } from '../../common/decorators/user-current.decorator';
import type { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';
import type { Student } from '@prisma/client';

@Controller('student')
export class StudentController {
    constructor(private studentsService: StudentService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getStudent(@Query('id') id: string) {
        return this.studentsService.getStudent({ id });
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async getMe(@CurrentUser() user: JWTPayload) {
        return this.studentsService.getStudent({ id: user.id });
    }

    @Post('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async registerStudent(@Body() student: RegisterDTO): Promise<Student> {
        const studentEmail = await this.studentsService.getStudent({
            email: student.email
        });
        if (studentEmail)
            throw new HttpException(
                { error: 'Ese email de estudiante ya existe' },
                400
            );

        return this.studentsService.registerStudent(student);
    }
}
