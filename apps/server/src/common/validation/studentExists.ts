import { Injectable, NotFoundException } from '@nestjs/common';

import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { StudentService } from '../../modules/student/student.service';

@ValidatorConstraint({ name: 'isStudent', async: true })
@Injectable()
export class StudentExists implements ValidatorConstraintInterface {
    constructor(private studentService: StudentService) {}

    async validate(id: string): Promise<boolean> {
        console.log('Validating student', id);
        const student = await this.studentService.get({ id });
        if (!student) throw new NotFoundException(`Student with id ${id} not found`);
        return true;
    }
}
