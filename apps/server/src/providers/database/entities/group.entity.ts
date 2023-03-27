/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import type { Group } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GroupEntity implements Group {
    @ApiProperty({
        description: 'Group id',
        example: '1M3-CO',
    })
    @Expose()
    id: string;

    @ApiProperty({
        description: 'Group name',
        example: 'Computer science I year',
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'Career id',
        example: 1,
    })
    @Expose()
    careerId: number;

    @ApiProperty({
        description: 'Date when group was created',
        example: '2021-01-01',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        description: 'Date when group was updated',
        example: '2021-01-01',
    })
    @Expose()
    updatedAt: Date;
}
