import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { UploadConsumer } from './consumers/upload.consumer';
import { UploadProducer } from './producers/upload.producer';
import { StorageModule } from '../modules/storage/storage.module';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'upload'
        }),
        StorageModule.register({
            region: 'auto',
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_KEY_ID,
                secretAccessKey: process.env.R2_SECREY_KEY
            }
        })
    ],
    providers: [UploadConsumer, UploadProducer],
    exports: [UploadProducer]
})
export class JobsModule {}
