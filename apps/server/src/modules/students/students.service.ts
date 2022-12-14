import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Cache } from 'cache-manager';
import bcrypt from 'bcrypt';
import RegisterDTO from './dto/register.dto';

@Injectable()
export class StudentsService {
    constructor(
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}
    async getStudentById(id: string) {
        const student = await this.cacheManager.get(id);
        if (!student) {
            const student = await this.prisma.student.findUnique({
                where: {
                    id
                }
            });
            await this.cacheManager.set(id, student);
            return student;
        } else {
            return student;
        }
    }

    async getStudentByEmail(email: string) {
        const student = await this.cacheManager.get(email);
        if (!student) {
            const student = await this.prisma.student.findUnique({
                where: {
                    email
                }
            });
            await this.cacheManager.set(email, student);
            return student;
        } else {
            return student;
        }
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
