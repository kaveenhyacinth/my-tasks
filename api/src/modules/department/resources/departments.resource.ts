import { BaseResource } from '../../../common/resources/base.resource';
import { DepartmentResponseDto } from '../dtos/department-response.dto';

export class DepartmentsResource extends BaseResource {
  constructor(departments: DepartmentResponseDto, message?: string) {
    super({ departments }, message);
  }
}
