import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../database/core/role.entity';
import { Repository } from 'typeorm';
import { ROLE } from '../../enums/role.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findById(roleId: string) {
    if (!roleId) throw new BadRequestException('roleId is required');

    const role = await this.roleRepo.findOneBy({ id: roleId });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  async findByName(roleName: ROLE) {
    if (!roleName) throw new BadRequestException('roleName is required');

    const role = await this.roleRepo.findOneBy({ roleName });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }
}
