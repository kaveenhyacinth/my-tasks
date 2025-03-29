import { Expose } from 'class-transformer';

export class TaskListResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  priority: number;

  @Expose()
  dueDate: Date;

  @Expose()
  completed: boolean;

  @Expose()
  createdAt: Date;
}
