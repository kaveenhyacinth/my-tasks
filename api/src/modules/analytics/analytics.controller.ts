import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { Throwable } from '../../utils/throwable.util';
import { TaskCompletionResponse } from './responses/task-completion.response';
import { serialize } from '../../utils/serializer.util';
import { TaskCompletionResponseDto } from './dtos/task-completion-response.dto';

@Controller('api/analytics')
export class AnalyticsController {
  private throwable = new Throwable('AnalyticsController');

  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('task-completion-overview')
  async getTaskCompletionOverviewByEmployees() {
    try {
      const result =
        await this.analyticsService.taskCompletionOverviewByEmployees();
      return new TaskCompletionResponse(
        serialize(TaskCompletionResponseDto, result),
      );
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
