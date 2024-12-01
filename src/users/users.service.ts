import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findUsers() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
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
}
