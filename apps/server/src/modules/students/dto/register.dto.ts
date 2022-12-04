/* eslint-disable indent */
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class RegisterDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    career: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    id: string;
}
