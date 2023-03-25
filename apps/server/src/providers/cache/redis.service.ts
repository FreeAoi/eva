import ioredis from 'ioredis';
import { Injectable, Inject } from '@nestjs/common';
import type { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService extends ioredis {
    constructor(@Inject('OPTIONS') options: RedisOptions) {
        super(options);
    }

    async retrieve<T>(cacheKey: string): Promise<T | null> {
        const cachedData = await this.get(cacheKey);
        return cachedData ? JSON.parse(cachedData) : null;
    }

    async getUser<T>({
        email,
        id,
        key
    }: {
        email?: string;
        id?: string;
        key: string;
    }): Promise<T | null> {
        if (email) {
            const cached = await this.zrangebylex(
                `${key}:emails`,
                `[${email}`,
                `[${email}\xff`
            );
            id = cached[0]?.split(':')[1];
        }

        return await this.retrieve<T>(`${key}:${id}`);
    }
}
