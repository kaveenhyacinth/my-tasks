import { BaseResponse } from '../../../common/responses/base.response';
import { DepartmentResponseDto } from '../dtos/department-response.dto';

export class DepartmentsResponse extends BaseResponse {
  constructor(departments: DepartmentResponseDto, message?: string) {
    super({ departments }, message);
  }
}
