import { Test, TestingModule } from '@nestjs/testing';
import generateRandomToken from '../jwt/utils/generate-random-token';
import { faker } from '@faker-js/faker/.';
import { AuthGuard } from '../auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

// const mockAuthGuard = {
//   canActivate: jest.fn((context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();
//     request.user = {
//       id: 1,
//       name: faker.person.firstName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//       createdAt: faker.date.recent(),
//       updatedAt: new Date(),
//     };
//     return true;
//   }),
// };

describe(`${AuthController.name}`, () => {
  let controller: AuthController;
  let authService: AuthService;
  let mockAuthGuard: any;

  beforeEach(async () => {
    mockAuthGuard = {
      canActivate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('services and controller should be defined when module testing is created and compiled', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe(`Tests for #${AuthController.prototype.signIn.name} method`, () => {
    it(`should call #${AuthService.prototype.signIn.name} and return the access_token to user`, async () => {
      const generatedRandomToken = generateRandomToken();

      jest.spyOn(authService, 'signIn').mockResolvedValue({
        access_token: generatedRandomToken,
      });

      const email = faker.internet.email();

      const signIn = await controller.signIn({
        email,
        password: faker.internet.password(),
      });

      expect(authService.signIn).toHaveBeenCalledWith(
        email,
        expect.any(String),
      );
      expect(signIn).toEqual({ access_token: generatedRandomToken });
    });
  });

  describe(`Tests for #${AuthController.prototype.getMe.name} method`, () => {
    it('should return the data user when user is not authenticated', async () => {
      mockAuthGuard.canActivate.mockImplementation(
        (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = { id: 1, username: faker.person.firstName() };
          return true;
        },
      );

      const jwtReturnUserLogged = {
        sub: 1,
        name: faker.person.firstName(),
        iat: Date.now(),
        exp: Date.now(),
      };

      const request = {
        user: jwtReturnUserLogged,
      };

      const profileData = await controller.getMe(request);

      expect(profileData).toEqual(jwtReturnUserLogged);
    });
  });
});
