/* eslint-disable indent */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class StudentLoginDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
