import { BaseResponse } from '../../../common/responses/base.response';
import { TaskListResponseDto } from '../dtos/task-list-response.dto';

export class TaskListResponse extends BaseResponse {
  constructor(tasks: TaskListResponseDto, message?: string) {
    super({ tasks }, message);
  }
}
