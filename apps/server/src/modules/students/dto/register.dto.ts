/* eslint-disable indent */
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class RegisterDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    careerId: number;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    id: string;
}
