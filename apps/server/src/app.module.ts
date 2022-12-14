import { Module, CacheModule } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentsModule } from './modules/students/students.module';
import { CoursesModule } from './modules/courses/courses.module';
import { redisStore } from 'cache-manager-redis-store';

@Module({
    imports: [
        StudentsModule,
        AuthModule,
        CoursesModule,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        CacheModule.register<any>({
            isGlobal: true,
            store: redisStore,
            host: 'localhost',
            port: 6379
        })
    ],
    controllers: [],
    providers: []
})
class AppModule {}

export default AppModule;
