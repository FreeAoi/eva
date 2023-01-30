/* eslint-disable indent */
import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateGroupDTO } from './create-group.dto';

export class UpdateGroupDTO extends PartialType(
    OmitType(CreateGroupDTO, ['students'] as const)
) {}
