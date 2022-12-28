import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../modules/student/student.service';
import type { JWTPayload } from './interfaces/jwt-payload.interface';
import type { Student } from '@prisma/client';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private studentsService: StudentService
    ) {}

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

    async validateStudent(email: string, password: string) {
        const student = await this.studentsService.getStudentByEmail(email);
        if (
            student &&
            (await this.studentsService.comparePassword(
                password,
                student.password
            ))
        ) {
            return student;
        }
        return null;
    }
}
