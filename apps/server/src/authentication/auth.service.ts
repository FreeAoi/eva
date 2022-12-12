import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Student } from '@prisma/client';
import { StudentsService } from '../modules/students/students.service';

@Injectable()
export class AuthService {
    constructor(
        private studentsService: StudentsService,
        private jwtService: JwtService
    ) {}

    async validateStudent(
        email: string,
        password: string
    ): Promise<Student | null> {
        const student = await this.studentsService.getStudentByEmail(email);
        if (student && student.password === password) {
            return student;
        }
        return null;
    }

    async genAccToken(student: Student) {
        const payload = { email: student.email, sub: student.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
