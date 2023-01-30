import fastifyMultipart from '@fastify/multipart';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import AppModule from '../src/app.module';
import { RedisService } from '../src/providers/cache/redis.service';

// TODO: Finish this test
describe('App (e2e)', () => {
    let app: NestFastifyApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter()
        );

        await app.register(fastifyMultipart);
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true,
                stopAtFirstError: true,
                whitelist: true,
                exceptionFactory: (errors) => {
                    const err = errors[0]?.constraints;
                    if (!err) return new BadRequestException(errors);
                    return new BadRequestException(Object.values(err)[0]);
                }
            })
        );

        app.setGlobalPrefix('api');
        useContainer(app.select(AppModule), { fallbackOnErrors: true });

        await app.init();
    });

    describe('Authentication', () => {
        it('([POST] /api/auth/login) should return a JWT token', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/auth/login',
                payload: {
                    email: 'beautiful@gmail.com',
                    password: 'superpassword'
                }
            });

            expect(response.statusCode).toEqual(201);
            expect(response.json()).toHaveProperty('access_token');
        });

        it('([POST] /api/auth/login) should return a 401 error', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/auth/login',
                payload: {
                    username: 'admin',
                    password: 'wrong password'
                }
            });

            expect(response.statusCode).toEqual(400);
            expect(response.json()).toHaveProperty('message');
        });
    });

    afterAll(async () => {
        app.get(RedisService).disconnect();
        await app.close();
    });
});
