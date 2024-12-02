import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import Users from 'src/users/interfaces/User';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // TODO: Preciso fazer signIn pelo email do usuário (O que ele vai lembrar, HOJE ESTA SENDO FEITO PELO ID, Algo que ele não vai lembrar)

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Pick<Users, 'id' | 'password'>) {
    return this.authService.signIn(signInDto.id, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getMe(@Request() req) {
    return req.user;
  }
}
