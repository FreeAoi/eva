import { Module } from '@nestjs/common';
import PrismaModule from '../prisma/prisma.module';
import StudentController from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports: [PrismaModule],
    controllers: [StudentController],
    providers: [StudentService]
})
class StudentModule {}

export default StudentModule;