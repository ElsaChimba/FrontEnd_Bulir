import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('tables')
export class TablesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.tableType.findMany();
  }
}
