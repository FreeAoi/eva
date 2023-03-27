import { DynamicModule, Global, Module } from '@nestjs/common';
import { R2Service } from './r2.service';
import type { S3ClientConfig } from '@aws-sdk/client-s3';

@Global()
@Module({})
export class R2Module {
    static forRoot(options: S3ClientConfig): DynamicModule {
        return {
            module: R2Module,
            providers: [
                {
                    provide: 'OPTIONS',
                    useValue: options,
                },
                R2Service,
            ],
            exports: [R2Service],
        };
    }
}
