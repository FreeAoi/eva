/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import type { Teacher } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CourseEntity } from './course.entity';

export class TeacherEntity implements Teacher {
    @ApiProperty({
        example: '2022-0381U',
        description: 'Teacher id'
    })
    id: string;

    @ApiProperty({
        example: 'federicoxd@gmail.com',
        description: 'Teacher email'
    })
    email: string;

    @ApiProperty({
        example: 'Federico',
        description: 'Teacher first name'
    })
    firstName: string;

    @ApiProperty({
        example: 'Diaz',
        description: 'Teacher last name'
    })
    lastName: string;

    @Exclude()
    password: string;

    @ApiProperty({
        example: 'TEACHER',
        description: 'Teacher role',
        default: 'TEACHER'
    })
    role: string;

    @ApiProperty({
        example: 'FACULTAD DE INGENIERIA',
        description: 'Teacher faculty'
    })
    faculty: string;

    deleted: Date | null;
    createdAt: Date;
    updatedAt: Date;

    @ApiProperty({
        description: 'Courses assigned to the teacher',
        type: [CourseEntity]
    })
    courses: CourseEntity[];
}
