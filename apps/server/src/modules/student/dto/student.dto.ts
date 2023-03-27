/* eslint-disable indent */
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CourseEntity } from '../../../providers/database/entities/course.entity';
import { GroupEntity } from '../../../providers/database/entities/group.entity';
import { StudentEntity } from '../../../providers/database/entities/student.entity';

class CourseInGroupInStudent extends PickType(CourseEntity, [
    'id',
    'name',
    'teacherId',
]) {}

class GroupInStudent extends PickType(GroupEntity, ['id', 'name']) {
    @ApiProperty({
        description: 'Group courses',
        type: [CourseInGroupInStudent],
    })
    @Type(() => CourseInGroupInStudent)
    @Expose()
    courses: CourseInGroupInStudent[];
}

export class StudentDTO extends PickType(StudentEntity, [
    'id',
    'email',
    'firstName',
    'lastName',
    'description',
    'avatar',
    'role',
    'city',
]) {
    @ApiProperty({
        description: 'Student career data',
    })
    @Expose()
    career: {
        id: number;
        name: string;
    };

    @ApiProperty({
        description: 'Student group data',
        type: GroupInStudent,
    })
    @Type(() => GroupInStudent)
    @Expose()
    group: GroupInStudent;

    constructor(student: Partial<StudentDTO>) {
        super();
        Object.assign(this, student);
    }
}
