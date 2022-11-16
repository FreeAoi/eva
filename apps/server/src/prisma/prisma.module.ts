import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
    imports: [],
    controllers: [],
    providers: [PrismaService],
    exports: [PrismaService]
})
class PrismaModule {}

export default PrismaModule;
