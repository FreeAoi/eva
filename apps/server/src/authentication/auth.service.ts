import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Student } from '@prisma/client';
import { StudentService } from '../modules/students/student.service';

@Injectable()
export class AuthService {
    constructor(
        private studentService: StudentService,
        private jwtService: JwtService
    ) {}

    async validateStudent(
        email: string,
        password: string
    ): Promise<Student | null> {
        const student = await this.studentService.getStudentByEmail(email);
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
