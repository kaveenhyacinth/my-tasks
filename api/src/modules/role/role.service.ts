import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../database/core/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findById(roleId: string) {
    if (!roleId) throw new BadRequestException('roleId not found');

    try {
      const role = await this.roleRepo.findOneBy({ id: roleId });
      if (!role) throw new NotFoundException('Role not found');
      return role;
    } catch (err) {
      throw new Error('Something went wrong when finding the role', err);
    }
  }
}
