import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
    providers: [TeacherService],
    controllers: [TeacherController],
    exports: [TeacherService],
})
export class TeacherModule {}
