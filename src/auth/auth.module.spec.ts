import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthJwtService } from './jwt/jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

describe(`${AuthModule.name}`, () => {
  let authController: AuthController;
  let authService: AuthService;
  let authJwtService: AuthJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: 'test-secret',
          signOptions: { expiresIn: '1d' },
        }),
        UsersModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        AuthJwtService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    authJwtService = module.get<AuthJwtService>(AuthJwtService);
  });

  it(`should have the modules when module is loaded`, () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
    expect(authJwtService).toBeDefined();
  });
});
