import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import AppModule from '../src/app.module';
import { PrismaService } from '../src/providers/database/prisma.service';
import { RedisService } from '../src/providers/cache/redis.service';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

describe('StudentModule (e2e)', () => {
    let prismaService: PrismaService;
    let redisService: RedisService;
    let app: NestFastifyApplication;
    let token: string;

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

        const res = await app.inject({
            method: 'POST',
            url: '/api/auth/login',
            payload: {
                email: 'beautiful@gmail.com',
                password: 'superpassword'
            }
        });

        token = res.json().access_token;
    });

    it('[(GET) api/student/me] Get student profile', async () => {
        const res = await app.inject({
            method: 'GET',
            url: '/api/student/me',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(res.statusCode).toEqual(200);
        const body = res.json();

        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('email');
        expect(body).toHaveProperty('firstName');
        expect(body).not.toHaveProperty('password');
    });

    afterAll(async () => {
        redisService.disconnect();
        await prismaService.$disconnect();
        await app.close();
    });
});
