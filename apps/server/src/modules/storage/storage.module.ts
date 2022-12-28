import { DynamicModule, Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import type { S3ClientConfig } from '@aws-sdk/client-s3';

@Global()
@Module({})
export class StorageModule {
    static register(options: S3ClientConfig): DynamicModule {
        return {
            module: StorageModule,
            providers: [
                {
                    provide: 'OPTIONS',
                    useValue: options
                },
                StorageService
            ],
            exports: [StorageService]
        };
    }
}
