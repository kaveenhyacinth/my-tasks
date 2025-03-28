import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../database/core/role.entity';
import { Repository } from 'typeorm';
import { ROLE } from '../../enums/role.enum';

@Injectable()
export class RoleService {
  private logger = new Logger('RoleService');

  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findById(roleId: string) {
    if (!roleId) throw new Error('roleId not found');

    try {
      const role = await this.roleRepo.findOneBy({ id: roleId });
      if (!role) throw new Error('Role not found');
      return role;
    } catch (err) {
      this.logger.error(err);
      throw new Error('Something went wrong when finding the role', err);
    }
  }

  async findByName(roleName: ROLE) {
    if (!roleName) throw new Error('roleName not found');

    try {
      const role = await this.roleRepo.findOneBy({ roleName });
      if (!role) throw new Error('Role not found');
      return role;
    } catch (err) {
      this.logger.error(err);
      throw new Error('Something went wrong when finding the role');
    }
  }
}
