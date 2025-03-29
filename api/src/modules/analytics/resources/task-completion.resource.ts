import { BaseResource } from '../../../common/resources/base.resource';
import { TaskCompletionResponseDto } from '../dtos/task-completion-response.dto';

export class TaskCompletionResource extends BaseResource {
  constructor(result: TaskCompletionResponseDto, message?: string) {
    super({ result }, message);
  }
}
