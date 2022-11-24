import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { StudentService } from '../student/student.service';
import { LoginDTO } from './app.dto';

@Controller()
export class AppController {
    constructor(
        private studentService: StudentService,
        private authService: AuthService
    ) {}

    @Post('login')
    async loginStudent(@Body() student: LoginDTO) {
        const std = await this.studentService.getStudentByEmail(student.email);
        if (!std) return 'Invalid User';
        const cmp = await this.studentService.comparePassword(
            student.password,
            std.password
        );
        return cmp ? this.authService.genAccToken(std) : 'Wrong password';
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getStudent(@Request() req) {
        console.log(req.user);
    }
}
