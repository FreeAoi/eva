/* eslint-disable indent */
import { IsNotEmpty } from 'class-validator';

export class CreateCourseDTO {
    @IsNotEmpty()
    courseName: string;

    @IsNotEmpty()
    courseCode: string;

    @IsNotEmpty()
    credits: number;

    @IsNotEmpty()
    instructor: string;

    @IsNotEmpty()
    careerId: number;
}
