import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../modules/student/student.service';
import { TeacherService } from '../modules/teacher/teacher.service';
import type { JWTPayload } from './dto/jwt-payload.dto';
import type { Student, Teacher } from '@prisma/client';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private studentsService: StudentService,
        private teachersService: TeacherService
    ) {}

    genAccToken(user: Student | Teacher) {
        const payload: JWTPayload = {
            email: user.email,
            id: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async comparePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    async validate(email: string, password: string) {
        const user = await Promise.any([
            this.studentsService.get({ email }),
            this.teachersService.get({ email }),
        ]);

        if (!user) return null;
        return (await this.comparePassword(password, user.password))
            ? user
            : null;
    }
}
