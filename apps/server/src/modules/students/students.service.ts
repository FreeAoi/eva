import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import bcrypt from 'bcrypt';
import RegisterDTO from './dto/register.dto';

@Injectable()
export class StudentsService {
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
        const { password, careerId, ...rest } = data;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return await this.prisma.student.create({
            data: {
                ...rest,
                password: hashedPassword,
                career: {
                    connect: {
                        id: careerId
                    }
                }
            }
        });
    }
}
