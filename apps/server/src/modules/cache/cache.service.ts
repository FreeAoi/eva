import ioredis from 'ioredis';
import { Injectable, Inject } from '@nestjs/common';
import type { CacheModuleOptions } from './cache.interface';
import type { Student } from '@prisma/client';

@Injectable()
export class CacheService extends ioredis {
    constructor(@Inject('OPTIONS') options: CacheModuleOptions) {
        super(options);
    }

    // Set the student id and email in the cache
    async setStudent(email: string, id: string, student: Student) {
        return Promise.all([
            this.zadd('student:emails', 0, `${email}:${id}`),
            this.hset(`student:${id}`, student)
        ]);
    }

    async getStudent(opts: { email?: string; id?: string }): Promise<Student | null> {
        const { email, id } = opts;
        let studentId: string | undefined = id;

        if (email) {
            const cachedId = await this.zrangebylex('student:emails', `[${email}`, `[${email}\xff`);

            if (cachedId.length === 0) return null; // Student not found
            studentId = cachedId[0].split(':')[1];
        }

        const cachedStudent = (await this.hgetall(`student:${studentId}`)) as unknown as Student;
        return Object.keys(cachedStudent).length === 0 ? null : cachedStudent;
    }
}
