import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';
import * as Joi from 'joi';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number()
          .required()
          .description('Port')
          .default(process.env.APP_PORT || 3000),
        NODE_ENV: Joi.string()
          .required()
          .description('Environment')
          .valid('development', 'production', 'staging', 'test')
          .default('development'),
        DATABASE_URL: Joi.string().required().description('Database URL'),
        JWT_SECRET: Joi.string().required().description('JWT Secret'),
        JWT_EXPIRES_IN: Joi.string().optional().description('JWT Expires In'),
        OPEN_WEATHER_API_KEY: Joi.string()
          .required()
          .description('Open Weather API Key'),
        OPEN_WEATHER_API_BASE_URL: Joi.string()
          .required()
          .description('Open Weather API Base URL'),
      }),
    }),
    UsersModule,
    AuthModule,
    WeatherModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
        blockDuration: 5000,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
