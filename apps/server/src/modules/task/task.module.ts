import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { JobsModule } from '../../jobs/jobs.module';

@Module({
    imports: [JobsModule],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
