/* eslint-disable indent */
import type { Student } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StudentEntity implements Student {
    @ApiProperty({
        example: '2022-0381U',
        description: 'Student id'
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'uwu@gmail.com',
        description: 'Student email'
    })
    @Expose()
    email: string;

    @ApiProperty({
        example: 'John',
        description: 'Student first name'
    })
    @Expose()
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Student last name'
    })
    @Expose()
    lastName: string;

    @ApiProperty({
        example: 'STUDENT',
        description: 'Student role',
        default: 'STUDENT'
    })
    @Expose()
    role: string;

    @ApiProperty({
        example: '1M3-CO',
        description: 'Student group id'
    })
    @Expose()
    groupId: string | null;

    @ApiProperty({
        example: 1,
        description: 'Student career id'
    })
    @Expose()
    careerId: number;

    @ApiProperty({
        example: '2021-01-01',
        description: 'Date when student was deleted'
    })
    @Expose()
    deleted: Date | null;

    @ApiProperty({
        example: '2021-01-01',
        description: 'Date when student was created'
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '2021-01-01',
        description: 'Date when student was updated'
    })
    @Expose()
    updatedAt: Date;

    password: string;
}
