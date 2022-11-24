import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from '../student/student.module';
import { JwtStrategy } from './local.strategy';
import { AuthService } from './auth.service';

@Module({
    imports: [
        StudentModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' }
        })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
