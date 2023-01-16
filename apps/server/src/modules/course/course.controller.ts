import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/metadata/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CheckCourseDTO } from './dto/check-course.dto';
import {
    ApiForbiddenResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

@Controller()
export class CourseController {
    constructor(private readonly coursesService: CourseService) {}

    @Post()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiHeader({ name: 'Authorization', description: 'Bearer token', required: true })
    @ApiOkResponse({ description: 'Course created successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Not enough permissions' })
    async createCourse(@Body() data: CreateCourseDTO) {
        return this.coursesService.createCourse(data);
    }

    @Patch(':courseId')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiHeader({ name: 'Authorization', description: 'Bearer token', required: true })
    @ApiParam({ name: 'courseId', description: 'Course id', example: 'CS-101' })
    @ApiOkResponse({ description: 'Course updated successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Not enough permissions' })
    @ApiNotFoundResponse({ description: 'Course not found' })
    async updateCourse(@Body() data: UpdateCourseDTO, @Param() params: CheckCourseDTO) {
        return this.coursesService.updateCourse(params.courseId, data);
    }
}
