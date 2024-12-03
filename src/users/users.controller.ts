import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Find all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users returned successfully',
    example: [
      {
        id: 1,
        email: 'example@example.io',
        name: 'Example',
        password: 'example',
        createdAt: '2024-12-02T18:22:39.086Z',
        updatedAt: '2024-12-02T18:22:39.086Z',
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findUsers() {
    return this.usersService.findUsers();
  }

  @ApiOperation({
    summary: 'Find a user by ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User returned successfully',
    example: {
      id: 1,
      email: 'example@example.io',
      name: 'Example',
      password: 'example',
      createdAt: '2024-12-02T18:22:39.086Z',
      updatedAt: '2024-12-02T18:22:39.086Z',
    },
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }
}
