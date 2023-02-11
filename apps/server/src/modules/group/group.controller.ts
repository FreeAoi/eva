import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { CreateGroupDTO } from './dto/create-group.dto';
import { ApiAcceptedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GroupEntity } from '../../providers/database/entities/group.entity';

@ApiTags('Group')
@Controller('/group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get(':id')
    @ApiAcceptedResponse({
        description: 'Group data',
        type: GroupEntity
    })
    @ApiParam({
        name: 'id',
        description: 'Group id'
    })
    async getGroup(@Param('id') id: string) {
        return this.groupService.get(id);
    }

    @Patch(':id')
    @ApiAcceptedResponse({
        description: 'Group updated',
        type: GroupEntity
    })
    @ApiParam({
        name: 'id',
        description: 'Group id'
    })
    async updateGroup(@Param('id') id: string, @Body() data: UpdateGroupDTO) {
        return this.groupService.update(id, data);
    }

    @Post()
    @ApiAcceptedResponse({
        description: 'Group created',
        type: GroupEntity
    })
    async createGroup(@Body() data: CreateGroupDTO) {
        return this.groupService.create(data);
    }
}
