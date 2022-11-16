import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService) {}

    getStudentById(id: string) {
        return this.prisma.student.findUnique({
            where: {
                id
            }
        });
    }
}
