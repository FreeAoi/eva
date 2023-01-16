/* eslint-disable indent */
import { CreateCourseDTO } from './create-course.dto';
import { IsOptional, Validate } from 'class-validator';
import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsStudent } from '../../../common/decorators/validation/studentExists';

export class UpdateCourseDTO extends PartialType(
    OmitType(CreateCourseDTO, ['careerId', 'courseId'] as const)
) {
    @Validate(IsStudent, {
        each: true
    })
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Array of student ids to connect to the course',
        example: ['2023-0142A', '2023-1234B']
    })
    connect?: string[];

    @Validate(IsStudent, {
        each: true
    })
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Array of student ids to disconnect from the course',
        example: ['2023-0142A', '2023-1234B']
    })
    disconnect?: string[];
}
