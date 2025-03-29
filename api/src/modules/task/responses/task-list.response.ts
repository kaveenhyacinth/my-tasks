import { BaseResponse } from '../../../common/responses/base.response';
import { TaskListResponseDto } from '../dtos/task-list-response.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class TaskListResponse extends BaseResponse {
  constructor(
    tasks: TaskListResponseDto,
    meta: PaginationDto,
    message?: string,
  ) {
    super({ tasks, meta }, message);
  }
}
