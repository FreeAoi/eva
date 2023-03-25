/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class QualifySubmissionDTO {
    @ApiProperty({
        description: 'score submission',
        type: Number
    })
    @IsInt()
    score: number;

    @ApiProperty({
        description: 'comment submission',
        type: String
    })
    @IsString()
    comment: string;
}
