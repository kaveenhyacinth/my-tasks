import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Throwable } from '../../utils/throwable.util';
import { CreateTaskDto } from './dtos/create-task.dto';
import { BaseResponse } from '../../common/responses/base.response';
import { Restricted } from '../../guards/restricted.guard';
import { AllowedRoles } from '../../common/decorators/allowed-roles.decorator';
import { ROLE } from '../../enums/role.enum';
import { Request as Req } from 'express';
import { TaskListResponse } from './responses/task-list.response';
import { serialize } from '../../utils/serializer.util';
import { TaskListResponseDto } from './dtos/task-list-response.dto';
import { TaskQueriesDto } from './dtos/task-queries.dto';
import { PaginationParams } from '../../common/decorators/pagination-params.decorator';
import { Pagination } from '../../interfaces/pagination.interface';
import { PaginationUtil } from '../../utils/pagination.util';

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

  @Get()
  @Restricted()
  async getOwnTasks(
    @Request() req: Req,
    @Query() query: TaskQueriesDto,
    @PaginationParams() paginationParams: Pagination,
  ) {
    const userId = req['user']?.sub as string;
    if (!userId) throw new UnauthorizedException('Unauthorized');

    try {
      const [tasks, total] = await this.taskService.ownTasks(
        userId,
        query,
        paginationParams,
      );

      const pagination = new PaginationUtil(paginationParams);
      return new TaskListResponse(
        serialize(TaskListResponseDto, tasks),
        pagination.getSerializedPaginationMeta(total),
      );
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
