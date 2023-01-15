/* eslint-disable indent */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    courseId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    credits: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    instructor: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    careerId: number;
}
