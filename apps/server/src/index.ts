import dotenv from 'dotenv';
dotenv.config();

import {
    BadRequestException,
    ClassSerializerInterceptor,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import morgan from 'morgan';
import AppModule from './app.module';
import { AppClusterService } from './cluster';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    );

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
            },
        })
    );
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            excludeExtraneousValues: true,
        })
    );

    app.setGlobalPrefix('api');
    app.enableCors();

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const config = new DocumentBuilder()
        .setTitle('EVA API')
        .setDescription('The EVA API documentation')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT ?? 3001;
    await app.listen(port, '::');
}

AppClusterService.clusterize(bootstrap);
