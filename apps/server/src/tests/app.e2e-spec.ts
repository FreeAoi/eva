import { Test } from '@nestjs/testing';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import AppModule from '../app.module';
import { user, course } from './app.fixture';
import type { CreateTaskDTO } from '../modules/task/dto/create-task.dto';

describe('App (e2e)', () => {
    let app: NestFastifyApplication;

    let JWToken: string;
    let taskId: number;

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
    });

    describe('AuthenticationModule', () => {
        it('(POST) /api/auth/login with valid credentials', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/auth/login',
                payload: user
            });
            expect(response.statusCode).toBe(201);
            expect(JSON.parse(response.payload)).toHaveProperty('access_token');
            expect(JSON.parse(response.payload).access_token).toMatch(
                /^([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_=]+)\.([A-Za-z0-9-_.+/=]*)$/
            );
            JWToken = JSON.parse(response.payload).access_token;
        });

        it('(POST) /api/auth/login with invalid credentials', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/auth/login',
                payload: {
                    email: user.email,
                    password: 'wrongpassword'
                }
            });
            expect(response.statusCode).toBe(401);
            expect(JSON.parse(response.payload)).toHaveProperty('message');
            expect(JSON.parse(response.payload).message).toBe(
                'Invalid credentials'
            );
        });
    });

    describe('StudentModule', () => {
        it('(GET) /api/student/me with valid JWT', async () => {
            const response = await app.inject({
                method: 'GET',
                url: '/api/student/me',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                }
            });
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.payload)).toHaveProperty('id');
            expect(JSON.parse(response.payload)).toHaveProperty('email');
            expect(JSON.parse(response.payload)).toHaveProperty('role');
            expect(JSON.parse(response.payload)).not.toHaveProperty('password');
        });
    });

    describe('CourseModule', () => {
        it('(POST) /api/course/create to create course', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/api/course/create',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: {
                    ...course,
                    courseId: courseId
                }
            });

            expect(response.statusCode).toBe(201);
            expect(JSON.parse(response.payload).id).toBe(courseId);
            expect(JSON.parse(response.payload)).toHaveProperty('name');
            expect(JSON.parse(response.payload)).toHaveProperty('credits');
            expect(JSON.parse(response.payload)).toBeDefined();
        });

        it('(PATCH) /api/course/update add student to course', async () => {
            const response = await app.inject({
                method: 'PATCH',
                url: '/api/course/update',
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: {
                    courseId: courseId,
                    addStudents: ['2022-0381U']
                }
            });

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.payload)).toHaveProperty('id');
            expect(JSON.parse(response.payload)).toHaveProperty('name');
            expect(JSON.parse(response.payload)).toHaveProperty('credits');
            expect(JSON.parse(response.payload)).toBeDefined();
        });
    });

    describe('TaskModule', () => {
        it('(POST) /api/course/:courseId/task/create to create task', async () => {
            const response = await app.inject({
                method: 'POST',
                url: `/api/course/${courseId}/task/create`,
                headers: {
                    Authorization: `Bearer ${JWToken}`
                },
                payload: <CreateTaskDTO>{
                    name: 'Beautiful task',
                    description: 'Beautiful description',
                    title: 'Beautiful title',
                    maxScore: 5
                }
            });

            expect(response.statusCode).toBe(201);
            expect(JSON.parse(response.payload)).toHaveProperty('id');
            expect(JSON.parse(response.payload)).toHaveProperty('name');
            expect(JSON.parse(response.payload)).toHaveProperty('description');
            expect(JSON.parse(response.payload)).toBeDefined();
            taskId = JSON.parse(response.payload).id;
        });

        it('(POST) /api/course/:courseId/task/:taskId/attachement/create to create attachement', async () => {
            const response = await app.inject({
                method: 'POST',
                url: `/api/course/${courseId}/task/${taskId}/attachement/create`,
                headers: {
                    Authorization: `Bearer ${JWToken}`,
                    'Content-Type': 'multipart/form-data'
                },
                payload: {}
            });

            expect(response.statusCode).toBe(201);
            expect(JSON.parse(response.payload)).toHaveProperty('id');
            expect(JSON.parse(response.payload)).toHaveProperty('name');
            expect(JSON.parse(response.payload)).toHaveProperty('description');
            expect(JSON.parse(response.payload)).toBeDefined();
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
