import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TaskModule } from '../task/task.module';

@Module({
    imports: [TaskModule],
    controllers: [CourseController],
    providers: [CourseService]
})
export class CourseModule {}
