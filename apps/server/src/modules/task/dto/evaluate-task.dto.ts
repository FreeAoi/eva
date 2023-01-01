import { IsNumber, IsString } from 'class-validator';

/* eslint-disable indent */
export class EvaluateTaskDTO {
    @IsNumber()
    taskId: number;

    @IsString()
    studentId: number;

    @IsNumber()
    score: number;
}
