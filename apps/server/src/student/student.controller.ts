import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StudentLoginDTO } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
class StudentController {
    constructor(private studentService: StudentService) { }

    @Get(':id')
    getStudent(@Query('id') id: string) {
        return this.studentService.getStudentById(id);
    }

    @Post('login')
    loginStudent(@Body() student: StudentLoginDTO) {
        return 'xd';
    }
}

export default StudentController;