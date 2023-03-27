/* eslint-disable indent */
import { ApiPropertyOptional, PartialType, PickType } from '@nestjs/swagger';
import { StudentEntity } from '../../../providers/database/entities/student.entity';

export class UpdateStudentDTO extends PartialType(
    PickType(StudentEntity, ['password', 'description', 'city'])
) {
    @ApiPropertyOptional({
        description: 'user avatar',
        type: 'string',
        format: 'binary',
    })
    avatar: string;
}
