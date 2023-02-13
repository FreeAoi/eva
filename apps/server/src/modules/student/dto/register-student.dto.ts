import { PickType } from '@nestjs/swagger';
import { StudentEntity } from '../../../providers/database/entities/student.entity';

export class RegisterStudentDTO extends PickType(StudentEntity, [
    'id',
    'email',
    'firstName',
    'lastName',
    'password',
    'careerId'
]) {}
