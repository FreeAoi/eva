import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../modules/student/student.service';
import type { JWTPayload } from './interfaces/jwt-payload.interface';
import type { Student } from '@prisma/client';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private studentsService: StudentService) {}

    async genAccToken(student: Student) {
        const payload: JWTPayload = {
            email: student.email,
            id: student.id,
            role: student.role
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    async validateStudent(email: string, password: string) {
        const student = await this.studentsService.getStudent({ email }, false);
        if (student && (await this.comparePassword(password, student.password))) {
            return student;
        }
        return null;
    }
}
