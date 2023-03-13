import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { RedisService } from '../../providers/cache/redis.service';
import type { Teacher } from '@prisma/client';

@Injectable()
export class TeacherService {
    constructor(private prisma: PrismaService, private cache: RedisService) {}

    async get(opts: { email?: string; id?: string }): Promise<Teacher | null> {
        let teacher = await this.cache.getUser<Teacher>({ ...opts, key: 'teacher' });

        if (!teacher) {
            teacher = await this.prisma.teacher.findUnique({
                where: {
                    ...opts
                },
                include: {
                    courses: true
                }
            });

            await Promise.all([
                this.cache.set(`teacher:${opts.id}`, JSON.stringify(teacher)),
                this.cache.zadd('teacher:emails', 0, `${opts.email}:${opts.id}`)
            ]);
        }

        return teacher;
    }
}
