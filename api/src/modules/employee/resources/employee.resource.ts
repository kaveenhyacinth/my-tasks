import { BaseResource } from '../../../common/resources/base.resource';
import { EmployeeResponseDto } from '../dtos/employee-response.dto';

export class EmployeeResource extends BaseResource {
  constructor(employee: EmployeeResponseDto, message?: string) {
    super({ employee }, message);
  }
}
