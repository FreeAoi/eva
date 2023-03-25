/* eslint-disable indent */
import { IsDate, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDTO {
    @IsString()
    title: string;

    @IsInt()
    @Type(() => Number)
    maxScore: number;

    @IsDate()
    @Type(() => Date)
    dueDate: Date;
}
