import {
    Body,
    Controller,
    Get,
    HttpException,
    Put,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentsService } from './students.service';
import { Request as Req } from 'express';
import RegisterDTO from './dto/register.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';

@Controller('students')
export class StudentController {
    constructor(private studentsService: StudentsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getStudent(@Request() req: Req) {
        if (!req.user)
            throw new HttpException(
                { error: 'No se ha encontrado el estudiante' },
                404
            );
        return await this.studentsService.getStudentById(req.user.id);
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

        const studentId = await this.studentsService.getStudentById(student.id);
        if (studentId)
            throw new HttpException(
                { error: 'Ese Id de estudiante ya existe' },
                400
            );
        return await this.studentsService.registerStudent(student);
    }
}
