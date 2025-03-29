import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from '../../database/core/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), EmployeeModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
