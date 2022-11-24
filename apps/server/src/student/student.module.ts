import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StudentService } from './student.service';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [StudentService],
    exports: [StudentService]
})
export class StudentModule {}
