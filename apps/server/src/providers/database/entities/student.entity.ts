/* eslint-disable indent */
import type { Student } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsEmpty, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class StudentEntity implements Student {
    @ApiProperty({
        example: '2022-0381U',
        description: 'Student id'
    })
    @IsString()
    @Expose()
    id: string;

    @ApiProperty({
        example: 'uwu@gmail.com',
        description: 'Student email'
    })
    @IsEmail()
    @Expose()
    email: string;

    @ApiProperty({
        example: 'John',
        description: 'Student first name'
    })
    @IsString()
    @Expose()
    firstName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Student last name'
    })
    @IsString()
    @Expose()
    lastName: string;

    @ApiProperty({
        example: 'STUDENT',
        description: 'Student role',
        default: 'STUDENT'
    })
    @IsEmpty()
    @Expose()
    role: string;

    @ApiProperty({
        example: '1M3-CO',
        description: 'Student group id'
    })
    @IsString()
    @Expose()
    groupId: string | null;

    @ApiProperty({
        example: 1,
        description: 'Student career id'
    })
    @IsNumber()
    @Expose()
    careerId: number;

    @ApiProperty({
        example: '2021-01-01',
        description: 'Date when student was deleted'
    })
    @IsEmpty()
    @Expose()
    deleted: Date | null;

    @ApiProperty({
        example: '2021-01-01',
        description: 'Date when student was created'
    })
    @IsEmpty()
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '2021-01-01',
        description: 'Date when student was updated'
    })
    @IsEmpty()
    @Expose()
    updatedAt: Date;

    @ApiProperty({
        example: 'somepassword',
        description: 'Student password',
        writeOnly: true
    })
    @IsString()
    @IsStrongPassword()
    password: string;
}