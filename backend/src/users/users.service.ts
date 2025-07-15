import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    // verificação dos dados (email, nif)
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { nif: data.nif }],
      },
    });

    if (existingUser) {
      throw new ConflictException('E-mail ou NIF já cadastrado');
    }
  // parte da criptografia
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        nif: data.nif,
        password: hashedPassword,
        role: data.role || 'CLIENT',

      },
    }); // criação do usuário 

    const { password, ...result } = user;
    return result;
  }
}
