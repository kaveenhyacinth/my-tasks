import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../database/core/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(task: CreateTaskDto) {
    const employee = await this.employeeService.getEmployeeById(task.assignee);
    if (!employee) throw new NotFoundException('employee does not exist');

    const newTask = this.taskRepo.create({
      ...task,
      assignee: employee,
    });
    if (!newTask)
      throw new InternalServerErrorException(
        'Something went wrong while creating the task',
      );

    return await this.taskRepo.save(newTask);
  }
}
