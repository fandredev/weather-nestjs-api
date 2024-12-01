import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const findId = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!findId) {
      return new BadRequestException('User not found');
    }

    return findId;
  }
}
