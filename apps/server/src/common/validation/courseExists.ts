import { Injectable, NotFoundException } from '@nestjs/common';

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CourseService } from '../../modules/course/course.service';

@ValidatorConstraint({ name: 'CourseExists', async: true })
@Injectable()
export class CourseExists implements ValidatorConstraintInterface {
    constructor(private courseService: CourseService) {}

    async validate(id: string): Promise<boolean> {
        const course = await this.courseService.getCourse(id);
        if (!course) throw new NotFoundException('Course not found');
        return true;
    }
}
