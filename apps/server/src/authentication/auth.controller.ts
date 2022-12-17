import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export default class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async loginStudent(@Body() student: LoginDTO) {
        const validatedStudent = await this.authService.validateStudent(
            student.email,
            student.password
        );
        console.log(validatedStudent + ' validatedStudent');
        if (!validatedStudent)
            throw new HttpException('Invalid credentials', 401);
        return this.authService.genAccToken(validatedStudent);
    }
}
