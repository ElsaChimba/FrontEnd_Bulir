import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/jwt-payload.type';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        client: {
          select: {
            fullName: true,
            email: true,
          },
        },
        provider: {
          select: {
            fullName: true,
            email: true,
          },
        },
        service: {
          select: {
            name: true,
            price: true,
          },
        },
        tableType: {
          select: {
            name: true,
            price: true,
            capacity: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(serviceId: string, tableTypeId: string, user: JwtPayload) {
    if (user.role !== 'CLIENT') {
      throw new ForbiddenException();
    }

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { provider: true },
    });

    const table = await this.prisma.tableType.findUnique({
      where: { id: tableTypeId },
    });

    if (!service || !table) {
      throw new NotFoundException();
    }

    return this.prisma.reservation.create({
      data: {
        clientId: user.id,
        providerId: service.provider.id,
        serviceId: service.id,
        tableTypeId: table.id,
      },
    });
  }
}
