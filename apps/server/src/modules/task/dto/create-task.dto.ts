/* eslint-disable indent */
import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    @Type(() => Number)
    maxScore: number;
}
