import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateTaskParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
