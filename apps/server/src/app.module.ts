import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentsModule } from './modules/students/students.module';
import { CoursesModule } from './modules/courses/courses.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { CacheModule } from './modules/cache/cache.module';
// import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        PrismaModule,
        StudentsModule,
        AuthModule,
        CoursesModule,
        CacheModule.register({
            host: 'localhost',
            port: 6379
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // CacheModule.register<any>({
        //     isGlobal: true,
        //     store: redisStore,
        //     host: 'localhost',
        //     port: 6379
        // })
    ],
    controllers: [],
    providers: []
})
class AppModule {}

export default AppModule;
