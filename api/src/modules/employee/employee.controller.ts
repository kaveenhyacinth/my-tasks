import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeeResponseDto } from './dtos/employee-response.dto';
import { EmployeeResource } from './resources/employee.resource';
import { serialize } from '../../utils/serializer.util';

@Controller('api/employee')
export class EmployeeController {
  private logger = new Logger('EmployeeController');

  constructor(private readonly employeeService: EmployeeService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = await this.employeeService.create(createEmployeeDto);
      if (!employee?.id) throw new BadRequestException('Employee not created');
      return new EmployeeResource(serialize(EmployeeResponseDto, employee));
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Something went wrong when creating the employee',
      );
    }
  }
}
