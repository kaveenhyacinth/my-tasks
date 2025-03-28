import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/core/user.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

import { RoleService } from '../role/role.service';
import { DepartmentService } from '../department/department.service';
import { ROLE } from '../../enums/role.enum';

@Injectable()
export class EmployeeService {
  private logger = new Logger('EmployeeService');

  constructor(
    @InjectRepository(User)
    private readonly employeeRepo: Repository<User>,
    private readonly roleService: RoleService,
    private readonly departmentService: DepartmentService,
  ) {}

  async create(employee: CreateEmployeeDto) {
    try {
      const role = await this.roleService.findByName(ROLE.BASE);
      if (!role) throw new Error('Something went wrong when getting the role');

      const department = await this.departmentService.findById(
        employee.department,
      );
      if (!department)
        throw new Error('Something went wrong when getting the department');

      const newEmployee = this.employeeRepo.create({
        firstName: employee.firstName,
        lastName: employee.lastName,
        username: employee.username,
        password: employee.password,
        role,
        department,
      });

      if (!newEmployee)
        throw new Error('Something went wrong when creating the employee');

      return await this.employeeRepo.save(newEmployee, { reload: true });
    } catch (err) {
      this.logger.error(err);
      throw new Error('Something went wrong when creating the employee');
    }
  }

  async isUsernameExist(username: string): Promise<boolean> {
    try {
      return await this.employeeRepo.exists({ where: { username } });
    } catch (err) {
      this.logger.error(err);
      throw new Error('Something went wrong when creating the employee');
    }
  }
}
