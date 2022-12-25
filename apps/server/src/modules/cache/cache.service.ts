import ioredis from 'ioredis';
import { Injectable, Inject } from '@nestjs/common';
import { CacheModuleOptions } from './cache.interface';

@Injectable()
export class CacheService extends ioredis {
    constructor(@Inject('OPTIONS') options: CacheModuleOptions) {
        super(options);
    }
}
