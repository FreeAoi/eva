/* eslint-disable indent */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Course id',
        example: 'CS-101'
    })
    courseId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Course name',
        example: 'Introduction to Computer Science'
    })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Course credits',
        example: 4
    })
    credits: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Course instructor',
        example: 'John Doe'
    })
    instructor: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Career id'
    })
    careerId: number;
}
