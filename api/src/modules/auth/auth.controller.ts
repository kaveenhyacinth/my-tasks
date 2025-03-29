import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { TokenResource } from './resources/token.resource';
import { serialize } from '../../utils/serializer.util';
import { TokenResponseDto } from './dtos/token-response.dto';
import { Throwable } from '../../utils/throwable.util';

@Controller('api/auth')
export class AuthController {
  private throwable = new Throwable('AuthController');

  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    if (!loginDto.username || !loginDto.password)
      throw new BadRequestException('Invalid Credentials');

    try {
      const token = await this.authService.login(loginDto);
      return new TokenResource(serialize(TokenResponseDto, token));
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
