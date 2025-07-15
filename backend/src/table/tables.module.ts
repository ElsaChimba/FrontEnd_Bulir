import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TablesController],
  providers: [PrismaService],
})
export class TablesModule {}
