import dotenv from 'dotenv';
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import AppModule from './app.module';
import { AppClusterService } from './cluster';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import FastifyMP from '@fastify/multipart';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    app.use(morgan('dev'));
    await app.register(FastifyMP);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.enableCors();

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        const config = new DocumentBuilder()
            .setTitle('EVA API')
            .setDescription('The EVA API documentation')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document);
    }

    const port = process.env.PORT ?? 3001;
    await app.listen(port, '::');
}

AppClusterService.clusterize(bootstrap);
