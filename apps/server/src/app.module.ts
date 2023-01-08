import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { CacheModule } from './modules/cache/cache.module';
import { TaskModule } from './modules/task/task.module';
import { BullModule } from '@nestjs/bull';
import { RouterModule } from '@nestjs/core';

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
        CacheModule.register({
            host: 'localhost',
            port: 6379
        })
    ],
    controllers: [],
    providers: []
})
class AppModule {}

export default AppModule;
