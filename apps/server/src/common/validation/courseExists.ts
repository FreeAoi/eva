import { Injectable, NotFoundException } from '@nestjs/common';

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RedisService } from '../../providers/cache/redis.service';
import { PrismaService } from '../../providers/database/prisma.service';

@ValidatorConstraint({ name: 'CourseExists', async: true })
@Injectable()
export class CourseExists implements ValidatorConstraintInterface {
    constructor(private prismaService: PrismaService, private cache: RedisService) {}

    async validate(id: string): Promise<boolean> {
        const cachedCourse = await this.cache.get(`course:${id}`);
        console.log(cachedCourse);
        if (!cachedCourse) {
            const course = await this.prismaService.class.findUnique({
                where: { id },
                select: { id: true }
            });

            if (!course) throw new NotFoundException('Course not found');
            await this.cache.set(`course:${id}`, JSON.stringify(course));
        }

        return true;
    }
}
