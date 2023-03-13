/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Teacher, Role } from '@prisma/client';

export class TeacherEntity implements Teacher {
    @ApiProperty({
        example: '2022-0381U',
        description: 'Teacher id'
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'federicoxd@gmail.com',
        description: 'Teacher email'
    })
    @Expose()
    email: string;

    @ApiProperty({
        example: 'Federico',
        description: 'Teacher first name'
    })
    @Expose()
    firstName: string;

    @ApiProperty({
        example: 'Diaz',
        description: 'Teacher last name'
    })
    @Expose()
    lastName: string;

    @ApiProperty({
        example: Role.TEACHER,
        description: 'Teacher role',
        default: Role.TEACHER,
        type: 'enum',
        enum: Role
    })
    @Expose()
    role: Role;

    @ApiProperty({
        example: 'FACULTAD DE INGENIERIA',
        description: 'Teacher faculty'
    })
    @Expose()
    faculty: string;

    @ApiProperty({
        example: 'avatar',
        description: 'Teacher avatar'
    })
    @Expose()
    avatar: string;

    password: string;
    deleted: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
