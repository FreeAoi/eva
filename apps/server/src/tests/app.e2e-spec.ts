import { Test } from '@nestjs/testing';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import AppModule from '../app.module';
import { user, course } from './app.fixture';

// TODO: add tests for the rest of the endpoints
describe('App (e2e)', () => {
    let app: NestFastifyApplication;
    let JWToken: string;
    const courseId = (Math.random() + 1).toString(36).substring(7);

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = module.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter()
        );
        app.setGlobalPrefix('api');
        await app.init();
        await app.getHttpAdapter().getInstance().ready();

        // Login to get a JWT token and use it for the rest of the tests
        const response = await app.inject({
            method: 'POST',
            url: '/api/auth/login',
            payload: user
        });
        JWToken = JSON.parse(response.payload).access_token;
    });

    it('/GET student no authorized', () => {
        return app
            .inject({ method: 'GET', url: '/api/student/me' })
            .then((response) => {
                console.log(response);
                expect(response.statusCode).toBe(401);
                expect(JSON.parse(response.body)).toEqual({
                    statusCode: 401,
                    message: 'Unauthorized'
                });
            });
    });

    it('/GET student authorized', () => {
        return app
            .inject({
                method: 'GET',
                url: '/api/student/me',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                }
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body)).toBeDefined();
            });
    });

    it('/POST create course', () => {
        return app
            .inject({
                method: 'POST',
                url: '/api/course/create',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: {
                    ...course,
                    courseId: courseId
                }
            })
            .then((response) => {
                expect(response.statusCode).toBe(201);
                expect(JSON.parse(response.body)).toMatchObject({
                    id: courseId,
                    name: course.name
                });
            });
    });

    it('/PATCH add student to course', () => {
        return app
            .inject({
                method: 'PATCH',
                url: '/api/course/update',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: {
                    courseId: courseId,
                    addStudents: ['2022-0381U']
                }
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body)).toMatchObject({
                    id: courseId,
                    name: course.name
                });
            });
    });

    it('/PATCH update student note', () => {
        return app
            .inject({
                method: 'PATCH',
                url: '/api/course/update/qualification',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: {
                    courseId: courseId,
                    studentId: '2022-0381U',
                    qualification: 10
                }
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body)).toBeDefined();
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
