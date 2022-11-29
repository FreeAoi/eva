import dotenv from 'dotenv';
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import AppModule from './app/app.module';
import morgan from 'morgan';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    app.use(morgan('dev'));
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    const port = process.env.PORT ?? 3001;
    await app.listen(port);
}

bootstrap();
