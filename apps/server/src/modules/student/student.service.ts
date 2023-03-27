import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { RedisService } from '../../providers/cache/redis.service';
import bcrypt from 'bcrypt';
import { UploadProducer } from '../../jobs/producers/upload.producer';

import type { RegisterStudentDTO } from './dto/register-student.dto';
import type { Student } from '@prisma/client';
import type { UpdateStudentDTO } from './dto/update-student.dto';

@Injectable()
export class StudentService {
    constructor(
        private prisma: PrismaService,
        private cache: RedisService,
        private upload: UploadProducer
    ) {}

    /**
     * Get a student by email or id
     *
     * @async
     * @param {object} [opts] options to get the student
     * @param {string} [opts.email] email of the student
     * @param {string} [opts.id] id of the student
     * @returns {Promise<Student | null>} Student or null if not found
     * @param opts
     */
    async get(opts: { email?: string; id?: string }): Promise<Student | null> {
        let student = await this.cache.getUser<Student>({
            ...opts,
            key: 'student',
        });

        if (!student) {
            student = await this.prisma.student.findUnique({
                where: opts,
                include: {
                    career: true,
                    group: {
                        include: {
                            courses: true,
                        },
                    },
                },
            });

            if (!student) return null;

            await Promise.all([
                this.cache.set(
                    `student:${student.id}`,
                    JSON.stringify(student)
                ),
                this.cache.zadd(
                    'student:emails',
                    0,
                    `${student.email}:${student.id}`
                ),
            ]);
        }

        return student;
    }

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
                        id: careerId,
                    },
                },
            },
            include: {
                career: true,
            },
        });

        await Promise.all([
            this.cache.set(`student:${student.id}`, JSON.stringify(student)),
            this.cache.zadd(
                'student:emails',
                0,
                `${student.email}:${student.id}`
            ),
        ]);

        return student;
    }

    async updateStudent(
        id: string,
        data: UpdateStudentDTO,
        file?: Express.Multer.File
    ) {
        console.log(file);
        if (file) {
            data = {
                ...data,
                avatar: `https://pub-c95c75d085c748ba8128bc8046a97e87.r2.dev/avatar/${id}`,
            };

            await this.upload.uploadAvatar(file, id);
        }

        const student = await this.prisma.student.update({
            where: {
                id,
            },
            data,
            include: {
                career: true,
                group: {
                    include: {
                        courses: true,
                    },
                },
            },
        });

        if (!student)
            throw new BadRequestException('No se ha encontrado el estudiante');

        await Promise.all([
            this.cache.set(`student:${student.id}`, JSON.stringify(student)),
            this.cache.zadd(
                'student:emails',
                0,
                `${student.email}:${student.id}`
            ),
        ]);

        return student;
    }
}
