import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';
import { PrismaModule } from './providers/database/prisma.module';
import { RedisModule } from './providers/cache/redis.module';
import { TaskModule } from './modules/task/task.module';
import { BullModule } from '@nestjs/bull';
import { R2Module } from './providers/storage/r2.module';
import { IsStudent } from './common/decorators/validation/studentExists';
import { CourseExists } from './common/decorators/validation/courseExists';
import { TaskExists } from './common/decorators/validation/taskExists';

@Module({
    imports: [
        PrismaModule,
        CourseModule,
        StudentModule,
        TaskModule,
        AuthModule,
        RedisModule.forRoot({
            host: 'localhost',
            port: 6379
        }),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379
            }
        }),
        R2Module.forRoot({
            region: 'auto',
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_KEY_ID,
                secretAccessKey: process.env.R2_SECREY_KEY
            }
        })
    ],
    controllers: [],
    providers: [IsStudent, CourseExists, TaskExists]
})
class AppModule {}

export default AppModule;
