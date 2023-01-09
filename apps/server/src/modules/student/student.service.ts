import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { CacheService } from '../../providers/cache/redis.service';
import bcrypt from 'bcrypt';

import type { RegisterDTO } from './dto/register.dto';
import type { Student } from '@prisma/client';

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService, private cache: CacheService) {}

    // TODO: refafactor this using class-transformer instead
    async getStudent<T extends boolean>(
        opts: { email?: string; id?: string },
        omitPassword: T = true as T
    ): Promise<T extends true ? Omit<Student, 'password'> | null : Student | null> {
        let student = await this.cache.getStudent(opts);

        if (!student) {
            const { email, id } = opts;
            const where = email ? { email } : { id };
            student = await this.prisma.student.findUnique({
                where
            });

            if (!student) return null;
            await this.cache.setStudent(student.email, student.id, student);
        }
        if (omitPassword) {
            const { password, ...rest } = student;
            return rest as never;
        }

        return student;
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
            this.cache.zadd('student.emails', 0, `${student.email}:${student.id}`)
        ]);

        return student;
    }
}
