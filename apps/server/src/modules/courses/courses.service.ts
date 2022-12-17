import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Cache } from 'cache-manager';
@Injectable()
export class CoursesService {
    constructor(
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    createCourse(data: CreateCourseDTO) {
        return this.prisma.course.create({
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
    }

    getStudentCourses(id: string) {
        return this.prisma.course.findMany({
            where: {
                students: {
                    some: {
                        id
                    }
                }
            }
        });
    }

    updateCourse(data: UpdateCourseDTO) {
        return this.prisma.course.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                credits: data.credits,
                instructor: data.instructor,
                career: {
                    connect: {
                        id: data.careerId
                    }
                }
            }
        });
    }

    async addStudentToCourse(courseId: string, studentId: string) {
        // check if student is already in course
        const course = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                students: {
                    some: {
                        id: studentId
                    }
                }
            }
        });

        if (!course) {
            return this.prisma.course.update({
                where: {
                    id: courseId
                },
                data: {
                    students: {
                        connect: {
                            id: studentId
                        }
                    },
                    performances: {
                        create: {
                            student: {
                                connect: {
                                    id: studentId
                                }
                            },
                            note: 0
                        }
                    }
                }
            });
        } else {
            return course;
        }
    }

    updateStudentNote(data: {
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

    async getCourseData(courseId: string) {
        const course = this.cacheManager.get(courseId.toString());

        if (!course) {
            const course = await this.prisma.course.findFirst({
                where: {
                    id: courseId
                }
            });
            await this.cacheManager.set(courseId.toString(), course);
            return course;
        }

        return course;
    }
}
