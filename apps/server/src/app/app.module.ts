import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { StudentModule } from '../student/student.module';

@Module({
    imports: [StudentModule, AuthModule],
    controllers: [AppController],
    providers: []
})
class AppModule {}

export default AppModule;
