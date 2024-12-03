import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUsers() {
    return await this.prismaService.user.findMany();
  }

  async findOneById(id: number) {
    const existsUsers = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existsUsers) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return existsUsers;
  }

  async findOneByEmail(email: string) {
    const existsUsers = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existsUsers) {
      throw new BadRequestException('Usuário não encontrado');
    }

    return existsUsers.id;
  }
}
