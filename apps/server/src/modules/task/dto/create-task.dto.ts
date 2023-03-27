/* eslint-disable indent */
import { IsDate, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
    @ApiProperty({ type: 'string' })
    @IsString()
    title: string;

    @ApiProperty({ type: 'string' })
    @IsInt()
    @Type(() => Number)
    maxScore: number;

    @ApiProperty({ type: 'string' })
    @IsDate()
    @Type(() => Date)
    dueDate: Date;

    @ApiProperty({ type: 'string', format: 'binary' })
    file: string;
}
