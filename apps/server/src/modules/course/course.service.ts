import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { CacheService } from '../../providers/cache/redis.service';
import type { CreateCourseDTO } from './dto/create-course.dto';
import type { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService, private cache: CacheService) {}

    async createCourse(data: CreateCourseDTO) {
        const cachedCourse = await this.cache.exists(`course:${data.courseId}`);
        if (cachedCourse) throw new BadRequestException('Course already exists');

        const course = await this.prisma.course.create({
            data: {
                name: data.name,
                id: data.courseId,
                credits: data.credits,
                instructor: data.instructor,
                career: {
                    connect: {
                        id: data.careerId
                    }
                }
            }
        });

        await this.cache.set(`course:${course.id}`, JSON.stringify(course));
        return course;
    }

    async updateCourse(courseId: string, data: UpdateCourseDTO) {
        const { connect, disconnect, ...rest } = data;
        const course = await this.prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                ...rest,
                students: {
                    connect: connect?.map((id) => ({ id })),
                    disconnect: disconnect?.map((id) => ({ id }))
                }
            }
        });

        await this.cache.set(`course:${course.id}`, JSON.stringify(course));

        return {
            ...(connect && { added: connect.length }),
            ...(disconnect && { removed: disconnect.length }),
            ...course
        };
    }
}
