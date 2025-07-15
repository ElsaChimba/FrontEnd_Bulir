import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(serviceId: string, user: JwtPayload) {
    if (user.role !== 'CLIENT') {
      throw new ForbiddenException('Apenas clientes podem fazer reservas.');
    }

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { provider: true },
    });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado.');
    }

    const client = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    const reservation = await this.prisma.reservation.create({
      data: {
        clientId: client.id,
        providerId: service.provider.id,
        serviceId: service.id,
      },
    });

    return reservation;
  }
}
