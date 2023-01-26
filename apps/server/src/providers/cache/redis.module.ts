import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import type { DynamicModule } from '@nestjs/common';
import type { RedisOptions } from 'ioredis';

@Global()
@Module({})
export class RedisModule {
    static forRoot(options: RedisOptions): DynamicModule {
        return {
            module: RedisModule,
            providers: [
                {
                    provide: 'OPTIONS',
                    useValue: options
                },
                RedisService
            ],
            exports: [RedisService]
        };
    }
}
