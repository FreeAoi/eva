import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { StudentModule } from './modules/students/student.module';

@Module({
    imports: [StudentModule, AuthModule],
    controllers: [],
    providers: []
})
class AppModule {}

export default AppModule;
