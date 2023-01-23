import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export default class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() data: LoginDTO) {
        const userAuthenticated = await this.authService.validate(
            data.email,
            data.password
        );
        if (!userAuthenticated) throw new HttpException('Invalid credentials', 401);
        return this.authService.genAccToken(userAuthenticated);
    }
}
