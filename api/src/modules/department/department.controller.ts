import { Controller, Get } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Throwable } from '../../utils/throwable.util';
import { DepartmentsResource } from './resources/departments.resource';
import { serialize } from '../../utils/serializer.util';
import { DepartmentResponseDto } from './dtos/department-response.dto';

@Controller('api/departments')
export class DepartmentController {
  private throwable = new Throwable('DepartmentController');

  constructor(private departmentService: DepartmentService) {}

  @Get()
  async findAllExceptAdmin() {
    try {
      const departments = await this.departmentService.findAllExceptAdmin();
      return new DepartmentsResource(
        serialize(DepartmentResponseDto, departments),
      );
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
