import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  department: string;
}
