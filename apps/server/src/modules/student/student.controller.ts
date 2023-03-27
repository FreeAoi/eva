import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpException,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from './student.service';
import { RegisterStudentDTO } from './dto/register-student.dto';
import { CurrentUser } from '../../common/decorators/requests/user-current.decorator';
import { ApiAcceptedResponse, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { StudentDTO } from './dto/student.dto';
import { UpdateStudentDTO } from './dto/update-student.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import type { JWTPayload } from '../../authentication/dto/jwt-payload.dto';
import type { Student } from '@prisma/client';

@Controller('student')
@ApiTags('Student')
export class StudentController {
    constructor(private studentsService: StudentService) {}

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiAcceptedResponse({
        description: 'Student data',
        type: StudentDTO,
    })
    async getMe(@CurrentUser() user: JWTPayload) {
        const student = await this.studentsService.get({ id: user.id });
        if (!student)
            throw new HttpException(
                { error: 'Ha ocurrido un error, inicie session nuevamente' },
                400
            );
        return new StudentDTO(student);
    }

    @Post('create')
    @ApiAcceptedResponse({
        description: 'Student created',
        type: StudentDTO,
    })
    async registerStudent(@Body() student: RegisterStudentDTO) {
        const studentCreated = await this.studentsService.registerStudent(
            student
        );
        return new StudentDTO(studentCreated);
    }

    @Put('me')
    @UseInterceptors(FileInterceptor('avatar'))
    @UseGuards(AuthGuard('jwt'))
    @ApiAcceptedResponse({
        description: 'Student updated',
        type: StudentDTO,
    })
    @ApiConsumes('multipart/form-data')
    async updateStudent(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: UpdateStudentDTO,
        @CurrentUser() user: JWTPayload
    ) {
        const studentUpdated = await this.studentsService.updateStudent(
            user.id,
            data,
            file
        );
        return new StudentDTO(studentUpdated as Student);
    }
}
