import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import envConfiguration from './config/env-configuration';
import * as Joi from 'joi';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [envConfiguration],
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
      }),
    }),
    UsersModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
