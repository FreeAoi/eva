import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import { RedisService } from '../../providers/cache/redis.service';
import type { CreateCourseDTO } from './dto/create-course.dto';
import type { UpdateCourseDTO } from './dto/update-course.dto';
import type { Course } from '@prisma/client';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService, private cache: RedisService) {}

    async createCourse(data: CreateCourseDTO) {
        const cachedCourse = await this.cache.exists(`course:${data.courseId}`);
        if (cachedCourse)
            throw new BadRequestException('Course already exists');

        const course = await this.prisma.course.create({
            data: {
                name: data.name,
                id: data.courseId,
                group: {
                    connect: {
                        id: data.groupId,
                    },
                },
                teacher: {
                    connect: {
                        id: data.teacherId,
                    },
                },
            },
            include: {
                teacher: true,
                tasks: true,
            },
        });

        await this.cache.set(
            `course:${course.id}`,
            JSON.stringify(course),
            'EX',
            60 * 5
        );
        return course;
    }

    async updateCourse(courseId: string, data: UpdateCourseDTO) {
        const course = await this.prisma.course.update({
            where: {
                id: courseId,
            },
            data: {
                ...data,
            },
            include: {
                teacher: true,
                tasks: true,
            },
        });

        await this.cache.set(
            `course:${course.id}`,
            JSON.stringify(course),
            'EX',
            60 * 5
        );
        return course;
    }

    async getCourse(courseId: string) {
        const cachedCourse = await this.cache.retrieve<Course>(
            `course:${courseId}`
        );
        if (cachedCourse) return cachedCourse;

        const course = await this.prisma.course.findUnique({
            where: {
                id: courseId,
            },
            include: {
                teacher: true,
                tasks: true,
            },
        });
        if (!course) throw new BadRequestException('Course not found');

        await this.cache.set(
            `course:${course.id}`,
            JSON.stringify(course),
            'EX',
            60 * 5
        );
        return course;
    }
}
