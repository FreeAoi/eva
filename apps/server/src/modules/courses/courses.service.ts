import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CacheService } from '../cache/cache.service';
@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService, private cache: CacheService) {}

    async createCourse(data: CreateCourseDTO) {
        // return 1: Course exists _or_ 0: Course doesn't exist
        const cachedCourse = await this.cache.hexists(
            `course:${data.id}`,
            'id'
        );
        if (cachedCourse === 1) return { error: 'Course already exists' };

        const course = await this.prisma.course.create({
            data: {
                name: data.name,
                id: data.id,
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

    updateCourse(data: UpdateCourseDTO) {
        const { removeStudents, addStudents, id, careerId, ...rest } = data;

        return this.prisma.course.update({
            where: {
                id: id
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
                    },
                    performances: {
                        create: addStudents.map((id) => ({
                            student: {
                                connect: {
                                    id
                                }
                            },
                            note: 0
                        }))
                    }
                }),
                ...(removeStudents && {
                    students: {
                        disconnect: removeStudents.map((id) => ({ id }))
                    },
                    performances: {
                        deleteMany: removeStudents.map((id) => ({
                            studentId: id
                        }))
                    }
                })
            }
        });
    }

    updateStudentQualification(data: {
        courseId: string;
        studentId: string;
        note: number;
    }) {
        return this.prisma.performance.update({
            where: {
                studentId_courseId: {
                    courseId: data.courseId,
                    studentId: data.studentId
                }
            },
            data: {
                note: data.note
            }
        });
    }
}
