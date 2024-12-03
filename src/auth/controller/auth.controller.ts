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
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../services/auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { SignInDto } from '../dto/sign-in.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOperation({
    summary: 'Sign in the application',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Access token generated and returned successfully',
    example: {
      access_token: 'xxxxxxx',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Bad request if the user ID or password is not provided or malformed',
    example: {
      message: [
        'id must be a number conforming to the specified constraints',
        'id should not be empty',
        'password must be a string',
        'password should not be empty',
      ],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get information about the user',
  })
  @ApiResponse({
    description: 'User information returned successfully',
    status: HttpStatus.OK,
    example: [
      {
        sub: 1,
        name: 'Sophia',
        iat: 1733159235,
        exp: 1733764035,
      },
    ],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized user',
    example: {
      message: 'You must provide a valid token in the Authorization header',
      error: 'Unauthorized',
      statusCode: HttpStatus.UNAUTHORIZED,
    },
  })
  getMe(@Request() req) {
    return req.user;
  }
}
