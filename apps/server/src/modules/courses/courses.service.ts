import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    createCourse(data: CreateCourseDTO) {
        return this.prisma.course.create({
            data: {
                courseName: data.courseName,
                courseCode: data.courseCode,
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
                student: {
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
                courseName: data.courseName,
                courseCode: data.courseCode,
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

    async addStudentToCourse(courseId: number, studentId: string) {
        // check if student is already in course
        const course = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                student: {
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
                    student: {
                        connect: {
                            id: studentId
                        }
                    },
                    performance: {
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
        courseId: number;
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

    deleteCourse(courseId: number) {
        return this.prisma.course.delete({
            where: {
                id: courseId
            }
        });
    }
}
