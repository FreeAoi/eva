import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import AppModule from '../src/app.module';
import { PrismaService } from '../src/providers/database/prisma.service';
import { RedisService } from '../src/providers/cache/redis.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

describe('AuthenticationModule (e2e)', () => {
    let prismaService: PrismaService;
    let redisService: RedisService;
    let app: NestFastifyApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleRef.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter()
        );

        redisService = app.get(RedisService);
        prismaService = app.get(PrismaService);

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

    it('[(POST) api/auth/login] Try to login with invalid user', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/api/auth/login',
            payload: {
                email: 'somemail@gmail.com',
                password: 'somepassword'
            }
        });

        expect(res.statusCode).toEqual(401);
        expect(res.json()).toEqual({
            statusCode: 401,
            message: 'Invalid credentials'
        });
    });

    it('[(POST) api/auth/login] Try to login with valid user', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/api/auth/login',
            payload: {
                email: 'beautiful@gmail.com',
                password: 'superpassword'
            }
        });

        expect(res.statusCode).toEqual(201);
        expect(res.json()).toEqual({
            access_token: expect.any(String)
        });
    });

    afterAll(async () => {
        redisService.disconnect();
        await prismaService.$disconnect();
        await app.close();
    });
});
