import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentModule } from './modules/student/student.module';
import { CourseModule } from './modules/course/course.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { CacheModule } from './modules/cache/cache.module';
import { StorageModule } from './modules/storage/storage.module';
import { TaskModule } from './modules/task/task.module';
import { BullModule } from '@nestjs/bull';

@Module({
    imports: [
        PrismaModule,
        StudentModule,
        AuthModule,
        CourseModule,
        TaskModule,
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379
            }
        }),
        CacheModule.register({
            host: 'localhost',
            port: 6379
        }),
        StorageModule.register({
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
