import dotenv from 'dotenv';
dotenv.config();

import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import AppModule from './app.module';
import { AppClusterService } from './cluster';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyMultipart from '@fastify/multipart';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

    await app.register(fastifyMultipart);
    app.use(morgan('dev'));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
            whitelist: true,
            // return the first error message only (instead of all errors)
            exceptionFactory: (errors) => {
                const err = errors[0]?.constraints;
                if (!err) return new BadRequestException(errors);
                return new BadRequestException(Object.values(err)[0]);
            }
        })
    );

    app.setGlobalPrefix('api');
    app.enableCors();

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const config = new DocumentBuilder()
        .setTitle('EVA API')
        .setDescription('The EVA API documentation')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT ?? 3001;
    await app.listen(port, '::');
}

AppClusterService.clusterize(bootstrap);
