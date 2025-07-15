import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceDto, user: any) {
    if (user.role !== 'PROVIDER') {
      throw new ForbiddenException('Apenas prestadores podem cadastrar serviços');
    }

    const service = await this.prisma.service.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        providerId: user.userId,
      },
    });

    return service;
  }

  async findAll() {
    return this.prisma.service.findMany({
      include: {
        provider: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });
  }
}
