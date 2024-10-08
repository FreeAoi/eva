import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/database/prisma.service';
import type { UpdateGroupDTO } from './dto/update-group.dto';
import type { CreateGroupDTO } from './dto/create-group.dto';

@Injectable()
export class GroupService {
    constructor(private readonly prisma: PrismaService) {}
    create(data: CreateGroupDTO) {
        const { students, ...rest } = data;
        return this.prisma.group.create({
            data: {
                ...rest,
                students: {
                    connect: data.students.map((id) => ({ id })),
                },
            },
            include: {
                students: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                courses: true,
            },
        });
    }

    async get(id: string) {
        return this.prisma.group.findUnique({
            where: {
                id,
            },
            include: {
                students: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                courses: true,
            },
        });
    }

    async update(id: string, data: UpdateGroupDTO) {
        return this.prisma.group.update({
            where: {
                id,
            },
            data,
            include: {
                students: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                courses: true,
            },
        });
    }
}
