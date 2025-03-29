import { IsUUID } from 'class-validator';

export class EmployeeParamsDto {
  @IsUUID()
  id: string;
}
