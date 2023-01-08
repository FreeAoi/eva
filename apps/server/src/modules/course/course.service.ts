import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import type { CreateCourseDTO } from './dto/create-course.dto';
import type { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService, private cache: CacheService) {}

    async createCourse(data: CreateCourseDTO) {
        // return 1: Course exists _or_ 0: Course doesn't exist
        const cachedCourse = await this.cache.hexists(`course:${data.courseId}`, 'id');
        if (cachedCourse) return { error: 'Course already exists' };

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

        await this.cache.hset(`course:${course.id}`, course);
        return course;
    }

    // TODO: Add cache
    updateCourse(data: UpdateCourseDTO) {
        const { removeStudents, addStudents, courseId, careerId, ...rest } = data;

        return this.prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                ...rest,
                ...(careerId && {
                    career: {
                        connect: {
                            id: careerId
                        }
                    }
                }),
                ...(addStudents && {
                    students: {
                        connect: addStudents.map((id) => ({ id }))
                    }
                }),
                ...(removeStudents && {
                    students: {
                        disconnect: removeStudents.map((id) => ({ id }))
                    }
                })
            }
        });
    }
}