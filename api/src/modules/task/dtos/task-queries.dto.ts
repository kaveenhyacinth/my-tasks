import { IsIn, IsOptional, IsString } from 'class-validator';

export class TaskQueriesDto {
  @IsOptional()
  @IsString()
  @IsIn(['priority', 'dueDate'])
  sort: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order: string;
}
