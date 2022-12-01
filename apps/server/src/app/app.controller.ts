import {
    Body,
    Controller,
    Get,
    HttpException,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { StudentService } from '../student/student.service';
import { LoginDTO } from './app.dto';
import { Request as Req } from 'express';

@Controller()
export class AppController {
    constructor(
        private studentService: StudentService,
        private authService: AuthService
    ) {}

    @Post('login')
    async loginStudent(@Body() student: LoginDTO) {
        const std = await this.studentService.getStudentByEmail(student.email);
        if (!std)
            throw new HttpException({ error: 'Estudiante no encontrado' }, 404);
        const cmp = await this.studentService.comparePassword(
            student.password,
            std.password
        );
        if (!cmp)
            throw new HttpException({ error: 'Contraseña incorrecta' }, 401);
        return await this.authService.genAccToken(std);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('student/courses')
    async getStudent(@Request() req: Req) {
        if (!req.user)
            throw new HttpException(
                { error: 'No se ha encontrado el estudiante' },
                404
            );
        return await this.studentService.getStudentCourses(req.user.id);
    }
}
