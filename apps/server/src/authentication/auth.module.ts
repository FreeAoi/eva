import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { StudentsModule } from '../modules/students/students.module';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        StudentsModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15d' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
