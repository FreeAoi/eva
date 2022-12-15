import { Test } from '@nestjs/testing';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import AppModule from '../app.module';
import { user, course } from './app.fixture';

describe('App', () => {
    let app: NestFastifyApplication;
    let JWToken: string;
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
            .inject({ method: 'GET', url: '/api/students' })
            .then((response) => {
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
                url: '/api/students',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                }
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body)).toBeDefined();
            });
    });

    it('/GET student courses', () => {
        return app
            .inject({
                method: 'GET',
                url: '/api/courses/student',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                }
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body)).toBeDefined();
            });
    });

    it('/PUT create course', () => {
        return app
            .inject({
                method: 'PUT',
                url: '/api/courses/create',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: course
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body)).toMatchObject({
                    id: course.id,
                    name: course.name
                });
            });
    });

    it('/PUT add student to course', () => {
        return app
            .inject({
                method: 'PUT',
                url: '/api/courses/add-student',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: {
                    courseId: course.id,
                    studentId: '2022-0381U'
                }
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(JSON.parse(response.body)).toMatchObject({
                    id: course.id,
                    name: course.name
                });
            });
    });

    it('/PATCH update student note', () => {
        return app
            .inject({
                method: 'PATCH',
                url: '/api/courses/update-note',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: {
                    courseId: course.id,
                    studentId: '2022-0381U',
                    note: 10
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
