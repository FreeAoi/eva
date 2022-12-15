import { Body, Controller, Get, Patch, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CurrentUser } from '../../common/decorators/user-current.decorator';
import { JWTPayload } from '../../authentication/interfaces/jwt-payload.interface';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Put('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    createCourse(@Body() data: CreateCourseDTO) {
        return this.coursesService.createCourse(data);
    }

    @Patch('update')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    updateCourse(@Body() data: UpdateCourseDTO) {
        return this.coursesService.updateCourse(data);
    }

    @Put('add-student')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    addStudentToCourse(@Body() data: { courseId: string; studentId: string }) {
        return this.coursesService.addStudentToCourse(
            data.courseId,
            data.studentId
        );
    }

    @Patch('update-note')
    @Roles(Role.ADMIN, Role.TEACHER)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    updateStudentNote(
        @Body() data: { courseId: string; studentId: string; note: number }
    ) {
        return this.coursesService.updateStudentNote(data);
    }

    @Get(':courseId')
    @UseGuards(AuthGuard('jwt'))
    getCourseData(@Body() data: { courseId: string }) {
        return this.coursesService.getCourseData(data.courseId);
    }

    @Get('student')
    @UseGuards(AuthGuard('jwt'))
    getStudentCourses(@CurrentUser() user: JWTPayload) {
        return this.coursesService.getStudentCourses(user.id);
    }
}
