import type { RedisOptions } from 'ioredis';

export interface CacheModuleOptions {
    host: string;
    port: number;
    options?: RedisOptions;
}
