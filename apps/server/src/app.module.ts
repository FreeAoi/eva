import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentsModule } from './modules/students/students.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
    imports: [StudentsModule, AuthModule, CoursesModule],
    controllers: [],
    providers: []
})
class AppModule {}

export default AppModule;
