/* eslint-disable indent */
import type { Task } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskEntity implements Task {
    @ApiProperty({
        description: 'The id of the task',
    })
    @Expose()
    id: number;

    @ApiProperty({
        description: 'The title of the task',
    })
    @Expose()
    title: string;

    @ApiProperty({
        description: 'The max score of the task',
    })
    @Expose()
    maxScore: number;

    @ApiProperty({
        description: 'The id of the course',
    })
    @Expose()
    courseId: string;

    @ApiProperty({
        description: 'The due date of the task',
        type: 'string',
    })
    @Expose()
    dueDate: Date;

    @ApiProperty({
        description: 'The deleted date of the task',
        nullable: true,
        type: Date,
    })
    @Expose()
    deleted: Date | null;

    @ApiProperty({
        description: 'The created date of the task',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        description: 'The updated date of the task',
    })
    @Expose()
    updatedAt: Date;
}
