import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Student } from '@prisma/client';
import { StudentsService } from '../modules/students/students.service';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private studentsService: StudentsService
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
