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
          select: { fullName: true, email: true },
        },
        provider: {
          select: { fullName: true, email: true },
        },
        service: {
          select: { name: true, price: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByClient(user: JwtPayload) {
    return this.prisma.reservation.findMany({
      where: { clientId: user.id },
      include: {
        service: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(serviceId: string, details: Record<string, any>, user: JwtPayload) {
    if (user.role !== 'CLIENT') {
      throw new ForbiddenException('Apenas clientes podem fazer reservas.');
    }

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { provider: true },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado');
    }

    return this.prisma.reservation.create({
      data: {
        clientId: user.id,
        providerId: service.provider.id,
        serviceId: service.id,
        details, 
      },
    });
  }
}
