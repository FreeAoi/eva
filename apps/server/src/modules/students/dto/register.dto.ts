/* eslint-disable indent */
import { IsEmail, IsNotEmpty } from 'class-validator';

enum Role {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT'
}

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
    role: Role;

    @IsNotEmpty()
    id: string;
}
