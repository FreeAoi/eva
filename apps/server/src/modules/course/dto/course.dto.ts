/* eslint-disable indent */
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CourseEntity } from '../../../providers/database/entities/course.entity';
import { TaskEntity } from '../../../providers/database/entities/task.entity';
import { TeacherEntity } from '../../../providers/database/entities/teacher.entity';

export class TaskInCourse extends PickType(TaskEntity, [
    'id',
    'title',
    'dueDate',
] as const) {}
export class TeacherInCourse extends PickType(TeacherEntity, [
    'firstName',
    'lastName',
] as const) {}

export class CourseDTO extends PickType(CourseEntity, [
    'id',
    'name',
    'generalObjective',
    'specificObjective',
    'about',
] as const) {
    @ApiProperty({
        description: 'Teacher data',
        type: TeacherInCourse,
    })
    @Type(() => TeacherInCourse)
    @Expose()
    teacher: TeacherInCourse;

    @ApiProperty({
        description: 'Courses tasks',
        type: [TaskInCourse],
    })
    @Type(() => TaskInCourse)
    @Expose()
    tasks: TaskInCourse[];

    constructor(course: Partial<CourseDTO>) {
        super();
        Object.assign(this, course);
    }
}
