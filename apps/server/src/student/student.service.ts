import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService) {}

    async getStudentById(id: string) {
        return await this.prisma.student.findUnique({
            where: {
                id
            }
        });
    }

    async getStudentByEmail(email: string) {
        return await this.prisma.student.findUnique({
            where: {
                email
            }
        });
    }

    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}
