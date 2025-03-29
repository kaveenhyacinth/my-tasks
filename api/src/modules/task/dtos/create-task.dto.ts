import { IsDate, IsDateString, IsIn, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @IsIn([1, 2, 3], { message: 'Priority must be one of: 1, 2, 3' })
  priority: number;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsUUID()
  assignee: string;
}
