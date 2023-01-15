/* eslint-disable indent */
import { Validate } from 'class-validator';
import { CourseExists } from '../../../common/decorators/validation/courseExists';

export class CheckCourseDTO {
    @Validate(CourseExists)
    courseId: string;
}
