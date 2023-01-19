import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
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
}
