import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/metadata/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CheckCourseDTO } from './dto/check-course.dto';

@Controller()
export class CourseController {
    constructor(private readonly coursesService: CourseService) {}

    @Post()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async createCourse(@Body() data: CreateCourseDTO) {
        return this.coursesService.createCourse(data);
    }

    @Patch(':courseId')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateCourse(@Body() data: UpdateCourseDTO, @Param() params: CheckCourseDTO) {
        return this.coursesService.updateCourse(params.courseId, data);
    }
}
