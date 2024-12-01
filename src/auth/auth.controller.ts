import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import Users from 'src/users/interfaces/User';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Pick<Users, 'id' | 'password'>) {
    return this.authService.signIn(signInDto.id, signInDto.password);
  }
}
