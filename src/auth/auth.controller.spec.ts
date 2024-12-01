import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import generateRandomToken from './jwt/utils/generate-random-token';
import { faker } from '@faker-js/faker/.';

describe(`${AuthController.name}`, () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
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
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('services and controller should be defined when module testing is created and compiled', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe(`Tests for #${AuthService.prototype.signIn.name} method`, () => {
    it(`should call #${AuthService.prototype.signIn.name} and return the access_token to user`, async () => {
      const generatedRandomToken = generateRandomToken();

      jest.spyOn(authService, 'signIn').mockResolvedValue({
        access_token: generatedRandomToken,
      });

      const signIn = await controller.signIn({
        id: 1,
        password: faker.internet.password(),
      });

      expect(authService.signIn).toHaveBeenCalledWith(1, expect.any(String));
      expect(signIn).toEqual({ access_token: generatedRandomToken });
    });
  });
});
