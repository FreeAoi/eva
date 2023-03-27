/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
    @ApiProperty({
        description: 'User email',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password',
    })
    @IsNotEmpty()
    password: string;
}
