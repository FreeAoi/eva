import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import type { CacheModuleOptions } from './cache.interface';
import type { DynamicModule } from '@nestjs/common';
@Global()
@Module({})
export class CacheModule {
    static register(options: CacheModuleOptions): DynamicModule {
        return {
            module: CacheModule,
            providers: [
                {
                    provide: 'OPTIONS',
                    useValue: options
                },
                CacheService
            ],
            exports: [CacheService]
        };
    }
}
