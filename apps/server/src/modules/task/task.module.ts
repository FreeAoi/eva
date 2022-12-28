import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { BullModule } from '@nestjs/bull';
import { UploadConsumer } from './upload.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'upload'
        })
    ],
    controllers: [TaskController],
    providers: [TaskService, UploadConsumer]
})
export class TaskModule {}
