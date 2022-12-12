import { Module } from '@nestjs/common';
import { PrismaModule } from '../../providers/prisma/prisma.module';
import { StudentController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
    imports: [PrismaModule],
    controllers: [StudentController],
    providers: [StudentsService],
    exports: [StudentsService]
})
export class StudentsModule {}
