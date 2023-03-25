import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { UploadConsumer } from './consumers/upload.consumer';
import { UploadProducer } from './producers/upload.producer';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'upload'
        })
    ],
    providers: [UploadConsumer, UploadProducer],
    exports: [UploadProducer]
})
export class JobsModule {}
