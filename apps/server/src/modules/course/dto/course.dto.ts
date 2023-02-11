/* eslint-disable indent */
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CourseEntity } from '../../../providers/database/entities/course.entity';

export class CourseDTO extends PickType(CourseEntity, ['id', 'name']) {
    @ApiProperty({
        description: 'Teacher data',
        example: {
            id: 'teacher-id',
            email: 'beautiful@gmail.com'
        }
    })
    teacher: {
        id: string;
        email: string;
    };

    constructor(course: Partial<CourseDTO>) {
        super();
        Object.assign(this, course);
    }
}
