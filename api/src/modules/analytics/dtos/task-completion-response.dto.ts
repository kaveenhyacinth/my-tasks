import { Expose, Transform } from 'class-transformer';

export class TaskCompletionResponseDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.firstname)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.lastname)
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  department: string;

  @Expose()
  @Transform(({ obj }) => parseInt(obj.totalTasks))
  totalTasks: number;

  @Expose()
  @Transform(({ obj }) => parseInt(obj.completedTasks))
  completedTasks: number;
}
