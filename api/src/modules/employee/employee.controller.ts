import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeeResponseDto } from './dtos/employee-response.dto';
import { EmployeeResponse } from './responses/employee.response';
import { serialize } from '../../utils/serializer.util';
import { UpdateEmployeeDto } from './dtos/upate-employee.dto';
import { Throwable } from '../../utils/throwable.util';
import { EmployeeParamsDto } from './dtos/employee-params.dto';
import { BaseResponse } from '../../common/responses/base.response';
import { ROLE } from '../../enums/role.enum';
import { AllowedRoles } from '../../common/decorators/allowed-roles.decorator';
import { Restricted } from '../../guards/restricted.guard';

@Controller('api/employees')
export class EmployeeController {
  private throwable = new Throwable('EmployeeController');

  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Restricted()
  @AllowedRoles(ROLE.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = await this.employeeService.create(createEmployeeDto);
      return new EmployeeResponse(
        serialize(EmployeeResponseDto, employee),
        'Employee has been created successfully.',
      );
    } catch (err) {
      this.throwable.throwError(err);
    }
  }

  @Put(':id')
  @Restricted()
  @AllowedRoles(ROLE.ADMIN)
  async update(
    @Param() params: EmployeeParamsDto,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const employeeId = params?.id;
    if (!employeeId) throw new BadRequestException('EmployeeId is required');
    try {
      const updatedEmployee = await this.employeeService.update(
        employeeId,
        updateEmployeeDto,
      );
      return new EmployeeResponse(
        serialize(EmployeeResponseDto, updatedEmployee),
        'Employee has been updated successfully.',
      );
    } catch (err) {
      this.throwable.throwError(err);
    }
  }

  @Delete(':id')
  @Restricted()
  @AllowedRoles(ROLE.ADMIN)
  async delete(@Param() params: EmployeeParamsDto) {
    const employeeId = params?.id;
    if (!employeeId) throw new BadRequestException('EmployeeId is required');
    try {
      await this.employeeService.delete(employeeId);
      return new BaseResponse({}, 'Employee has been deleted successfully.');
    } catch (err) {
      this.throwable.throwError(err);
    }
  }
}
