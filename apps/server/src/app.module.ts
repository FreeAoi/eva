import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';
import { PrismaModule } from './providers/database/prisma.module';
import { RedisModule } from './providers/cache/redis.module';
import { TaskModule } from './modules/task/task.module';
import { BullModule } from '@nestjs/bull';
import { RouterModule } from '@nestjs/core';
import { S3Module } from './providers/storage/r2.module';

@Module({
    imports: [
        CourseModule,
        PrismaModule,
        StudentModule,
        AuthModule,
        RouterModule.register([
            {
                path: 'course',
                module: CourseModule,
                children: [
                    {
                        path: ':courseId',
                        module: TaskModule
                    }
                ]
            }
        ]),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379
            }
        }),
        RedisModule.forRoot({
            host: 'localhost',
            port: 6379
        }),
        S3Module.forRoot({
            region: 'auto',
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_KEY_ID,
                secretAccessKey: process.env.R2_SECREY_KEY
            }
        })
    ],
    controllers: [],
    providers: []
})
class AppModule {}

export default AppModule;
