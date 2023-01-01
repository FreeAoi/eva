/* eslint-disable indent */
import { IsEmail, IsNotEmpty } from 'class-validator';
import type { Role } from '../../../common/constants/roles.enum';

export class RegisterDTO {
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
