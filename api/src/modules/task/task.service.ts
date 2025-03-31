import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../database/core/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { EmployeeService } from '../employee/employee.service';
import { TaskQueriesDto } from './dtos/task-queries.dto';
import { Pagination } from '../../interfaces/pagination.interface';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    private readonly employeeService: EmployeeService,
    private readonly notificationService: NotificationService,
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

    const savedTask = await this.taskRepo.save(newTask);

    const fcmToken = await this.employeeService.getFcmToken(task.assignee);
    if (savedTask && fcmToken) {
      await this.notificationService.sendPushNotification({
        token: fcmToken,
        title: 'New Task Assigned',
        body: `You've been assigned to: ${savedTask.name}.`,
      });
    }

    return savedTask;
  }

  async ownTasks(
    userId: string,
    queries: TaskQueriesDto,
    pagination: Pagination,
  ) {
    const { limit, offset } = pagination;

    const orderOptions =
      queries.sort && queries.order
        ? { [queries.sort]: queries.order.toUpperCase() }
        : {};

    return await this.taskRepo.findAndCount({
      where: { assignee: { id: userId } },
      order: { completed: 'ASC', ...orderOptions },
      take: limit,
      skip: offset,
      select: [
        'id',
        'name',
        'description',
        'priority',
        'dueDate',
        'completed',
        'createdAt',
      ],
    });
  }

  async updateStatus(userId: string, taskId: string, status: UpdateTaskDto) {
    if (!userId) throw new UnauthorizedException('Unauthorized');
    if (!taskId) throw new BadRequestException('taskId is required');

    const task = await this.taskRepo.findOne({
      where: { id: taskId, assignee: { id: userId } },
    });

    if (!task) throw new NotFoundException('task does not exist');

    return await this.taskRepo.update(
      { id: taskId },
      {
        completed: status.completed,
      },
    );
  }
}
