import { BaseResponse } from '../../../common/responses/base.response';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class EmployeeListResponse extends BaseResponse {
  constructor(
    employees: EmployeeResponseDto,
    meta: PaginationDto,
    message?: string,
  ) {
    super({ employees, meta }, message);
  }
}
