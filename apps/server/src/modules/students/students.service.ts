import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import RegisterDTO from './dto/register.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService, private cache: CacheService) {}

    async getStudentById(id: string) {
        const cachedStudent = await this.cache.hgetall(`student:${id}`);

        if (Object.keys(cachedStudent).length === 0) {
            const student = await this.prisma.student.findUnique({
                where: {
                    id
                }
            });
            if (!student) return null;
            await Promise.all([
                this.cache.hset(`student:${student.id}`, student),
                this.cache.zadd(
                    'student.emails',
                    0,
                    `${student.email}:${student.id}`
                )
            ]);
            return student;
        }

        return cachedStudent;
    }

    async getStudentByEmail(email: string) {
        // Search for the student in the cache and return email:id pair
        const cachedStudent = await this.cache.zrangebylex(
            'student.emails',
            `[${email}`,
            `[${email}\xff`
        );

        if (cachedStudent.length === 0) {
            const student = await this.prisma.student.findUnique({
                where: {
                    email
                }
            });
            if (!student) return null;
            await this.cache.hset(`student:${student.id}`, student);
            await this.cache.zadd(
                'student.emails',
                0,
                `${student.email}:${student.id}`
            );
            return student;
        }

        const studentId = cachedStudent[0].split(':')[1];
        return this.getStudentById(studentId);
    }

    async comparePassword(password: string, hash: string) {
        await bcrypt.compare(password, hash);
        return true;
    }

    async registerStudent(data: RegisterDTO) {
        const { password, careerId, ...rest } = data;
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);
        const student = await this.prisma.student.create({
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

        await Promise.all([
            this.cache.hset(`student:${student.id}`, student),
            this.cache.zadd(
                'student.emails',
                0,
                `${student.email}:${student.id}`
            )
        ]);

        return student;
    }
}
