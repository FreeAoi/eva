import ioredis from 'ioredis';
import { Injectable, Inject } from '@nestjs/common';
import type { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService extends ioredis {
    constructor(@Inject('OPTIONS') options: RedisOptions) {
        super(options);
    }

    /**
     *
     * Search for a user by email or id in the cache
     * key:emails is a sorted set with the format email:id
     *
     * @param {Object} options
     * @param {string} [options.email] email of the user
     * @param {string} [options.id] id of the user
     * @param {string} options.key key of the user (student or teacher)
     * @returns
     */
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

        const cachedUser = await this.get(`${key}:${id}`);
        return cachedUser ? JSON.parse(cachedUser) : null;
    }
}
