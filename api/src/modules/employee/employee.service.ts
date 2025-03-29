import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/core/user.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { RoleService } from '../role/role.service';
import { DepartmentService } from '../department/department.service';
import { ROLE } from '../../enums/role.enum';
import { UpdateEmployeeDto } from './dtos/upate-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private readonly employeeRepo: Repository<User>,
    private readonly roleService: RoleService,
    private readonly departmentService: DepartmentService,
  ) {}

  async isUsernameExist(username: string): Promise<boolean> {
    return await this.employeeRepo.exists({ where: { username } });
  }

  async getEmployeeById(employeeId: string) {
    if (!employeeId) throw new BadRequestException('employeeId is required');

    const employee = await this.employeeRepo.findOneBy({ id: employeeId });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async create(employee: CreateEmployeeDto) {
    const role = await this.roleService.findByName(ROLE.BASE);
    if (!role)
      throw new InternalServerErrorException(
        'Something went wrong when getting the role',
      );

    const department = await this.departmentService.findById(
      employee.department,
    );
    if (!department) throw new NotFoundException('Department not found');

    const newEmployee = this.employeeRepo.create({
      firstName: employee.firstName,
      lastName: employee.lastName,
      username: employee.username,
      password: employee.password,
      role,
      department,
    });

    if (!newEmployee)
      throw new InternalServerErrorException(
        'Something went wrong when creating the employee',
      );

    return await this.employeeRepo.save(newEmployee, { reload: true });
  }

  async update(employeeId: string, employee: UpdateEmployeeDto) {
    if (!employeeId) throw new BadRequestException('EmployeeId is required');

    const isExist = await this.employeeRepo.exists({
      where: { id: employeeId },
    });

    if (!isExist) throw new NotFoundException('Employee not exists');

    const department = await this.departmentService.findById(
      employee.department,
    );
    if (!department) throw new NotFoundException('department not found');

    const preloadedEmployee = await this.employeeRepo.preload({
      id: employeeId,
      ...employee,
      department,
    });

    if (!preloadedEmployee) {
      throw new NotFoundException(`User with not found`);
    }

    return this.employeeRepo.save(preloadedEmployee, { reload: true });
  }

  async delete(employeeId: string) {
    if (!employeeId) throw new BadRequestException('EmployeeId is required');

    const result = await this.employeeRepo.delete({ id: employeeId });

    if (!result.affected)
      throw new BadRequestException('Failed to delete employee');

    return true;
  }
}
