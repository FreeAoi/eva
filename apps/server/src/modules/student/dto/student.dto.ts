/* eslint-disable indent */
import type { Student } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class StudentDTO implements Student {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    groupId: string | null;
    deleted: Date | null;

    @Exclude()
    careerId: number;

    @Exclude()
    password: string;

    constructor(partial: Partial<StudentDTO>) {
        Object.assign(this, partial);
    }
}
