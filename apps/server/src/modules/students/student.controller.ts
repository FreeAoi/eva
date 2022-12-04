import {
    Controller,
    UseGuards,
    Request,
    HttpException,
    Get,
    Post,
    Body
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../../common/constants/roles.enum';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { StudentService } from './student.service';
import { Request as Req } from 'express';
import RegisterDTO from './dto/register.dto';

@Controller()
export class StudentController {
    constructor(private studentService: StudentService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('student')
    async getStudent(@Request() req: Req) {
        if (!req.user)
            throw new HttpException(
                { error: 'No se ha encontrado el estudiante' },
                404
            );
        return await this.studentService.getStudentById(req.user.id);
    }

    @Post('student/register')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async registerStudent(@Body() student: RegisterDTO) {
        return await this.studentService.registerStudent(student);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('student/courses')
    async getStudentCourses(@Request() req: Req) {
        if (!req.user)
            throw new HttpException(
                { error: 'No se ha encontrado el estudiante' },
                404
            );
        return await this.studentService.getStudentCourses(req.user.id);
    }
}
