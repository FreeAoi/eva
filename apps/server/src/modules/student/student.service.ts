import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { CacheService } from '../../providers/cache/redis.service';
import bcrypt from 'bcrypt';

import type { RegisterStudentDTO } from './dto/register.dto';
import type { Student } from '@prisma/client';

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaService, private cache: CacheService) {}

    /**
     * Get a student by email or id
     *
     * @async
     * @param {Object} options
     * @param {string} [options.email] email of the student
     * @param {string} [options.id] id of the student
     * @returns {Promise<Student | null>} Student or null if not found
     */
    async get(opts: { email?: string; id?: string }): Promise<Student | null> {
        let student = await this.cache.getUser({ ...opts, key: 'student' });

        console.log(student);

        if (!student) {
            student = await this.prisma.student.findUnique({
                where: opts
            });

            if (!student) return null;

            await Promise.all([
                this.cache.set(`student:${student.id}`, JSON.stringify(student)),
                this.cache.zadd('student:emails', 0, `${student.email}:${student.id}`)
            ]);
        }

        return student;
    }

    /**
     * Register a student in the database and hashing the password
     *
     * @async
     * @param {RegisterDTO} data register data of the student
     * @returns {Promise<Student>} Student created
     */
    async registerStudent(data: RegisterStudentDTO) {
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
            this.cache.set(`student:${student.id}`, JSON.stringify(student)),
            this.cache.zadd('student:emails', 0, `${student.email}:${student.id}`)
        ]);

        return student;
    }
}
