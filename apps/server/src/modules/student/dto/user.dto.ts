/* eslint-disable indent */
import type { Role, Student } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class StudentDTO implements Student {
    id: string;
    email: string;

    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    careerId: number | null;

    @Exclude()
    password: string;

    constructor(partial: Partial<StudentDTO>) {
        Object.assign(this, partial);
    }
}
