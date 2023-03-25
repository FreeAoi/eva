import { Module } from '@nestjs/common';
import { JobsModule } from '../../jobs/jobs.module';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports: [JobsModule],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule {}
