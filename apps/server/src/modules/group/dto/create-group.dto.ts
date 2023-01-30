/* eslint-disable indent */
import { IsNumber, IsString, Validate } from 'class-validator';
import { StudentExists } from '../../../common/validation/studentExists';

export class CreateGroupDTO {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsNumber()
    careerId: number;

    @Validate(StudentExists, {
        each: true
    })
    students: string[];
}
