import { Body, Controller, Patch, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Put('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async createCourse(@Body() data: CreateCourseDTO) {
        return this.coursesService.createCourse(data);
    }

    @Patch('update')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateCourse(@Body() data: UpdateCourseDTO) {
        return this.coursesService.updateCourse(data);
    }

    @Patch('update/qualification')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async updateStudentInCourse(
        @Body() data: { courseId: string; studentId: string; note: number }
    ) {
        return this.coursesService.updateStudentQualification(data);
    }
}
