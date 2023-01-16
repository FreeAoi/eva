/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../../../common/constants/roles.enum';

export class RegisterStudentDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email',
        example: 'beautiful@gmail.com'
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User password',
        example: '123456'
    })
    password: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User first name',
        example: 'John'
    })
    firstName: string;

    @ApiProperty({
        description: 'User last name',
        example: 'Doe'
    })
    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User career id',
        example: 1
    })
    careerId: number;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User role',
        example: 'STUDENT',
        enum: Role
    })
    role: Role;

    @IsNotEmpty()
    @ApiProperty({
        description: 'User student id',
        example: '2023-0142A'
    })
    id: string;
}
