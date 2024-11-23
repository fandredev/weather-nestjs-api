import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfiguration from './config/env-configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [envConfiguration],
      validationSchema: Joi.object({
        APP_PORT: Joi.number()
          .required()
          .default(process.env.APP_PORT || 3000),
        NODE_ENV: Joi.string()
          .required()
          .valid('development', 'production', 'staging', 'test')
          .default('development'),
      }),
    }),
  ],
})
export class AppModule {}
