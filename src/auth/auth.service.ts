import { Injectable } from '@nestjs/common';
import { SignInProps } from 'src/interfaces/auth/IAuth';

@Injectable()
export class AuthService {
  signIn({ username, email, password }: SignInProps) {}
}
