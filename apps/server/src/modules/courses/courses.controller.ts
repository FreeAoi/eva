import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Patch,
    Post,
    Put,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/user-roles.decorator';
import { Role } from '../../common/constants/roles.enum';
import { Request as Req } from 'express';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post('create')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    createCourse(@Body() data: CreateCourseDTO) {
        return this.coursesService.createCourse(data);
    }

    @Delete('delete')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    deleteCourse(@Body() data: { courseId: number }) {
        return this.coursesService.deleteCourse(data.courseId);
    }

    @Get('student')
    @UseGuards(AuthGuard('jwt'))
    getStudentCourses(@Request() req: Req) {
        if (!req.user)
            throw new HttpException(
                { error: 'No se ha encontrado el estudiante' },
                404
            );
        return this.coursesService.getStudentCourses(req.user.id);
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
    addStudentToCourse(@Body() data: { courseId: number; studentId: string }) {
        return this.coursesService.addStudentToCourse(
            data.courseId,
            data.studentId
        );
    }

    @Patch('update-note')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    updateStudentNote(
        @Body() data: { courseId: number; studentId: string; note: number }
    ) {
        return this.coursesService.updateStudentNote(data);
    }
}
