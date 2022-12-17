/* eslint-disable indent */
import { IsNotEmpty } from 'class-validator';

export class CreateCourseDTO {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    credits: number;

    @IsNotEmpty()
    instructor: string;

    @IsNotEmpty()
    careerId: number;
}
