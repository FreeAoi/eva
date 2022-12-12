import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [CoursesController],
    providers: [CoursesService]
})
export class CoursesModule {}
