import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import bcrypt from 'bcrypt';
import RegisterDTO from './dto/register.dto';

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
        await bcrypt.compare(password, hash);
        return true;
    }

    async registerStudent(data: RegisterDTO) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        return await this.prisma.student.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });
    }

    async getStudentCourses(id: string) {
        return await this.prisma.student.findUnique({
            where: {
                id
            },
            select: {
                courses: true
            }
        });
    }

    async setCourse() {
        return await this.prisma.student.update({
            where: {
                id: '2022-0381U'
            },
            data: {
                courses: {
                    create: [
                        { name: 'Redaccion Tecanica' },
                        { name: 'Programacion 1' },
                        { name: 'Concepto de lenguaje' },
                        { name: 'Calculo Integral' }
                    ]
                }
            }
        });
    }
}
