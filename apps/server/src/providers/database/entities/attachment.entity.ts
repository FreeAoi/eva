/* eslint-disable indent */
import type { Attachment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AttachmentEntity implements Attachment {
    @ApiProperty({
        description: 'The id of the attachment',
    })
    @Expose()
    id: number;

    @ApiProperty({
        description: 'The name of the attachment',
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'The url of the attachment',
    })
    @Expose()
    url: string;

    @ApiProperty({
        description: 'The id of the task',
        nullable: true,
        type: 'number',
    })
    @Expose()
    taskId: number | null;
    @ApiProperty({
        description: 'The id of the submission',
        nullable: true,
        type: 'number',
    })
    @Expose()
    submissionId: number | null;

    createdAt: Date;
    updatedAt: Date;
}
