import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDTO } from './dto/create-course.dto';
import { CourseService } from './course.service';
import { RoleGuard } from '../../common/guards/roles.guard';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { CheckCourseDTO } from './dto/check-course.dto';
import {
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CourseDTO } from './dto/course.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
    constructor(private readonly coursesService: CourseService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @ApiOkResponse({
        description: 'Course created successfully',
        type: CourseDTO,
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Not enough permissions' })
    async createCourse(@Body() data: CreateCourseDTO) {
        const course = await this.coursesService.createCourse(data);
        return new CourseDTO(course);
    }

    @Patch(':courseId')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token',
        required: true,
    })
    @ApiParam({ name: 'courseId', description: 'Course id', example: 'CS-101' })
    @ApiOkResponse({
        description: 'Course updated successfully',
        type: CourseDTO,
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiForbiddenResponse({ description: 'Not enough permissions' })
    @ApiNotFoundResponse({ description: 'Course not found' })
    async updateCourse(
        @Body() data: UpdateCourseDTO,
        @Param() params: CheckCourseDTO
    ) {
        const updatedCourse = await this.coursesService.updateCourse(
            params.courseId,
            data
        );
        return new CourseDTO(updatedCourse);
    }

    @Get(':courseId')
    @ApiParam({
        name: 'courseId',
        description: 'Course id',
        example: 'CS-101',
        type: String,
    })
    @ApiOkResponse({ description: 'Course data', type: CourseDTO })
    @ApiBearerAuth()
    async getCourse(@Param() params: CheckCourseDTO) {
        const course = await this.coursesService.getCourse(params.courseId);
        const crs = new CourseDTO(course);
        return crs;
    }
}
