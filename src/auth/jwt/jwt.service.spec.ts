import { Test, TestingModule } from '@nestjs/testing';
import { AuthJwtService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadJWT } from './interfaces/payload-jwt';
import generateRandomToken from './utils/generate-random-token';

describe(`${AuthJwtService.name}`, () => {
  let authJwtService: AuthJwtService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthJwtService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authJwtService = module.get<AuthJwtService>(AuthJwtService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('services should be defined when module testing is created and compiled', () => {
    expect(authJwtService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe(`Tests for #${AuthJwtService.prototype.signAsync.name} method:`, () => {
    it('should generate a new jwt token based in payload that received', async () => {
      const payload: PayloadJWT = {
        sub: 1,
        name: 'John Doe',
      };

      const expectedToken = generateRandomToken();

      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(Promise.resolve(expectedToken));

      const newToken = await authJwtService.signAsync(payload);

      expect(newToken).toBe(expectedToken);
      expect(jwtService.signAsync).toHaveBeenCalledWith(payload);
    });
  });
});
