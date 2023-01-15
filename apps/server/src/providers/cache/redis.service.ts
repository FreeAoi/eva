import ioredis from 'ioredis';
import { Injectable, Inject } from '@nestjs/common';
import type { RedisOptions } from 'ioredis';

@Injectable()
export class CacheService extends ioredis {
    constructor(@Inject('OPTIONS') options: RedisOptions) {
        super(options);
    }
}
