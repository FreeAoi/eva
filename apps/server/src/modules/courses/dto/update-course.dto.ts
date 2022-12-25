/* eslint-disable indent */
import { CreateCourseDTO } from './create-course.dto';
import { IsArray, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {
    @IsArray()
    @IsOptional()
    addStudents: string[];

    @IsOptional()
    @IsArray()
    removeStudents: string[];
    // optinal fields from CreateCourseDTO
}
