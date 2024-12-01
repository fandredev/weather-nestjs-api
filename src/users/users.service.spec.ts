import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker/.';

describe(`${UsersService.name}`, () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('services should be defined when module testing is created and compiled', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe(`Get Especific User`, () => {
    it(`should get a user successfully when #${UsersService.prototype.findOne.name} method when mock returns a user`, async () => {
      const userId = 1;

      const user: User = {
        id: userId,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      const result = await service.findOne(userId);

      expect(result).toEqual(user);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it(`should throw an error when #${UsersService.prototype.findOne.name} method is called and user does not exist`, async () => {
      const userId = 1;
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.findOne(userId)).rejects.toThrow(
        'Usuário não encontrado',
      );
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });
});
