import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../../database/core/department.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  async findAllExceptAdmin() {
    return await this.departmentRepo.find({
      where: { departmentName: Not('Administration') },
    });
  }

  async findById(departmentId: string) {
    if (!departmentId)
      throw new BadRequestException('departmentId is required');

    const department = await this.departmentRepo.findOneBy({
      id: departmentId,
    });

    if (!department) throw new NotFoundException('Department not found');

    return department;
  }
}
