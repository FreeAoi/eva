import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { RedisService } from '../../providers/cache/redis.service';
import type { Teacher } from '@prisma/client';

@Injectable()
export class TeacherService {
    constructor(private prisma: PrismaService, private cache: RedisService) {}

    async get(opts: { email?: string; id?: string }): Promise<Teacher | null> {
        let teacher = await this.cache.getUser({ ...opts, key: 'teacher' });

        if (!teacher) {
            teacher = await this.prisma.teacher.findUnique({
                where: {
                    ...opts
                }
            });

            if (!teacher) return null;
            await Promise.all([
                this.cache.set(`teacher:${teacher.id}`, JSON.stringify(teacher)),
                this.cache.zadd('teacher:emails', 0, `${teacher.email}:${teacher.id}`)
            ]);
        }

        return teacher;
    }
}
