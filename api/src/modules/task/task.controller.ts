import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Throwable } from '../../utils/throwable.util';
import { CreateTaskDto } from './dtos/create-task.dto';
import { BaseResponse } from '../../common/responses/base.response';
import { Restricted } from '../../guards/restricted.guard';
import { AllowedRoles } from '../../common/decorators/allowedRoles.decorator';
import { ROLE } from '../../enums/role.enum';

@Controller('api/tasks')
export class TaskController {
  private throwable = new Throwable('TaskController');

  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Restricted()
  @AllowedRoles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      await this.taskService.create(createTaskDto);
      return new BaseResponse({}, 'Task has been created successfully.');
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
