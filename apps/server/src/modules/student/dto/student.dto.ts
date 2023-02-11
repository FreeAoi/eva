/* eslint-disable indent */
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { CourseEntity } from '../../../providers/database/entities/course.entity';
import { GroupEntity } from '../../../providers/database/entities/group.entity';
import { StudentEntity } from '../../../providers/database/entities/student.entity';

@Exclude()
class CourseInGroupInStudent extends PickType(CourseEntity, [
    'id',
    'name',
    'teacherId'
]) {}

@Exclude()
class GroupInStudent extends PickType(GroupEntity, ['id', 'name']) {
    @ApiProperty({
        description: 'Group courses',
        type: [CourseInGroupInStudent]
    })
    @Type(() => CourseInGroupInStudent)
    @Expose()
    courses: CourseInGroupInStudent[];
}

@Exclude()
export class StudentDTO extends PickType(StudentEntity, [
    'id',
    'email',
    'firstName',
    'lastName',
    'groupId'
]) {
    @ApiProperty({
        description: 'Student career data'
    })
    @Expose()
    career: {
        id: number;
        name: string;
    };

    @ApiProperty({
        description: 'Student group data',
        type: GroupInStudent
    })
    @Expose()
    @Type(() => GroupInStudent)
    group: GroupInStudent;

    constructor(student: Partial<StudentDTO>) {
        super();
        Object.assign(this, student);
    }
}
