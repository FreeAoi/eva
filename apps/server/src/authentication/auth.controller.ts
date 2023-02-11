import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AcessTokenDTO } from './dto/acessToken.dto';
import { LoginDTO } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export default class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiAcceptedResponse({
        description: 'User authenticated',
        type: AcessTokenDTO
    })
    async login(@Body() data: LoginDTO) {
        const userAuthenticated = await this.authService.validate(
            data.email,
            data.password
        );
        if (!userAuthenticated) throw new HttpException('Invalid credentials', 401);
        const x = this.authService.genAccToken(userAuthenticated);
        console.log(x);
        return x;
    }
}
