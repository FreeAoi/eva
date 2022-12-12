import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { StudentsService } from '../modules/students/students.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export default class AuthController {
    constructor(
        private readonly studentsService: StudentsService,
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async loginStudent(@Body() student: LoginDTO) {
        const std = await this.studentsService.getStudentByEmail(student.email);
        if (!std)
            throw new HttpException({ error: 'Estudiante no encontrado' }, 404);
        const cmp = await this.studentsService.comparePassword(
            student.password,
            std.password
        );
        if (!cmp)
            throw new HttpException({ error: 'Contraseña incorrecta' }, 401);
        return this.authService.genAccToken(std);
    }
}
