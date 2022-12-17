import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
    controllers: [StudentController],
    providers: [StudentsService],
    exports: [StudentsService]
})
export class StudentsModule {}
