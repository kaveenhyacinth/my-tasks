import { Expose } from 'class-transformer';

export class DepartmentResponseDto {
  @Expose()
  id: string;

  @Expose()
  departmentName: string;
}
