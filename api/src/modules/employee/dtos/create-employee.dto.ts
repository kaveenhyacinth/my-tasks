import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsUsernameExist } from '../../../validators/username-exist.validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsUsernameExist()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsUUID()
  department: string;
}
