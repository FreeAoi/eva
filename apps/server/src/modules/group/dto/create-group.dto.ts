/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Validate } from 'class-validator';
import { StudentExists } from '../../../common/validation/studentExists';

export class CreateGroupDTO {
    @ApiProperty({
        description: 'Group name',
        example: '1M3-CO'
    })
    @IsString()
    id: string;

    @ApiProperty({
        description: 'Group name',
        example: 'Computer science I year'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Career id',
        example: 1
    })
    @IsNumber()
    careerId: number;

    @ApiProperty({
        description: 'Students ids',
        example: ['2019-12345', '2019-12346']
    })
    @Validate(StudentExists, {
        each: true
    })
    students: string[];
}
