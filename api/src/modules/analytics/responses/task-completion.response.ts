import { BaseResponse } from '../../../common/responses/base.response';
import { TaskCompletionResponseDto } from '../dtos/task-completion-response.dto';

export class TaskCompletionResponse extends BaseResponse {
  constructor(result: TaskCompletionResponseDto, message?: string) {
    super({ result }, message);
  }
}
