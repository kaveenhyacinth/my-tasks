import { Expose, Transform } from 'class-transformer';
import { BaseResponseDto } from '../../../common/dtos/base-response.dto';

export class EmployeeResponseDto extends BaseResponseDto {
  @Expose()
  employeeId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  @Transform(({ obj }) => obj?.department?.departmentName)
  department: string;

  @Expose()
  @Transform(({ obj }) => obj?.role?.roleName)
  role: string;
}
