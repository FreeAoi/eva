import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from '../modules/student/student.module';
import { TeacherModule } from '../modules/teacher/teacher.module';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        StudentModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '15d' },
        }),
        TeacherModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
