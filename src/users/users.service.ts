import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      return new BadRequestException('User data is required');
    }

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: createUserDto.password,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      return new BadRequestException('User ID is required');
    }

    const existsId = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existsId) {
      return new BadRequestException('User ID does not exist');
    }

    return existsId;
  }
}
