/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class JWTPayload {
    @ApiProperty({
        description: 'User email',
        example: 'xd@gmail.com',
    })
    email: string;

    @ApiProperty({
        description: 'User id',
        example: '1',
    })
    id: string;

    @ApiProperty({
        description: 'User role',
        example: 'student',
    })
    role: string;
}
