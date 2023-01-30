import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { UpdateGroupDTO } from './dto/update-group.dto';
import { CreateGroupDTO } from './dto/create-group.dto';

@Controller('/group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get(':id')
    async getGroup(@Param('id') id: string) {
        return this.groupService.get(id);
    }

    @Patch(':id')
    async updateGroup(@Param('id') id: string, @Body() data: UpdateGroupDTO) {
        return this.groupService.update(id, data);
    }

    @Post()
    async createGroup(@Body() data: CreateGroupDTO) {
        return this.groupService.create(data);
    }
}
