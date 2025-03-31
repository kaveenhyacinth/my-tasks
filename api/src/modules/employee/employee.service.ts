import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/core/user.entity';
import { Not, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { RoleService } from '../role/role.service';
import { DepartmentService } from '../department/department.service';
import { ROLE } from '../../enums/role.enum';
import { UpdateEmployeeDto } from './dtos/upate-employee.dto';
import { Pagination } from '../../interfaces/pagination.interface';
import { createHash } from '../../utils/hash.util';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(User)
    private readonly employeeRepo: Repository<User>,
    private readonly roleService: RoleService,
    private readonly departmentService: DepartmentService,
  ) {}

  /**
   * For the simplicity I'm retrieving human-readable employee ids from a sequence which has been created in the database
   * But the ideal way to do this would be using a separate counter table along with DB transactions while creating the employee
   */
  async getNextEmployeeId() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const queryRes = await this.employeeRepo.query(
      `SELECT nextval('employee_seq')`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const id = queryRes?.[0]?.nextval;
    if (!id)
      throw new InternalServerErrorException(
        `employee_seq does not exist. Please create employee_seq.`,
      );

    return id as string;
  }

  async isUsernameExist(username: string): Promise<boolean> {
    return await this.employeeRepo.exists({ where: { username } });
  }

  async getEmployeeById(employeeId: string) {
    if (!employeeId) throw new BadRequestException('employeeId is required');

    const employee = await this.employeeRepo.findOne({
      where: { id: employeeId },
      loadEagerRelations: true,
      select: [
        'id',
        'employeeId',
        'firstName',
        'lastName',
        'username',
        'department',
        'role',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async getAll(pagination: Pagination) {
    const { limit, offset } = pagination;

    return await this.employeeRepo.findAndCount({
      where: { role: { roleName: Not(ROLE.ADMIN) } },
      take: limit,
      skip: offset,
      order: { employeeId: 1 },
      select: [
        'id',
        'employeeId',
        'firstName',
        'lastName',
        'username',
        'department',
        'role',
        'createdAt',
      ],
      relations: ['role'],
    });
  }

  async create(employee: CreateEmployeeDto) {
    const newId = await this.getNextEmployeeId();

    const role = await this.roleService.findByName(ROLE.BASE);
    if (!role)
      throw new InternalServerErrorException(
        'Something went wrong when getting the role',
      );

    const department = await this.departmentService.findById(
      employee.department,
    );
    if (!department) throw new NotFoundException('Department not found');

    const { salt, hash } = await createHash(employee.password);
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    const newEmployee = this.employeeRepo.create({
      employeeId: newId,
      firstName: employee.firstName,
      lastName: employee.lastName,
      username: employee.username,
      password: hashedPassword,
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

  async updateFcmToken(userId: string, token: string) {
    return await this.employeeRepo.update({ id: userId }, { fcmToken: token });
  }

  async getFcmToken(userId: string) {
    const user = await this.employeeRepo.findOne({
      where: { id: userId },
      select: ['id', 'fcmToken'],
    });
    return user?.fcmToken;
  }
}
