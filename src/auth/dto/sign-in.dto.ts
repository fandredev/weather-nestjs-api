import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
