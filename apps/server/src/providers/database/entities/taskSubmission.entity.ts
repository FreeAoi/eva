/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import type { TaskSubmission } from '@prisma/client';
import { Expose } from 'class-transformer';

export class TaskSubmissionEntity implements TaskSubmission {
    @ApiProperty({
        description: 'Submission id'
    })
    @Expose()
    id: number;

    @ApiProperty({
        description: 'Task id'
    })
    @Expose()
    taskId: number;

    @ApiProperty({
        description: 'Student id'
    })
    @Expose()
    studentId: string;

    @ApiProperty({
        description: 'Submission score'
    })
    @Expose()
    score: number;

    @ApiProperty({
        description: 'Submission comment',
        type: 'string'
    })
    comment: string | null;

    @ApiProperty({
        description: 'Submission teacher id',
        type: 'string'
    })
    teacherId: string | null;

    @ApiProperty({
        description: 'Submission created at',
        type: 'string'
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        description: 'check if submission is qualified',
        default: false
    })
    qualified: boolean;

    @ApiProperty({
        description: 'Submission updated at',
        type: 'string'
    })
    updatedAt: Date;
}
