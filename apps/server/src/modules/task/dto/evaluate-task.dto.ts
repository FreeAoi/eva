import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CheckTaskDTO } from './check-task.dto';

/* eslint-disable indent */
export class CheckSubmitDTO extends CheckTaskDTO {
    @IsNumber()
    @Type(() => Number)
    submitId: number;
}

export class UpdateSubmissionDTO {
    @IsNumber()
    score: number;

    @IsString()
    @ApiPropertyOptional({
        description: 'Comment for the submission',
        example: 'Good job!',
    })
    comment: string;
}
