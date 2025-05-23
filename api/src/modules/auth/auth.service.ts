import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/core/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../interfaces/jwt.interface';
import { createHash } from '../../utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login({ username, password }: LoginDto) {
    const user = await this.userRepo.findOneBy({ username });

    if (!user) throw new UnauthorizedException('User not found');

    const [salt, storedHash] = user.password.split('.');
    const { hash } = await createHash(password, salt);

    if (storedHash !== hash.toString('hex'))
      throw new UnauthorizedException('Invalid password');

    const jwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role.id,
    } satisfies JwtPayload;

    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return {
      token,
      role: user.role.roleName,
    };
  }
}
