import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

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
                    emit: 'stdout',
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
        //4.
        this.$on('error', (event) => {
            this.logger.error(event);
        });
        this.$on('warn', (event) => {
            this.logger.warn(event);
        });
        this.$on('info', (event) => {
            this.logger.verbose(event);
        });
        this.$on('query', (event) => {
            this.logger.log(event);
        });
        await this.$connect();
    }
}
