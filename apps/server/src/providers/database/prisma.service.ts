import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
    implements OnModuleInit
{
    private readonly logger = new Logger(PrismaService.name);
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query'
                },
                {
                    emit: 'stdout',
                    level: 'error'
                },
                {
                    emit: 'stdout',
                    level: 'info'
                },
                {
                    emit: 'stdout',
                    level: 'warn'
                }
            ]
        });
    }

    async onModuleInit() {
        this.$on('query', (e) => {
            this.logger.log('Query: ', e.query);
            this.logger.log('Duration: ', e.duration, 'ms');
        });

        await this.$connect();
    }
}
