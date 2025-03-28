import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '../../database/core/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  private logger = new Logger('DepartmentService');

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  async findById(departmentId: string) {
    if (!departmentId) throw new Error('departmentId not found');

    try {
      const department = await this.departmentRepo.findOneBy({
        id: departmentId,
      });
      if (!department) throw new Error('Department not found');
      return department;
    } catch (err) {
      this.logger.error(err);
      throw new Error('Something went wrong when finding the department');
    }
  }
}
