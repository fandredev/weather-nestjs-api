import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker/.';

describe(`${UsersController.name}`, () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            findUsers: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('services and controller should be defined when module testing is created and compiled', () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
  });

  it(`should call #${UsersService.prototype.findUsers.name} method when route is called`, async () => {
    const users: User[] = [
      {
        id: 1,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        password: faker.internet.password(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: faker.internet.email(),
        name: faker.person.firstName(),
        createdAt: faker.date.recent(),
        password: faker.internet.password(),
        updatedAt: new Date(),
      },
    ];

    jest.spyOn(usersService, 'findUsers').mockResolvedValue(users);
    const getUsersResult = await controller.findUsers();

    expect(getUsersResult).toEqual(users);
    expect(usersService.findUsers).toHaveBeenCalled();
  });

  it(`should call #${UsersService.prototype.findOne.name} method when route is called`, async () => {
    const user: User = {
      id: 1,
      email: faker.internet.email(),
      name: faker.person.firstName(),
      createdAt: faker.date.recent(),
      password: faker.internet.password(),
      updatedAt: new Date(),
    };

    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
    const getUserResult = await controller.findOne(user.id);

    expect(getUserResult).toEqual(user);
    expect(usersService.findOne).toHaveBeenCalledWith(user.id);
  });
});
