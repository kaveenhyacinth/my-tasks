import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/core/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { ROLE } from '../../enums/role.enum';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User)
    private readonly employeeRepo: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async taskCompletionOverviewByEmployees() {
    const role = await this.roleService.findByName(ROLE.BASE);
    if (!role)
      throw new InternalServerErrorException(
        'Something went wrong while retrieving user role',
      );

    const result = await this.employeeRepo
      .createQueryBuilder('employee')
      .leftJoin('employee.tasks', 'task')
      .leftJoin('employee.department', 'department')
      .where('employee.roleId = :roleId', { roleId: role.id })
      .select([
        'employee.id as id',
        'employee.firstName as firstName',
        'employee.lastName as lastName',
        'employee.username as username',
        'department.departmentName as department',
      ])
      .addSelect(`COUNT(task.id)`, 'totalTasks')
      .addSelect(
        `SUM(CASE WHEN task.completed = true THEN 1 ELSE 0 END)`,
        'completedTasks',
      )
      .groupBy('employee.id')
      .addGroupBy('department.departmentName')
      .getRawMany();

    if (!result) return [];
    return result;
  }
}
