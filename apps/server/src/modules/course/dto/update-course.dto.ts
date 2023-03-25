/* eslint-disable indent */
import { CreateCourseDTO } from './create-course.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateCourseDTO extends PartialType(
    OmitType(CreateCourseDTO, ['groupId'] as const)
) {}
