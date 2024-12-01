import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadJWT } from './interfaces/payload-jwt';

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService) {}

  signAsync(payload: PayloadJWT) {
    return this.jwtService.signAsync(payload);
  }
}
