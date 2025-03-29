import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Throwable } from '../../utils/throwable.util';
import { CreateTaskDto } from './dtos/create-task.dto';
import { BaseResource } from '../../common/resources/base.resource';

@Controller('api/tasks')
export class TaskController {
  private throwable = new Throwable('TaskController');

  constructor(private readonly taskService: TaskService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      await this.taskService.create(createTaskDto);
      return new BaseResource({}, 'Task has been created successfully.');
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
