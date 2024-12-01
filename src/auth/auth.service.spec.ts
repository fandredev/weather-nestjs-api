import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthJwtService } from './jwt/jwt.service';
import { PrismaService } from 'src/prisma.service';
import { faker } from '@faker-js/faker';
import generateRandomToken from './jwt/utils/generate-random-token';

describe(`${AuthService.name}`, () => {
  let authService: AuthService;
  let usersService: UsersService;
  let authJwtService: AuthJwtService;
  let prismaService: PrismaService;

  const userMocked = {
    id: 1,
    email: faker.internet.email(),
    name: faker.person.firstName(),
    createdAt: faker.date.recent(),
    password: faker.internet.password(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        {
          provide: AuthJwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    authJwtService = module.get<AuthJwtService>(AuthJwtService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('services should be defined when module testing is created and compiled', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(authJwtService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe(`Tests for #${AuthService.prototype.signIn.name} method`, () => {
    it('should return a jwt access token when user in database is EQUAL to user received', () => {
      const generatedRandomToken = generateRandomToken();

      jest.spyOn(usersService, 'findOne').mockResolvedValue(userMocked);
      jest
        .spyOn(authJwtService, 'signAsync')
        .mockResolvedValue(generatedRandomToken);

      const accessToken = authService.signIn(
        userMocked.id,
        userMocked.password,
      );

      expect(accessToken).resolves.toEqual({
        access_token: generatedRandomToken,
      });
    });

    it('should return a error when user in database is NOT equal to user received', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(userMocked);

      const signInError = authService.signIn(
        faker.number.int({
          min: 2,
        }),
        'random-password_NEVER_generated',
      );

      await expect(signInError).rejects.toThrow(
        'The email or password you entered is incorrect',
      );
    });
  });
});
