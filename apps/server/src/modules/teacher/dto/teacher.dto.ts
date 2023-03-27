/* eslint-disable indent */
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CourseEntity } from '../../../providers/database/entities/course.entity';
import { TeacherEntity } from '../../../providers/database/entities/teacher.entity';

class TeacherCourses extends PickType(CourseEntity, [
    'id',
    'name',
    'teacherId',
] as const) {}

export class TeacherDTO extends PickType(TeacherEntity, [
    'email',
    'firstName',
    'lastName',
    'id',
    'role',
    'avatar',
] as const) {
    @ApiProperty({
        description: 'Teacher courses',
        type: [TeacherCourses],
    })
    @Type(() => TeacherCourses)
    @Expose()
    courses: TeacherCourses[];

    constructor(partial: Partial<TeacherDTO>) {
        super();
        Object.assign(this, partial);
    }
}
