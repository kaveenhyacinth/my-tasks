import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EmployeeService } from '../modules/employee/employee.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'UsernameExistConstraint', async: true })
@Injectable()
export class UsernameExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly employeeService: EmployeeService) {}

  async validate(username: string, _args?: ValidationArguments) {
    const isUsernameExists =
      await this.employeeService.isUsernameExist(username);
    return !isUsernameExists;
  }

  defaultMessage(_args?: ValidationArguments): string {
    return 'Username ($value) is already taken';
  }
}

export function IsUsernameExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUsernameExist',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UsernameExistConstraint,
    });
  };
}
