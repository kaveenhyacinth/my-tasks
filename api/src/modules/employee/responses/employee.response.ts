import { BaseResponse } from '../../../common/responses/base.response';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';

export class EmployeeResponse extends BaseResponse {
  constructor(employee: EmployeeResponseDto, message?: string) {
    super({ employee }, message);
  }
}
