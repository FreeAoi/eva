/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import type { Course } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CourseEntity implements Course {
    @ApiProperty({
        description: 'Course id',
        example: 'BEAU',
    })
    @Expose()
    id: string;

    @ApiProperty({
        description: 'Course name',
        example: 'Bases de datos avanzadas',
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'Group id',
        example: '1M3-CO',
    })
    @Expose()
    groupId: string;

    @ApiProperty({
        description: 'Teacher id',
        example: '2022-0381U',
    })
    @Expose()
    teacherId: string;

    @ApiProperty({
        description: 'Course description',
        example: 'Some beautiful description',
        nullable: true,
        oneOf: [{ type: 'string' }, { type: 'null' }],
    })
    @Expose()
    about: string | null;

    @ApiProperty({
        description: 'Course general objective',
        example: 'Some beautiful general objective',
        oneOf: [{ type: 'string' }, { type: 'null' }],
    })
    @Expose()
    generalObjective: string | null;

    @ApiProperty({
        description: 'Course specific objective',
        example: 'Some beautiful specific objective',
        oneOf: [{ type: 'string' }, { type: 'null' }],
    })
    @Expose()
    specificObjective: string | null;
}
