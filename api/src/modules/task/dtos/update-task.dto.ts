import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
