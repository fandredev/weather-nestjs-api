import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthJwtService } from '../jwt/jwt.service';
import { PayloadJWT } from '../jwt/interfaces/payload-jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private authJwtService: AuthJwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const id = await this.usersService.findOneByEmail(email);
    const user = await this.usersService.findOneById(id);
    if (user?.password !== pass) {
      throw new UnauthorizedException(
        'The email or password you entered is incorrect',
      );
    }
    const payload: PayloadJWT = {
      sub: user.id,
      name: user.name,
    };

    const accessToken = await this.authJwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }
}
