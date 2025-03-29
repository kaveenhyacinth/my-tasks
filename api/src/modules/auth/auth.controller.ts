import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthResponse } from './responses/auth.response';
import { serialize } from '../../utils/serializer.util';
import { AuthResponseDto } from './dtos/auth-response.dto';
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
      const result = await this.authService.login(loginDto);
      return new AuthResponse(serialize(AuthResponseDto, result));
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
