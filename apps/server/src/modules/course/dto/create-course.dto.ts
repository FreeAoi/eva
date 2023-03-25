/* eslint-disable indent */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Course instructor id',
        example: '2022-0381A'
    })
    teacherId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Group id',
        example: 'ICS-1'
    })
    groupId: string;
}
