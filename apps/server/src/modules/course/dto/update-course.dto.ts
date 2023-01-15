/* eslint-disable indent */
import { CreateCourseDTO } from './create-course.dto';
import { IsOptional, Validate } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsStudent } from '../../../common/decorators/validation/studentExists';

export class UpdateCourseDTO extends PartialType(
    OmitType(CreateCourseDTO, ['careerId', 'courseId'] as const)
) {
    @Validate(IsStudent, {
        each: true
    })
    @IsOptional()
    @ApiProperty()
    connect?: string[];

    @Validate(IsStudent, {
        each: true
    })
    @IsOptional()
    @ApiProperty()
    disconnect?: string[];
}
